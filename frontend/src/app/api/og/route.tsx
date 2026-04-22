// Dentro da função return new ImageResponse(...
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom right, #0d1117, #161b22)',
    padding: '60px',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
  }}
>
  {/* Header */}
  <div style={{ position: 'absolute', top: 40, left: 60, display: 'flex', alignItems: 'center' }}>
    <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#58a6ff', marginRight: 10 }} />
    <span style={{ fontSize: 24, fontWeight: 'bold', color: '#58a6ff', letterSpacing: 1 }}>GITSCORE REPORT</span>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
     <img
      src={`https://github.com/${username}.png`}
      width="180"
      height="180"
      style={{ borderRadius: 90, border: '6px solid #30363d' }}
    />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
       <h1 style={{ fontSize: 60, fontWeight: 'bold', color: 'white', margin: 0 }}>@{username}</h1>
       <span style={{ fontSize: 30, color: '#58a6ff', fontWeight: 'bold', textTransform: 'uppercase' }}>{data.level}</span>
    </div>
  </div>

  <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', backgroundColor: '#0d1117', padding: '20px 40px', borderRadius: 20, border: '1px solid #30363d' }}>
     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 40 }}>
        <span style={{ fontSize: 80, fontWeight: 'black', color: 'white' }}>{data.finalScore}</span>
        <span style={{ fontSize: 16, color: '#8b949e' }}>SCORE FINAL</span>
     </div>
     <div style={{ width: 2, height: 100, backgroundColor: '#30363d' }} />
     <div style={{ marginLeft: 40, display: 'flex', flexDirection: 'column', color: '#c9d1d9' }}>
        <span style={{ fontSize: 20, marginBottom: 10 }}>✓ Alta frequência de commits</span>
        <span style={{ fontSize: 20 }}>✓ Impacto técnico validado</span>
     </div>
  </div>
</div>