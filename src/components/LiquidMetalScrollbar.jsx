import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const LiquidMetalScrollbar = () => {
  // Track global page scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();

  // Apply fluid spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 26,
    restDelta: 0.001
  });

  // Calculate top offset percentage for the cutout thumb window (0% to 90%)
  const topPercentage = useTransform(smoothProgress, [0, 1], ['0%', '90%']);

  // Dynamic track squeeze deformation at the thumb position:
  // As the cutout thumb moves down, the track swells slightly where the thumb is,
  // making it look like the thumb is squeezing through a flexible liquid vessel.
  const thumbScaleX = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.35, 1]);

  return (
    <div className="fixed right-2 md:right-4 top-20 md:top-24 z-20 h-[calc(100vh-96px)] w-2.5 md:w-3.5 pb-2 flex items-center justify-center pointer-events-none">
      
      {/* SVG Liquid Bulge/Displacement Filter Definition */}
      <svg className="hidden">
        <defs>
          <filter id="liquid-squeeze-filter">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Full-Height Liquid Metal Column with Gooey Liquid Filter */}
      <div 
        style={{ filter: "url(#liquid-squeeze-filter)" }}
        className="relative w-full h-full rounded-full p-[1px] bg-gradient-to-b from-gray-500 via-white/80 to-gray-700 shadow-[0_0_20px_rgba(255,255,255,0.15)] overflow-hidden backdrop-blur-md"
      >
        
        {/* Metallic Base Sheen */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-500 via-gray-100 to-gray-600" />

        {/* Dynamic Sheen Overlays */}
        <div className="absolute inset-0 w-full h-full bg-[linear-gradient(180deg,rgba(255,255,255,0.8)_0%,rgba(200,200,200,0.1)_50%,rgba(255,255,255,0.6)_100%)] pointer-events-none opacity-80" />

        {/* The Squeezing Cutout Thumb Window */}
        <motion.div
          style={{ 
            top: topPercentage,
            scaleX: thumbScaleX
          }}
          className="absolute left-0 right-0 h-[10%] bg-black rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.95),0_0_12px_rgba(0,0,0,0.9)] border-y-2 border-white/30 transition-all duration-75"
        />

      </div>
    </div>
  );
};

export default LiquidMetalScrollbar;