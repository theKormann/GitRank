export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100 p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* Animate-pulse é uma classe nativa do Tailwind para efeito de carregamento */}
        <div className="animate-pulse bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col items-center shadow-xl">
          {/* Avatar Skeleton */}
          <div className="w-24 h-24 bg-gray-800 rounded-full mb-4"></div>
          {/* Nome e Nível Skeleton */}
          <div className="h-6 w-32 bg-gray-800 rounded mb-2"></div>
          <div className="h-4 w-24 bg-gray-800 rounded mb-8"></div>
          
          {/* Círculo de Pontuação Skeleton */}
          <div className="w-48 h-48 bg-gray-800 rounded-full mb-10 border-8 border-gray-700"></div>
          
          {/* Insights Skeleton */}
          <div className="w-full space-y-4 text-left p-6">
             <div className="h-5 w-48 bg-gray-800 rounded mb-4"></div>
             <div className="h-4 w-full bg-gray-800 rounded"></div>
             <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
          </div>
        </div>
      </div>
    </main>
  );
}