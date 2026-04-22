import Link from "next/link";


interface GitRankResult {
  finalScore: number;
  level: string;
  insights: string[];
}

async function getScore(username: string): Promise<GitRankResult | null> {
  try {
    const res = await fetch(`http://localhost:8080/api/v1/gitrank/${username}`, {
      cache: 'no-store'
    });
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function ScorePage({ params }: { params: { username: string } }) {
  const result = await getScore(params.username);

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Usuário não encontrado</h2>
        <p className="text-gray-400 mb-8">Verifique se o nome de usuário do GitHub está correto ou tente novamente mais tarde.</p>
        <Link href="/" className="text-emerald-500 hover:underline">← Voltar para a busca</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <Link href="/" className="text-gray-500 hover:text-white transition-colors mb-8 inline-block">
          ← Nova busca
        </Link>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 text-center shadow-xl">
          <img 
            src={`https://github.com/${params.username}.png`} 
            alt={params.username} 
            className="w-24 h-24 rounded-full mx-auto border-4 border-gray-800 mb-4"
          />
          <h1 className="text-2xl font-bold mb-1">@{params.username}</h1>
          <p className="text-emerald-500 font-medium tracking-wide uppercase text-sm mb-8">
            Nível: {result.level}
          </p>

          <div className="flex justify-center items-center mb-10">
            <div className="relative w-48 h-48 flex items-center justify-center bg-gray-800 rounded-full border-8 border-emerald-500">
              <span className="text-6xl font-black">{result.finalScore}</span>
              <span className="absolute bottom-6 text-gray-400 text-sm">/100</span>
            </div>
          </div>

          <div className="text-left bg-gray-950 p-6 rounded-2xl border border-gray-800">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <span className="mr-2">💡</span> Insights de Qualidade
            </h3>
            <ul className="space-y-3">
              {result.insights.map((insight, index) => (
                <li key={index} className="text-gray-300 text-sm leading-relaxed flex items-start">
                  <span className="text-emerald-500 mr-2 mt-1">✓</span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}