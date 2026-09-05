export default function Loading() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', width: '80px', height: '80px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)', filter: 'blur(10px)', animation: 'pulse 2s infinite' }} />
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(65, 112, 48, 0.2)', borderTopColor: 'var(--green)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0% { transform: scale(0.95); opacity: 0.5; } 50% { transform: scale(1.05); opacity: 0.8; } 100% { transform: scale(0.95); opacity: 0.5; } }
      `}</style>
    </div>
  );
}
