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
  } = body;

  // Kiểm tra các trường bắt buộc
  if (
    !fullName ||
    !phone ||
    !province ||
    !district ||
    !ward ||
    !address ||
    !product
  ) {
    return NextResponse.json(
      { message: "Thiếu thông tin bắt buộc" },
      { status: 400 }
    );
  }

  // Kiểm tra các trường sản phẩm cần thiết
  if (!product.title || !product.storage || !product.price) {
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
  if (product) {
    productInfo = `\n\n*📱 THÔNG TIN SẢN PHẨM:*\n*Tên:* ${
      product.title
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
