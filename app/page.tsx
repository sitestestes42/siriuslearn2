export default function HomePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#0A1628',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '500px'
      }}>
        <div style={{
          fontSize: '80px',
          marginBottom: '16px',
          display: 'block',
          animation: 'pulse 3s ease-in-out infinite'
        }}>⭐</div>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #F0F4FF 0%, #1E90FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>SiriusLearn</h1>
        <p style={{
          color: '#87CEEB',
          fontSize: '18px',
          marginTop: '8px',
          marginBottom: '32px'
        }}>Sua IA de estudos e cotidiano</p>
        <a
          href="/login"
          style={{
            display: 'inline-block',
            padding: '14px 40px',
            backgroundColor: '#1E90FF',
            color: 'white',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(30, 144, 255, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 0 50px rgba(30, 144, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(30, 144, 255, 0.3)';
          }}
        >
          Entrar
        </a>
        <p style={{
          color: '#6B8FAE',
          fontSize: '12px',
          marginTop: '24px'
        }}>
          ⚡ Gratuito • SiriusLearn
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </div>
  )
}
