"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Heart, Star, Trophy } from "lucide-react";

const stats = [
  {
    Icon: Users,
    value: "10,000+",
    label: "Khách hàng tin tưởng",
    color: "from-blue-500 to-cyan-500",
  },
  {
    Icon: Heart,
    value: "99%",
    label: "Tỷ lệ hài lòng",
    color: "from-red-500 to-pink-500",
  },
  {
    Icon: Star,
    value: "4.9/5",
    label: "Đánh giá trung bình",
    color: "from-yellow-500 to-orange-500",
  },
  {
    Icon: Trophy,
    value: "5 năm",
    label: "Kinh nghiệm",
    color: "from-purple-500 to-violet-500",
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Những Con Số
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              {" "}
              Ấn Tượng
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Chúng tôi tự hào về những thành tựu đạt được trong việc phục vụ
            khách hàng
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const { Icon } = stat;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className="relative">
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.color} rounded-full mb-6 shadow-2xl group-hover:shadow-3xl transition-shadow duration-300`}
                  >
                    <Icon className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Animated Value */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold text-white mb-2"
                  >
                    {stat.value}
                  </motion.div>

                  <p className="text-white/80 text-lg font-medium">
                    {stat.label}
                  </p>

                  {/* Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-lg mb-6">
            Hàng nghìn khách hàng đã tin tưởng chọn chúng tôi
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:shadow-2xl transition-all duration-300"
          >
            Tham Gia Cùng Chúng Tôi
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
