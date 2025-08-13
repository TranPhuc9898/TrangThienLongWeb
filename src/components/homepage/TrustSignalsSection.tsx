"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  Shield,
  CreditCard,
  RefreshCw,
  Award,
  Clock,
} from "lucide-react";

const trustSignals = [
  {
    Icon: Truck,
    title: "Giao hàng nhanh 2h",
    description: "Miễn phí trong nội thành",
    color: "from-blue-500 to-cyan-500",
  },
  {
    Icon: Shield,
    title: "Bảo hành chính hãng",
    description: "12 tháng toàn quốc",
    color: "from-green-500 to-emerald-500",
  },
  {
    Icon: CreditCard,
    title: "Trả góp 0% lãi suất",
    description: "Duyệt nhanh online",
    color: "from-purple-500 to-violet-500",
  },
  {
    Icon: RefreshCw,
    title: "1 đổi 1 trong 30 ngày",
    description: "Miễn phí đổi trả",
    color: "from-orange-500 to-red-500",
  },
  {
    Icon: Award,
    title: "Chính hãng 100%",
    description: "Đại lý ủy quyền Apple",
    color: "from-pink-500 to-rose-500",
  },
  {
    Icon: Clock,
    title: "Hỗ trợ 24/7",
    description: "Tư vấn mọi lúc",
    color: "from-indigo-500 to-blue-500",
  },
];

const TrustSignalsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tại Sao Chọn Chúng Tôi?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cam kết mang đến trải nghiệm mua sắm tốt nhất với dịch vụ chuyên
            nghiệp
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustSignals.map((signal, index) => {
            const { Icon } = signal;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${signal.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                />

                {/* Icon Container */}
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${signal.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {signal.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {signal.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
