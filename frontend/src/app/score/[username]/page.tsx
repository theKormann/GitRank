import Link from "next/link";
import { Metadata } from "next";
import ShareButton from "../../ShareButton";
import SupportButton from "@/src/components/SupportButton";

interface GitRankResult {
  finalScore: number;
  level: string;
  insights: string[];
  summary?: string;
  totalRepos?: number;
  totalStars?: number;
  totalCommits?: number;
  badges?: string[];
  languages?: Record<string, number>;
  memberSince?: string;
}

const getLanguageColor = (lang: string) => {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6', Java: '#b07219', JavaScript: '#f1e05a', Python: '#3572A5',
    HTML: '#e34c26', CSS: '#563d7c', Go: '#00ADD8', Rust: '#dea584', 'C++': '#f34b7d',
    Ruby: '#701516', C: '#555555', 'C#': '#178600', PHP: '#4F5D95', Vue: '#41b883',
    Kotlin: '#A97BFF', Swift: '#F05138'
  };
  return colors[lang] || '#a1a1aa';
};

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
  const apiUrl = process.env.API_URL || 'http://127.0.0.1:8080';
  try {
    const res = await fetch(`${apiUrl}/api/v1/gitrank/${username}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      console.error(`[GITRANK] Erro da API: Status HTTP ${res.status}`);
      return null;
    }
    return res.json();
  } catch (error) {
    console.error("[GITRANK] 🔥 FALHA CRÍTICA NO FETCH:", error);
    return null;
  }
}

export const dynamic = 'force-dynamic';

export default async function ScorePage({ params }: { params: { username: string } }) {
  const resolvedParams = await params;
  const username = resolvedParams.username;
  const result = await getScore(username);

  if (!result) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-200 p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 rounded-3xl p-10 max-w-md text-center shadow-2xl">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-white mb-3">Dev Not Found</h2>
          <p className="text-zinc-400 mb-8 leading-relaxed">Não conseguimos localizar <strong className="text-zinc-200">@{username}</strong> ou analisar os seus repositórios no GitHub.</p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-zinc-100 text-zinc-950 hover:bg-white rounded-xl text-sm font-bold transition-transform hover:scale-105 active:scale-95">
            Tentar outra pesquisa
          </Link>
        </div>
      </div>
    );
  }

  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.finalScore / 100) * circumference;

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 p-4 md:p-8 relative overflow-hidden selection:bg-emerald-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-zinc-950/0 to-zinc-950/0 pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto w-full space-y-8 pt-4">

        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
          <Link href="/" className="group flex items-center text-zinc-400 hover:text-white transition-colors font-semibold text-sm bg-zinc-900/40 px-5 py-2.5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Nova pesquisa
          </Link>
          
          <div className="flex items-center gap-3">
            <ShareButton
              username={username}
              score={result.finalScore}
              level={result.level}
              insights={result.insights || []}
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <div className="col-span-1 md:col-span-4 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center shadow-xl hover:border-zinc-700 transition-colors">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 rounded-full"></div>
              <img
                src={`https://github.com/${username}.png`}
                alt={username}
                className="relative w-36 h-36 rounded-full border-4 border-zinc-800 shadow-2xl object-cover"
              />
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight mb-1">@{username}</h1>
            
            {result.memberSince && (
               <span className="text-zinc-500 text-sm font-medium mb-4 block">Membro desde {result.memberSince}</span>
            )}

            <div className="mt-1 inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent text-sm font-extrabold tracking-widest uppercase">
                Nível: {result.level}
              </span>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-[2.5rem] p-8 flex flex-col items-center justify-center shadow-xl hover:border-zinc-700 transition-colors relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-zinc-400 font-bold tracking-widest uppercase text-xs mb-6 z-10">GitRank Score</h3>

            <div className="relative w-48 h-48 flex items-center justify-center z-10">
              <svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-xl" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r={radius} className="stroke-zinc-800" strokeWidth="12" fill="none" />
                <circle
                  cx="80" cy="80" r={radius}
                  className="stroke-emerald-500 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  style={{ strokeDasharray: circumference, strokeDashoffset: strokeDashoffset }}
                />
              </svg>
              <div className="flex flex-col items-center justify-center">
                <span className="text-6xl font-black text-white tracking-tighter">{result.finalScore}</span>
                <span className="text-zinc-500 font-medium text-sm mt-1">/100</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 grid grid-rows-3 gap-4">
            <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] p-5 flex items-center justify-between hover:border-zinc-700 transition-colors group">
              <div>
                <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase block mb-1">Repositórios</span>
                <span className="text-3xl font-black text-white">{result.totalRepos ?? '--'}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                📦
              </div>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] p-5 flex items-center justify-between hover:border-zinc-700 transition-colors group">
              <div>
                <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase block mb-1">Total Estrelas</span>
                <span className="text-3xl font-black text-white">{result.totalStars ?? '--'}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-400 group-hover:scale-110 transition-transform">
                ⭐
              </div>
            </div>

            <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-[2rem] p-5 flex items-center justify-between hover:border-zinc-700 transition-colors group">
              <div>
                <span className="text-zinc-500 text-xs font-bold tracking-widest uppercase block mb-1">Commits Recentes</span>
                <span className="text-3xl font-black text-white">{result.totalCommits ?? '--'}</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                ⚡
              </div>
            </div>
          </div>

          {(result.languages || result.badges) && (
            <div className="col-span-1 md:col-span-12 bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/60 rounded-[2.5rem] p-8 grid grid-cols-1 md:grid-cols-2 gap-12">

              {result.languages && Object.keys(result.languages).length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-6 bg-cyan-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Stack Tecnológica</h3>
                  </div>

                  <div className="w-full h-3 rounded-full overflow-hidden flex mb-6 bg-zinc-800 shadow-inner">
                    {Object.entries(result.languages).map(([lang, pct]) => (
                      <div
                        key={lang}
                        style={{ width: `${pct}%`, backgroundColor: getLanguageColor(lang) }}
                        className="h-full hover:brightness-125 transition-all cursor-pointer"
                        title={`${lang}: ${pct}%`}
                      />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm">
                    {Object.entries(result.languages).map(([lang, pct]) => (
                      <div key={lang} className="flex items-center gap-2 bg-zinc-800/30 px-3 py-1.5 rounded-lg border border-zinc-700/50">
                        <span className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: getLanguageColor(lang) }}></span>
                        <span className="text-zinc-300 font-semibold">{lang}</span>
                        <span className="text-zinc-500 ml-1">{pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {result.badges && result.badges.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-6 bg-purple-500 rounded-full"></div>
                    <h3 className="text-lg font-bold text-white">Conquistas</h3>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {result.badges.map((badge, index) => (
                      <div
                        key={index}
                        className="group relative flex items-center px-4 py-2 rounded-xl bg-gradient-to-b from-zinc-800/80 to-zinc-900 border border-zinc-700/80 shadow-lg hover:border-purple-500/50 transition-all hover:-translate-y-0.5 cursor-default"
                      >
                        <div className="absolute inset-0 bg-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="relative z-10 text-zinc-200 text-sm font-semibold tracking-wide flex items-center gap-2">
                          {badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="col-span-1 md:col-span-12 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 backdrop-blur-md border border-zinc-800/80 rounded-[2.5rem] p-8 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-xl font-bold mb-6 flex items-center text-white">
              <span className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Análise de Desempenho
            </h3>

            {result.summary ? (
              <div className="text-zinc-300 text-base leading-relaxed whitespace-pre-line">
                {result.summary}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.insights?.map((insight, index) => (
                  <div key={index} className="bg-zinc-800/30 border border-zinc-700/50 p-5 rounded-2xl flex items-start gap-3 hover:bg-zinc-800/50 transition-colors">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-emerald-400 text-xs">✓</span>
                    </div>
                    <p className="text-zinc-300 text-sm leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <footer className="pt-12 pb-8 flex flex-col items-center">
          <p className="text-zinc-500 text-sm mb-6 font-medium">Gostou da análise? Ajude a manter o projeto!</p>
          <SupportButton />
        </footer>

      </div>
    </main>
  );
}