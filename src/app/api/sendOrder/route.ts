/** @format */

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  const body = await req.json();

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

  // Sử dụng biến môi trường thay vì hardcode
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
    productInfo = `\n\n*📱 THÔNG TIN SẢN PHẨM:*
*Tên:* ${product.title}
*Dung lượng:* ${product.storage}
*Giá:* ${product.price.toLocaleString()}đ`;
  }

  const slackMessage = `*🛒 ĐƠN HÀNG MỚI VỪA VỀ!*

*👤 Tên khách hàng:* ${fullName}
*📞 Số điện thoại:* ${phone}
*� Địa chỉ:* ${province}, ${district}, ${address}${productInfo}
*📝 Ghi chú:* ${note || "Không có ghi chú"}`;

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
  } catch (err: any) {
    return NextResponse.json(
      { message: "Internal error", error: err.message },
      { status: 500 }
    );
  }
}
