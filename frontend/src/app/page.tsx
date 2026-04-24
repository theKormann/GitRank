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
    <main className="min-h-screen bg-zinc-950 text-zinc-200 relative overflow-hidden selection:bg-emerald-500/30 flex flex-col justify-center">
      {/* Background Glows (Hero) */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-zinc-950/0 to-zinc-950/0 pointer-events-none -z-10 blur-2xl"></div>
      
      {/* Elemento Decorativo: Grelha subtil no fundo */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none -z-20"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-5xl mx-auto w-full p-6 md:p-12 z-10">
        
        {/* HERO SECTION */}
        <section className="text-center py-20 md:py-32 space-y-8 relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm text-sm font-medium text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Análise Algorítmica Atualizada
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white drop-shadow-sm">
            Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Rank</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Mapeie o seu verdadeiro impacto no mundo do desenvolvimento. Descubra como os seus repositórios, commits e contribuições se traduzem num score global.
          </p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto pt-8 relative group">
            {/* Efeito Glow atrás do input (ativa no hover do grupo) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500"></div>
            
            <div className="relative flex gap-2 p-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-700/50 rounded-2xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all shadow-xl">
              
              <div className="pl-4 flex items-center justify-center text-zinc-500">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </div>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Digite seu username do GitHub"
                className="flex-1 bg-transparent px-2 py-3 outline-none text-white font-mono text-base md:text-lg placeholder:text-zinc-500 w-full"
                required
              />
              
              <button 
                type="submit" 
                className="bg-zinc-100 hover:bg-white text-zinc-950 px-6 py-3 rounded-xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
              >
                Analisar
                <span className="hidden sm:inline">→</span>
              </button>
            </div>
          </form>
        </section>

        {/* COMO FUNCIONA (GRID MODERNA) */}
        <section className="py-20 border-t border-zinc-800/60 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">O que compõe o seu Score?</h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              O nosso algoritmo não olha apenas para as contribuições verdes no seu calendário. Analisamos 4 pilares fundamentais usando a API GraphQL do GitHub.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1 */}
            <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-3xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-emerald-400 text-xl font-black">01</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Volume & Frequência</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                A consistência é chave. Medimos a cadência dos seus commits, PRs e issues abertas no último ano.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-3xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-cyan-400 text-xl font-black">02</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Engenharia</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Avaliamos a complexidade do seu código analisando a diversidade de linguagens e estrutura dos seus repositórios originais.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-purple-400 text-xl font-black">03</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Qualidade</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Código bom é código bem documentado. O seu score é influenciado por READMEs completos e repositórios organizados.
              </p>
            </div>

            {/* Card 4 */}
            <div className="group relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/80 rounded-3xl p-8 hover:border-yellow-500/50 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-12 h-12 bg-zinc-800/80 rounded-2xl flex items-center justify-center mb-6 border border-zinc-700 shadow-inner group-hover:scale-110 transition-transform">
                <span className="text-yellow-400 text-xl font-black">04</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Impacto</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                O reconhecimento da comunidade importa. Contabilizamos o número de estrelas e forks que os seus projetos originais recebem.
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}