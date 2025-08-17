/** @format */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface OrbitingCard {
  id: string;
  title: string;
  price: string;
  image: string;
  href: string;
  startAngle: number;
  color: string; // Accent color for this card
}

const orbitingCards: OrbitingCard[] = [
  {
    id: "iphone",
    title: "iPhone 15 Pro",
    price: "Từ 29.990.000đ",
    image: "/images/iphone14.png", 
    href: "/iphone",
    startAngle: 0,
    color: "#007AFF", // iPhone blue
  },
  {
    id: "ipad",
    title: "iPad Pro M2",
    price: "Từ 26.990.000đ", 
    image: "/images/iphone14.png",
    href: "/ipad",
    startAngle: 120,
    color: "#FF9500", // iPad orange
  },
  {
    id: "macbook", 
    title: "MacBook Air M2",
    price: "Từ 27.990.000đ",
    image: "/images/iphone14.png",
    href: "/macbook",
    startAngle: 240,
    color: "#8E8E93", // MacBook gray
  },
];

const EnhancedOrbitingCards = () => {
  const [globalPaused, setGlobalPaused] = useState(false);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Orbit parameters
  const orbitRadius = 320;
  const orbitDuration = 30;
  const maxDisturbance = 50; // Max deviation from orbit path

  // Mouse tracking for subtle orbital disturbance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setMousePosition({
          x: (e.clientX - centerX) / rect.width,
          y: (e.clientY - centerY) / rect.height,
        });
      }
    };

    if (!globalPaused) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [globalPaused]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none hidden lg:block"
      style={{ perspective: "1000px" }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {orbitingCards.map((card, index) => {
          const controls = useAnimation();
          const timeOffset = (index * orbitDuration) / orbitingCards.length;

          // Create motion values for dynamic positioning
          const time = useMotionValue(timeOffset);
          const angle = useTransform(time, [0, orbitDuration], [card.startAngle, card.startAngle + 360]);
          
          // Mouse influence on orbit
          const mouseInfluenceX = mousePosition.x * maxDisturbance * 0.3;
          const mouseInfluenceY = mousePosition.y * maxDisturbance * 0.3;

          const x = useTransform(angle, (a) => {
            const rad = (a * Math.PI) / 180;
            return Math.cos(rad) * orbitRadius + mouseInfluenceX;
          });
          
          const y = useTransform(angle, (a) => {
            const rad = (a * Math.PI) / 180;  
            return Math.sin(rad) * orbitRadius + mouseInfluenceY;
          });

          // Start animation on mount
          useEffect(() => {
            if (!globalPaused) {
              controls.start({
                transition: {
                  duration: orbitDuration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: timeOffset
                }
              });
              
              // Update time motion value
              time.set(timeOffset);
              const interval = setInterval(() => {
                time.set(time.get() + 0.016); // ~60fps
              }, 16);
              
              return () => clearInterval(interval);
            }
          }, [controls, globalPaused, timeOffset, time]);

          return (
            <motion.div
              key={card.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{ x, y }}
              initial={{ 
                scale: 0,
                opacity: 0,
                rotateX: -90
              }}
              animate={{ 
                scale: activeCard === card.id ? 1.3 : 1,
                opacity: 1,
                rotateX: 0,
                rotateY: activeCard === card.id ? 10 : 0,
                rotateZ: activeCard === card.id ? Math.sin(Date.now() * 0.003) * 5 : 0,
              }}
              transition={{
                scale: { duration: 0.3, type: "spring", stiffness: 300 },
                opacity: { duration: 0.6, delay: index * 0.2 },
                rotateX: { duration: 0.8, delay: index * 0.2 },
                rotateY: { duration: 0.2 },
                rotateZ: { duration: 0.1 }
              }}
              whileHover={{ 
                scale: 1.4,
                rotateY: 15,
                z: 50,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.9,
                transition: { duration: 0.1 }
              }}
              onHoverStart={() => {
                setActiveCard(card.id);
                setGlobalPaused(true);
                controls.stop();
              }}
              onHoverEnd={() => {
                setActiveCard(null);
                setGlobalPaused(false);
                controls.start({
                  transition: {
                    duration: orbitDuration,
                    repeat: Infinity,
                    ease: "linear"
                  }
                });
              }}
            >
              <Link href={card.href} className="block group">
                <motion.div 
                  className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl"
                  style={{
                    background: activeCard === card.id 
                      ? `linear-gradient(135deg, ${card.color}15, rgba(255,255,255,0.1))`
                      : "rgba(255, 255, 255, 0.05)"
                  }}
                  animate={{
                    borderColor: activeCard === card.id ? `${card.color}60` : "rgba(255,255,255,0.1)",
                    boxShadow: activeCard === card.id 
                      ? `0 20px 60px ${card.color}20, 0 0 0 1px ${card.color}30`
                      : "0 10px 40px rgba(0,0,0,0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 mx-auto mb-2 relative">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain transition-all duration-300 group-hover:scale-110"
                      style={{
                        filter: activeCard === card.id ? "drop-shadow(0 0 10px rgba(255,255,255,0.3))" : "none"
                      }}
                    />
                  </div>
                  
                  {/* Card Content */}
                  <motion.div 
                    className="text-center space-y-1"
                    animate={{
                      color: activeCard === card.id ? "#ffffff" : "#e5e5e7"
                    }}
                  >
                    <p className="text-xs font-semibold transition-colors duration-300">
                      {card.title}
                    </p>
                    <p 
                      className="text-xs font-medium transition-colors duration-300"
                      style={{ 
                        color: activeCard === card.id ? card.color : "#8E8E93" 
                      }}
                    >
                      {card.price}
                    </p>
                  </motion.div>

                  {/* Glow Effect */}
                  {activeCard === card.id && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: `radial-gradient(circle at center, ${card.color}20, transparent 70%)`
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Pulse Ring */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2"
                        style={{ borderColor: `${card.color}60` }}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                    </>
                  )}

                  {/* Click indicator */}
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                    animate={{
                      scale: activeCard === card.id ? [1, 1.5, 1] : 1,
                      opacity: activeCard === card.id ? [0.7, 1, 0.7] : 0.7
                    }}
                    transition={{
                      duration: 1,
                      repeat: activeCard === card.id ? Infinity : 0
                    }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Ambient particles for extra flair */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight  
              ],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedOrbitingCards;