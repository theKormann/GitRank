import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GitRank",
  description: "Analise o seu perfil do GitHub e descubra o seu verdadeiro nível de desenvolvedor baseado no esforço real!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className="bg-[#0d1117] text-[#c9d1d9] flex flex-col min-h-screen">
        <div className="flex-grow">{children}</div>
        
        <footer className="border-t border-[#30363d] bg-[#161b22] py-8 mt-auto">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-4">
            <h2 className="text-xl font-bold text-white">GitRank</h2>
            <p className="text-sm text-[#8b949e]">
              Open source contribution scoring using public GitHub data.
            </p>
            <p className="text-xs text-[#8b949e]">
              Built with <span className="text-[#58a6ff]">GitHub API</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}