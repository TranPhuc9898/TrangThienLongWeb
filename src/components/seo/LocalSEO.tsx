"use client";

import React from 'react';

// Local business citations for better local SEO
export const LocalBusinessInfo: React.FC = () => {
  const businessInfo = {
    name: "Trang Mobile - Cửa Hàng Apple Chính Hãng",
    address: "456 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM",
    phone: "0901234567",
    hours: "8:00 - 22:00 Hàng ngày",
    email: "contact@trangmobile.com"
  };

  return (
    <div className="local-business-info bg-gray-50 p-6 rounded-lg" itemScope itemType="https://schema.org/Store">
      <h2 className="text-2xl font-bold mb-4">Thông Tin Cửa Hàng</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Địa chỉ showroom:</h3>
          <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <span itemProp="streetAddress">456 Lý Thường Kiệt, Phường 14</span><br />
            <span itemProp="addressLocality">Quận 10</span>, 
            <span itemProp="addressRegion"> TP.HCM</span><br />
            <span itemProp="addressCountry">Việt Nam</span>
          </address>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Liên hệ:</h3>
          <p>📞 Hotline: <a href="tel:0901234567" itemProp="telephone" className="text-blue-600 hover:underline">090.123.4567</a></p>
          <p>📧 Email: <a href="mailto:contact@trangmobile.com" itemProp="email" className="text-blue-600 hover:underline">contact@trangmobile.com</a></p>
          <p>⏰ Giờ mở cửa: <span itemProp="openingHours">8:00 - 22:00</span></p>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="mt-4">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4294964933!2d106.6658!3d10.7626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ1JzQ1LjQiTiAxMDbCsDM5JzU3LjYiRQ!5e0!3m2!1svi!2s!4v1234567890"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>

      {/* NAP Citations */}
      <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
        <h3 className="font-semibold mb-3">Tìm chúng tôi trên:</h3>
        <div className="flex flex-wrap gap-4">
          <a href="https://www.google.com/maps/place/Trang+Mobile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Google Maps
          </a>
          <a href="https://www.facebook.com/trangmobile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Facebook
          </a>
          <a href="https://zalo.me/trangmobile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Zalo
          </a>
          <a href="https://www.foody.vn/trangmobile" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Foody
          </a>
        </div>
      </div>
    </div>
  );
};

// Review Schema Component
export const ReviewSchema: React.FC = () => {
  const reviews = [
    {
      author: "Nguyễn Văn An",
      rating: 5,
      date: "2024-01-15",
      content: "Mua iPhone 15 Pro Max ở đây giá tốt, nhân viên tư vấn nhiệt tình. Máy chính hãng, bảo hành tốt."
    },
    {
      author: "Trần Thị Bình",
      rating: 5,
      date: "2024-01-20",
      content: "Đã mua iPad và MacBook, rất hài lòng về chất lượng dịch vụ. Giao hàng nhanh, đóng gói cẩn thận."
    },
    {
      author: "Lê Minh Tuấn",
      rating: 5,
      date: "2024-02-01",
      content: "Shop uy tín, hàng chính hãng Apple. Giá cạnh tranh, có nhiều chương trình khuyến mãi hấp dẫn."
    },
    {
      author: "Phạm Thu Hà",
      rating: 5,
      date: "2024-02-10",
      content: "Trả góp 0% rất tiện lợi. Thủ tục nhanh gọn, nhân viên hỗ trợ chu đáo từ A-Z."
    },
    {
      author: "Hoàng Đức Nam",
      rating: 5,
      date: "2024-02-15",
      content: "Mua AirPods Pro 2 được tặng kèm case, rất hài lòng. Sẽ quay lại ủng hộ shop."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Trang Mobile",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "datePublished": review.date,
      "reviewBody": review.content,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="reviews-section mt-8">
        <h2 className="text-2xl font-bold mb-6">Đánh Giá Từ Khách Hàng</h2>
        
        <div className="mb-4 flex items-center gap-4">
          <div className="flex text-yellow-400">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-2xl">{star}</span>
            ))}
          </div>
          <span className="text-lg font-semibold">4.9/5</span>
          <span className="text-gray-600">(1,250 đánh giá)</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{review.author}</h3>
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(review.rating)}
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{review.content}</p>
              <p className="text-xs text-gray-400">{new Date(review.date).toLocaleDateString('vi-VN')}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Xem thêm đánh giá
          </button>
        </div>
      </div>
    </>
  );
};

// FAQ Schema for better SEO
export const FAQSchema: React.FC = () => {
  const faqs = [
    {
      question: "Trang Mobile có bán hàng chính hãng không?",
      answer: "100% sản phẩm tại Trang Mobile là hàng chính hãng Apple, được nhập khẩu chính thức với đầy đủ hóa đơn VAT và bảo hành 12 tháng."
    },
    {
      question: "Có hỗ trợ trả góp 0% không?",
      answer: "Có, chúng tôi hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng của 20+ ngân hàng với thời hạn từ 3-12 tháng."
    },
    {
      question: "Thời gian giao hàng là bao lâu?",
      answer: "Giao hàng trong 2 giờ cho nội thành TP.HCM. Các tỉnh thành khác từ 1-3 ngày tùy khu vực."
    },
    {
      question: "Có thu cũ đổi mới không?",
      answer: "Có, chúng tôi thu cũ đổi mới với giá thu cao nhất thị trường, hỗ trợ định giá máy cũ miễn phí."
    },
    {
      question: "Chính sách bảo hành như thế nào?",
      answer: "Bảo hành chính hãng 12 tháng tại trung tâm bảo hành Apple. Hỗ trợ 1 đổi 1 trong 30 ngày nếu lỗi từ nhà sản xuất."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="faq-section mt-8 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Câu Hỏi Thường Gặp</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white p-4 rounded-lg shadow-sm">
              <summary className="font-semibold cursor-pointer hover:text-blue-600">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600 pl-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
};