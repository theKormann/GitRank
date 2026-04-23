"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShareProps {
  username: string;
  score: number;
  level: string;
  insights: string[];
}

export default function ShareButton({ username, score, level, insights }: ShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Construímos a URL da imagem com os dados reais
  const params = new URLSearchParams();
  params.set('username', username);
  params.set('score', score.toString());
  params.set('level', level);
  insights.slice(0, 2).forEach(ins => params.append('insight', ins));
  
  const ogImageUrl = `/api/og?${params.toString()}`;

  const handleDownload = async () => {
    const res = await fetch(ogImageUrl);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gitrank-${username}.png`;
    a.click();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-emerald-500 text-zinc-950 font-bold rounded-full hover:scale-105 transition-transform"
      >
        Partilhar Card
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-zinc-900 border border-zinc-800 p-6 rounded-3xl max-w-2xl w-full">
              <div className="flex justify-between mb-4 text-white font-bold">
                <span>O teu GitRank Wrapped</span>
                <button onClick={() => setIsOpen(false)}>✕</button>
              </div>
              <div className="bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
                <img src={ogImageUrl} alt="Preview" className="w-full h-auto" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                <button onClick={handleDownload} className="py-3 bg-zinc-800 text-white rounded-xl font-bold">Baixar PNG</button>
                <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copiado!"); }} className="py-3 bg-emerald-500 text-zinc-950 rounded-xl font-bold">Copiar Link</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}