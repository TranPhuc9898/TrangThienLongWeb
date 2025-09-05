/** @format */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    const errorMsg =
      err && typeof err === "object" && "message" in err
        ? (err as any).message
        : String(err);
    return NextResponse.json(
      { message: "Invalid JSON body", error: errorMsg },
      { status: 400 }
    );
  }

  const {
    fullName,
    phone,
    email,
    province,
    district,
    ward,
    address,
    note,
    product,
    cart,
    totalPrice,
    adjustedTotalPrice,
  } = body;

  // Kiểm tra các trường bắt buộc
  if (
    !fullName ||
    !phone ||
    !province ||
    !district ||
    !ward ||
    !address
  ) {
    return NextResponse.json(
      { message: "Thiếu thông tin bắt buộc" },
      { status: 400 }
    );
  }

  // Kiểm tra có sản phẩm trong giỏ hàng hoặc product đơn lẻ
  if (!cart && !product) {
    return NextResponse.json(
      { message: "Thiếu thông tin sản phẩm" },
      { status: 400 }
    );
  }

  const SLACK_TOKEN = process.env.SLACK_TOKEN;

  if (!SLACK_TOKEN) {
    return NextResponse.json(
      { message: "Slack token not configured" },
      { status: 500 }
    );
  }

  // Build compact message
  let productInfo = "";
  
  // Xử lý giỏ hàng (nhiều sản phẩm)
  if (cart && cart.items && cart.items.length > 0) {
    productInfo = `\n\n*📱 THÔNG TIN SẢN PHẨM:*`;
    cart.items.forEach((item: any, index: number) => {
      productInfo += `\n\n*Sản phẩm ${index + 1}:*`;
      productInfo += `\n• Tên: ${item.name}`;
      if (item.regionCode) productInfo += `\n• Mã vùng: ${item.regionCode}`;
      if (item.condition) productInfo += `\n• Tình trạng: ${item.condition}`;
      if (item.storage || item.attributes?.[0]) productInfo += `\n• Dung lượng: ${item.storage || item.attributes[0]}`;
      if (item.color || item.attributes?.[1]) productInfo += `\n• Màu sắc: ${item.color || item.attributes[1]}`;
      productInfo += `\n• Số lượng: ${item.quantity}`;
      productInfo += `\n• Giá: ${item.price.toLocaleString()}đ`;
    });
    productInfo += `\n\n*💰 TỔNG TIỀN: ${Math.round(adjustedTotalPrice || totalPrice).toLocaleString()}đ*`;
  }
  // Xử lý sản phẩm đơn lẻ (giữ cho tương thích)
  else if (product) {
    productInfo = `\n\n*📱 THÔNG TIN SẢN PHẨM:*\n*Tên:* ${
      product.productName || product.title
    }\n*Dung lượng:* ${
      product.storage
    }\n*Giá:* ${product.price.toLocaleString()}đ`;
  }

  const slackMessage = `*🛒 ĐƠN HÀNG MỚI VỪA VỀ!*\n\n*👤 Tên khách hàng:* ${fullName}\n*📞 Số điện thoại:* ${phone}\n*🏠 Địa chỉ:* ${province}, ${district}, ${ward}, ${address}${productInfo}\n*📝 Ghi chú:* ${
    note || "Không có ghi chú"
  }`;

  try {
    const response = await axios.post(
      "https://slack.com/api/chat.postMessage",
      {
        channel: "#thientranglong_buonban",
        text: slackMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${SLACK_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data.ok) {
      return NextResponse.json(
        { message: "Slack API error", error: response.data.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    let errorMsg = "";
    if (err && typeof err === "object") {
      if (
        "response" in err &&
        err.response &&
        typeof err.response === "object" &&
        "data" in err.response
      ) {
        errorMsg = JSON.stringify((err as any).response.data);
      } else if ("message" in err) {
        errorMsg = (err as any).message;
      } else {
        errorMsg = JSON.stringify(err);
      }
    } else {
      errorMsg = String(err);
    }
    // Log lỗi chi tiết để debug trên Vercel
    console.error("Slack send error:", errorMsg);
    return NextResponse.json(
      { message: "Internal error", error: errorMsg },
      { status: 500 }
    );
  }
}
