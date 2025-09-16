"use client";

import React, { useState } from "react";
import { Phone, MessageCircle, Facebook } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ContactFloatingButtons = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const contacts = [
    {
      id: "phone",
      label: "Gọi ngay",
      icon: Phone,
      href: "tel:+84385795791",
      color: "bg-green-500 hover:bg-green-600",
      text: "0385.795.791",
    },
    {
      id: "zalo",
      label: "Chat Zalo",
      icon: MessageCircle,
      href: "https://zalo.me/0385795791",
      color: "bg-blue-500 hover:bg-blue-600",
      text: "Zalo",
    },
    {
      id: "messenger",
      label: "Messenger",
      icon: Facebook,
      href: "https://www.facebook.com/trangthienlongmobile",
      color: "bg-blue-600 hover:bg-blue-700",
      text: "Messenger",
    },
  ];

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="flex flex-col gap-3 mb-4"
          >
            {contacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <motion.a
                  key={contact.id}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${contact.color} text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 group`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <IconComponent className="w-5 h-5" />
                  <span className="hidden group-hover:block whitespace-nowrap text-sm font-medium">
                    {contact.text}
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg transition-all duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
      >
        <Phone className="w-6 h-6" />
      </motion.button>

      {/* Notification dot */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
    </div>
  );
};

export default ContactFloatingButtons;