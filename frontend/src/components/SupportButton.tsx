"use client";

import { useState } from "react";

export default function SupportButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixCode = "00020126360014BR.GOV.BCB.PIX0114+55119853490665204000053039865802BR5925MATHEUS HENRIQUE MENEZES 6007S PAULO62290525MDVlODE3OGQtOWY1My00YzQwL63048806"; 

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center gap-3 mt-12 w-full">
      <button
        onClick={handleCopyPix}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-zinc-900/50 backdrop-blur-md border ${copied ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-zinc-800/80'} rounded-2xl overflow-hidden transition-all hover:border-emerald-500/50 active:scale-95 w-full max-w-sm`}
      >

        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        
        <span className={`text-2xl transition-transform duration-300 ${isHovered && !copied ? 'scale-110 -rotate-12' : 'scale-100'}`}>
          {copied ? '✅' : '☕'}
        </span>
        
        <span className="relative z-10 font-bold text-zinc-200 group-hover:text-white transition-colors">
          {copied ? 'Código PIX Copiado!' : 'Apoiar o projeto (PIX)'}
        </span>
      </button>

      <p className={`text-xs font-medium transition-all duration-500 ${copied ? 'text-emerald-400 opacity-100 translate-y-0' : 'text-zinc-500 opacity-60 -translate-y-1'}`}>
        {copied ? 'Agora é só colar no seu app do banco!' : 'Ajude para melhorarmos cada vez mais!'}
      </p>
    </div>
  );
}