"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScoreCircle({ score }: { score: number }) {
  const [count, setCount] = useState(0);
  
  const radius = 88;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    let start = 0;
    const duration = 1500; // 1.5 segundos
    const increment = score / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= score) {
        setCount(score);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="flex justify-center items-center mb-10">
      <div className="relative w-48 h-48 flex items-center justify-center bg-gray-900 rounded-full shadow-inner shadow-black/50">
        <svg className="absolute w-full h-full transform -rotate-90">
          {/* Fundo do círculo (Cinza) */}
          <circle cx="96" cy="96" r={radius} className="stroke-gray-800" strokeWidth="8" fill="transparent" />
          {/* Progresso do círculo animado com Framer Motion */}
          <motion.circle
            cx="96" cy="96" r={radius}
            className="stroke-emerald-500"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="relative z-10 flex flex-col items-center mt-2">
          <span className="text-6xl font-black text-white">{count}</span>
          <span className="text-gray-400 text-sm font-medium">/100</span>
        </div>
      </div>
    </div>
  );
}