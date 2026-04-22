"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      // Redireciona para a página de resultado dinâmica
      router.push(`/score/${username}`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 text-gray-100">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-2">
            Git<span className="text-emerald-500">Rank</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Descubra o verdadeiro esforço por trás do código.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">github.com/</span>
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full pl-28 pr-4 py-4 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
              placeholder="seu-usuario"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-gray-950 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all"
          >
            Analisar Perfil
          </button>
        </form>
      </div>
    </main>
  );
}