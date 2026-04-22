"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) router.push(`/score/${username}`);
  };

  return (
    <main className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* HERO SECTION */}
        <section className="text-center py-16 space-y-6">
          <h1 className="text-6xl font-black tracking-tight text-white">
            Git<span className="text-[#58a6ff]">Rank</span>
          </h1>
          <p className="text-xl text-[#8b949e] max-w-lg mx-auto">
            Mapeie o seu impacto no mundo open-source com uma análise algorítmica do seu perfil.
          </p>

          <form onSubmit={handleSearch} className="max-w-md mx-auto pt-8">
            <div className="flex gap-2 p-2 bg-[#161b22] border border-[#30363d] rounded-xl focus-within:border-[#58a6ff] transition-all">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Introduza o seu utilizador GitHub"
                className="flex-1 bg-transparent px-4 py-2 outline-none text-white font-mono"
                required
              />
              <button type="submit" className="bg-[#1f6feb] hover:bg-[#388bfd] text-white px-6 py-2 rounded-lg font-bold transition-colors">
                Analisar
              </button>
            </div>
          </form>
        </section>

        {/* COMO FUNCIONA */}
        <section className="grid md:grid-cols-2 gap-8 py-12 border-t border-[#30363d]">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Como funciona a pontuação?</h2>
            <p className="text-[#8b949e]">
              O nosso algoritmo analisa os últimos 12 meses de atividade pública para gerar um score de 0 a 100, baseado em quatro pilares principais:
            </p>
          </div>
          <div className="grid gap-4 text-sm">
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
              <span className="text-[#58a6ff] font-bold">01. Volume & Frequência</span>
              <p className="text-[#8b949e]">Contagem de commits e regularidade de contribuições.</p>
            </div>
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
              <span className="text-[#3fb950] font-bold">02. Qualidade & Impacto</span>
              <p className="text-[#8b949e]">Estrelas e forks recebidos nos seus repositórios.</p>
            </div>
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
              <span className="text-[#a5d6ff] font-bold">03. Colaboração</span>
              <p className="text-[#8b949e]">Participação em Pull Requests e Issues em projetos de terceiros.</p>
            </div>
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-lg">
              <span className="text-[#f85149] font-bold">04. Complexidade</span>
              <p className="text-[#8b949e]">Análise técnica de linguagens e estrutura de código via GraphQL.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}