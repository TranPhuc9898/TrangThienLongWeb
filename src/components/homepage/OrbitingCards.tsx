/** @format */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface OrbitingCard {
  id: string;
  title: string;
  price: string;
  image: string;
  href: string;
  startAngle: number; // Starting position in degrees
}

const orbitingCards: OrbitingCard[] = [
  {
    id: "iphone",
    title: "iPhone 15 Pro",
    price: "Từ 29.990.000đ",
    image: "/images/iphone14.png",
    href: "/iphone",
    startAngle: 0, // 12 o'clock
  },
  {
    id: "ipad", 
    title: "iPad Pro M2",
    price: "Từ 26.990.000đ",
    image: "/images/iphone14.png",
    href: "/ipad",
    startAngle: 120, // 4 o'clock
  },
  {
    id: "macbook",
    title: "MacBook Air M2", 
    price: "Từ 27.990.000đ",
    image: "/images/iphone14.png",
    href: "/macbook",
    startAngle: 240, // 8 o'clock
  },
];

const OrbitingCards = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Orbit parameters
  const orbitRadius = 280; // Radius of orbit
  const orbitDuration = 25; // Seconds for full rotation
  const centerX = 0; // Center relative to container
  const centerY = 0;

  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      <div className="relative w-full h-full flex items-center justify-center">
        {orbitingCards.map((card, index) => {
          const initialAngle = card.startAngle;
          
          return (
            <motion.div
              key={card.id}
              className="absolute pointer-events-auto"
              initial={{ 
                x: centerX + orbitRadius * Math.cos((initialAngle * Math.PI) / 180),
                y: centerY + orbitRadius * Math.sin((initialAngle * Math.PI) / 180),
                scale: 0.8,
                opacity: 0
              }}
              animate={{
                x: isPaused && hoveredCard === card.id 
                  ? centerX + orbitRadius * Math.cos((initialAngle * Math.PI) / 180)
                  : [
                      centerX + orbitRadius * Math.cos((initialAngle * Math.PI) / 180),
                      centerX + orbitRadius * Math.cos(((initialAngle + 360) * Math.PI) / 180)
                    ],
                y: isPaused && hoveredCard === card.id
                  ? centerY + orbitRadius * Math.sin((initialAngle * Math.PI) / 180) 
                  : [
                      centerY + orbitRadius * Math.sin((initialAngle * Math.PI) / 180),
                      centerY + orbitRadius * Math.sin(((initialAngle + 360) * Math.PI) / 180)
                    ],
                scale: hoveredCard === card.id ? 1.2 : 1,
                opacity: 1,
                rotate: isPaused && hoveredCard === card.id ? 5 : [0, 360]
              }}
              transition={{
                x: {
                  duration: orbitDuration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5
                },
                y: {
                  duration: orbitDuration,
                  repeat: Infinity,
                  ease: "linear", 
                  delay: index * 0.5
                },
                scale: {
                  duration: 0.3,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 0.8,
                  delay: 0.5 + index * 0.2
                },
                rotate: {
                  duration: orbitDuration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5
                }
              }}
              onHoverStart={() => {
                setHoveredCard(card.id);
                setIsPaused(true);
              }}
              onHoverEnd={() => {
                setHoveredCard(null);
                setIsPaused(false);
              }}
              whileHover={{ 
                scale: 1.2,
                rotateY: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <Link href={card.href} className="block group">
                <motion.div 
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    borderColor: "rgba(255, 255, 255, 0.3)"
                  }}
                >
                  <div className="w-20 h-20 mx-auto mb-2 relative">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <p className="text-white text-sm font-semibold mb-1 group-hover:text-blue-200 transition-colors">
                      {card.title}
                    </p>
                    <p className="text-blue-400 text-xs font-medium group-hover:text-blue-300 transition-colors">
                      {card.price}
                    </p>
                  </motion.div>

                  {/* Pulse effect on hover */}
                  {hoveredCard === card.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-blue-400/50"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ 
                        scale: [0.8, 1.1, 0.8], 
                        opacity: [0, 0.6, 0] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Orbit path visualization (optional - for debugging) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="border border-dashed border-white/10 rounded-full"
            style={{
              width: orbitRadius * 2,
              height: orbitRadius * 2
            }}
          />
        </div>
      )}
    </div>
  );
};

export default OrbitingCards;