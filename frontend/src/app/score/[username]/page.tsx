import Link from "next/link";
import { Metadata } from "next";
import ShareButton from "../../ShareButton";

interface GitRankResult {
  finalScore: number;
  level: string;
  insights: string[];
  summary?: string;
  totalRepos?: number;
  totalStars?: number;
  totalCommits?: number;
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  return {
    title: `GitRank | Score de @${username}`,
    description: `Descubra a análise profunda do perfil de ${username} no GitHub.`,
    openGraph: {
      title: `GitRank | Score de @${username}`,
      description: `Confira o meu nível de engenheiro de software baseado no meu esforço real no GitHub!`,
      images: [{
        url: `/api/og?username=${username}`,
        width: 1200,
        height: 630,
        alt: `GitRank Score de ${username}`,
      }],
    },
  };
}

async function getScore(username: string): Promise<GitRankResult | null> {
  try {
    // O Next.js executa isto do lado do servidor, logo encontra o Java no Codespaces perfeitamente!
    const res = await fetch(`http://127.0.0.1:8080/api/v1/gitrank/${username}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ScorePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const result = await getScore(username);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center text-[#c9d1d9] p-6">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 max-w-md text-center shadow-xl">
          <svg className="w-12 h-12 text-[#f85149] mx-auto mb-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm9 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-.25-6.25a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 1.5 0v-3.5Z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-white mb-3">Utilizador não encontrado</h2>
          <p className="text-[#8b949e] mb-6">Não conseguimos localizar @{username} ou analisar os seus repositórios.</p>
          <Link href="/" className="inline-block px-5 py-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] rounded-md text-sm font-semibold transition-colors text-white">
            Voltar para a pesquisa
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 flex flex-col items-center selection:bg-[#58a6ff] selection:text-white">
      <div className="max-w-4xl w-full pt-8 space-y-6">
        
        {/* Barra Superior */}
        <div className="flex justify-between items-center mb-4">
          <Link href="/" className="group flex items-center text-[#58a6ff] hover:text-[#79c0ff] transition-colors font-medium text-sm">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Nova pesquisa
          </Link>
          <ShareButton />
        </div>

        {/* Card Principal */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl">
          
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Foto e Identidade */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
              <img 
                src={`https://github.com/${username}.png`} 
                alt={username} 
                className="w-32 h-32 rounded-full border border-[#30363d] shadow-md mb-6"
              />
              <h1 className="text-3xl font-bold text-white mb-2">@{username}</h1>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#58a6ff]/30 bg-[#58a6ff]/10 text-[#58a6ff] text-sm font-bold tracking-widest uppercase">
                Nível: {result.level}
              </div>
            </div>

            {/* Gráfico do Score Central */}
            <div className="shrink-0 flex flex-col items-center justify-center my-6 md:my-0">
              <div className="relative w-44 h-44 flex items-center justify-center rounded-full border-[12px] border-[#1f6feb] bg-[#0d1117] shadow-inner">
                <div className="flex flex-col items-center mt-2">
                  <span className="text-6xl font-black text-white leading-none">{result.finalScore}</span>
                  <span className="text-[#8b949e] font-bold text-[11px] tracking-widest mt-2 uppercase">Git Score</span>
                </div>
              </div>
            </div>

            {/* Métricas à Direita */}
            <div className="flex-1 flex md:justify-end w-full">
              <div className="grid grid-cols-3 md:grid-cols-2 gap-3 w-full">
                <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] text-center flex flex-col justify-center transition-colors hover:border-[#8b949e]">
                  <span className="block text-2xl font-bold text-white">{result.totalRepos ?? '--'}</span>
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider mt-1">Repos</span>
                </div>
                <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] text-center flex flex-col justify-center transition-colors hover:border-[#8b949e]">
                  <span className="block text-2xl font-bold text-white">{result.totalStars ?? '--'}</span>
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider mt-1">Estrelas</span>
                </div>
                <div className="bg-[#0d1117] p-4 rounded-xl border border-[#30363d] text-center flex flex-col justify-center col-span-3 md:col-span-2 transition-colors hover:border-[#8b949e]">
                  <span className="block text-2xl font-bold text-white">{result.totalCommits ?? '--'}</span>
                  <span className="text-[10px] text-[#8b949e] uppercase font-bold tracking-wider mt-1">Commits (12m)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secção de Resumo (Atualizada) */}
          <div className="bg-[#0d1117] p-8 md:p-12 border-t border-[#30363d]">
            <h3 className="text-lg font-bold mb-6 flex items-center text-white">
              <span className="w-2.5 h-2.5 bg-[#58a6ff] rounded-full mr-3 animate-pulse"></span>
              Resumo do Desempenho
            </h3>
            
            {result.summary ? (
              /* A classe whitespace-pre-line garante que as quebras de linha enviadas pelo Java (\n) são respeitadas */
              <div className="bg-[#161b22] border border-[#30363d] p-6 md:p-8 rounded-xl text-[#c9d1d9] text-sm md:text-base leading-relaxed whitespace-pre-line shadow-sm">
                {result.summary}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.insights?.map((insight, index) => (
                  <div key={index} className="bg-[#161b22] border border-[#30363d] p-4 rounded-xl flex items-start">
                    <span className="text-[#3fb950] mr-3 mt-0.5">✓</span>
                    <p className="text-[#c9d1d9] text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </main>
  );
}