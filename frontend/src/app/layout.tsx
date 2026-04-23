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
      <body className="bg-zinc-950 text-zinc-200 flex flex-col min-h-screen selection:bg-emerald-500/30">
        <div className="flex-grow relative">{children}</div>
        
        <footer className="border-t border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md py-8 mt-auto relative z-10">
          <div className="max-w-3xl mx-auto px-6 flex flex-col items-center text-center space-y-4">
            
            {/* Logo Moderna no Footer */}
            <h2 className="text-xl font-bold text-white tracking-tight">
              Git<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Rank</span>
            </h2>
            
            <p className="text-sm text-zinc-400">
              Open source contribution scoring using public GitHub data.
            </p>
            
            {/* Assinatura do Desenvolvedor */}
            <div className="flex items-center justify-center gap-1.5 text-sm text-zinc-500 pt-2">
              <span>Desenvolvido com ☕ por</span>
              <a 
                href="https://matheuskormann.engineer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors relative group"
              >
                Matheus Kormann
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
          </div>
        </footer>
      </body>
    </html>
  );
}