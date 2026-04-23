"use client";

import { motion, type Variants } from "framer-motion";

export default function InsightsList({ insights }: { insights: string[] }) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const } }
  };

  return (
    <div className="text-left bg-gray-950 p-6 rounded-2xl border border-gray-800 shadow-inner">
      <h3 className="text-lg font-bold mb-4 flex items-center text-gray-200">
        <span className="mr-2 text-xl">💡</span> Insights de Qualidade
      </h3>
      <motion.ul variants={container} initial="hidden" animate="show" className="space-y-4">
        {insights.map((insight, index) => (
          <motion.li 
            key={index} 
            variants={item}
            className="text-gray-400 text-sm leading-relaxed flex items-start bg-gray-900/50 p-3 rounded-lg border border-gray-800/50"
          >
            <span className="text-emerald-500 mr-3 mt-0.5 font-bold">✓</span>
            <span>{insight}</span>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
}