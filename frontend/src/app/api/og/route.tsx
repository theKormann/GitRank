import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const score = searchParams.get('score') || '0';
    const level = searchParams.get('level') || 'Nível Inicial';
    const insights = searchParams.getAll('insight');

    if (!username) return new Response('Missing username', { status: 400 });

    // Função interna para limitar texto e evitar vazamento na imagem
    const truncate = (text: string, limit: number) => 
      text.length > limit ? text.substring(0, limit) + "..." : text;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#09090b',
            backgroundImage: 'linear-gradient(to bottom right, #09090b, #064e3b)',
            padding: '60px 80px',
            position: 'relative',
          }}
        >
          {/* Glow Decorativo */}
          <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '200px', backgroundColor: 'rgba(16, 185, 129, 0.1)', display: 'flex' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', justifyContent: 'space-between' }}>
            {/* Header minimalista */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ fontSize: 32, fontWeight: 900, color: 'white' }}>Git<span style={{ color: '#10b981' }}>Rank</span></span>
              <div style={{ display: 'flex', padding: '6px 14px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: 14, color: '#71717a', fontWeight: 700, letterSpacing: '2px' }}>REPORT 2026</span>
              </div>
            </div>

            {/* Profile Section */}
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
              <img
                src={`https://github.com/${username}.png`}
                style={{ width: 160, height: 160, borderRadius: 80, border: '4px solid #10b981' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 40 }}>
                <h1 style={{ fontSize: 64, fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-2px' }}>@{username}</h1>
                <span style={{ fontSize: 28, color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{level}</span>
              </div>
            </div>

            {/* Metrics Box - Ajustada para não vazar */}
            <div style={{ display: 'flex', backgroundColor: 'rgba(12, 12, 12, 0.7)', border: '1px solid #27272a', borderRadius: '32px', padding: '35px 45px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '150px' }}>
                <span style={{ fontSize: 90, fontWeight: 900, color: 'white', lineHeight: 1 }}>{score}</span>
                <span style={{ fontSize: 14, color: '#10b981', fontWeight: 800, letterSpacing: '2px', marginTop: 10 }}>GIT SCORE</span>
              </div>
              
              <div style={{ width: 1, height: 100, backgroundColor: '#3f3f46', marginLeft: 40, marginRight: 40, display: 'flex' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
                {insights.slice(0, 2).map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: i === 0 ? 15 : 0 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 15 }}>
                      <span style={{ color: '#10b981', fontSize: 12, fontWeight: 'bold' }}>✓</span>
                    </div>
                    {/* Truncamento manual aqui para evitar o vazamento que viu na imagem */}
                    <span style={{ fontSize: 22, color: '#e4e4e7', fontWeight: 500, lineHeight: 1.2 }}>
                      {truncate(text, 40)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    );
  } catch (e) {
    return new Response('Failed to generate image', { status: 500 });
  }
}