"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Nguyễn Văn Minh",
    role: "Doanh nhân",
    content:
      "iPhone 15 Pro Max tại đây chất lượng tuyệt vời, giá cả hợp lý. Nhân viên tư vấn nhiệt tình, giao hàng nhanh chóng. Tôi rất hài lòng!",
    rating: 5,
    avatar: "/images/iphone14.png",
  },
  {
    id: 2,
    name: "Trần Thị Lan",
    role: "Giáo viên",
    content:
      "Mua iPad Air M2 cho công việc giảng dạy. Sản phẩm like new 99% nhưng chất lượng như mới. Bảo hành đầy đủ, rất uy tín!",
    rating: 5,
    avatar: "/images/iphone14.png",
  },
  {
    id: 3,
    name: "Lê Hoàng Khang",
    role: "Sinh viên",
    content:
      "MacBook Air M2 phục vụ học tập tốt. Trả góp 0% rất thuận tiện cho sinh viên như mình. Cảm ơn team tư vấn!",
    rating: 5,
    avatar: "/images/iphone14.png",
  },
  {
    id: 4,
    name: "Phạm Thu Hương",
    role: "Marketing Manager",
    content:
      "Apple Watch Series 9 đẹp và tiện lợi. Theo dõi sức khỏe rất chính xác. Giao hàng trong 2h như cam kết. Sẽ giới thiệu bạn bè!",
    rating: 5,
    avatar: "/images/iphone14.png",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Khách Hàng
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Nói Gì
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Những phản hồi tích cực từ hàng nghìn khách hàng đã tin tưởng sử
            dụng dịch vụ của chúng tôi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-blue-500 opacity-50" />
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-300 -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Signal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tham gia cộng đồng 10,000+ khách hàng hài lòng
            </h3>
            <p className="text-gray-600 mb-6">
              Được tin tưởng bởi các cá nhân và doanh nghiệp trên toàn quốc
            </p>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">4.9/5 đánh giá</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>99% hài lòng</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>Giao hàng 2h</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
