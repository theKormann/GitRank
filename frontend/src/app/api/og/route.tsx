import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return new Response('Usuário não informado', { status: 400 });
    }

    const res = await fetch(`http://127.0.0.1:8080/api/v1/gitrank/${username}`, {
      cache: 'no-store'
    });

    if (!res.ok) {
      throw new Error('Erro ao buscar dados no backend');
    }

    const data = await res.json();

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#030712', 
            color: '#f3f4f6',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ fontSize: '70px', fontWeight: '900', letterSpacing: '-0.05em' }}>
              Git<span style={{ color: '#10b981' }}>Rank</span>
            </h1>
          </div>

          <img
            src={`https://github.com/${username}.png`}
            alt={username}
            width="200"
            height="200"
            style={{
              borderRadius: '100px',
              border: '6px solid #1f2937',
              marginBottom: '20px',
            }}
          />
          
          <h2 style={{ fontSize: '50px', margin: '0 0 20px 0', color: '#9ca3af' }}>
            @{username}
          </h2>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1f2937',
              border: '12px solid #10b981', 
              borderRadius: '150px',
              width: '250px',
              height: '250px',
              marginTop: '10px',
            }}
          >
            <span style={{ fontSize: '110px', fontWeight: '900', color: '#ffffff' }}>
              {data.finalScore}
            </span>
          </div>

          <p
            style={{
              fontSize: '40px',
              color: '#10b981',
              textTransform: 'uppercase',
              marginTop: '40px',
              fontWeight: 'bold',
              letterSpacing: '0.1em',
            }}
          >
            NÍVEL: {data.level}
          </p>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`Erro ao gerar a imagem OG: ${e.message}`);
    return new Response(`Erro ao gerar a imagem`, { status: 500 });
  }
}