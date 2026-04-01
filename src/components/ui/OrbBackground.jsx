export default function OrbBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        style={{
          position: 'absolute',
          width: 700, height: 700,
          background: `radial-gradient(circle, var(--orb-1), transparent 70%)`,
          top: -200, right: -100,
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'drift 18s ease-in-out infinite',
          opacity: 0.9,
          transition: 'background 0.35s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 500, height: 500,
          background: `radial-gradient(circle, var(--orb-2), transparent 70%)`,
          bottom: -100, left: -100,
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'drift 22s ease-in-out infinite',
          animationDelay: '-8s',
          opacity: 0.8,
          transition: 'background 0.35s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 400, height: 400,
          background: `radial-gradient(circle, var(--orb-1), transparent 70%)`,
          top: '45%', left: '38%',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'drift 16s ease-in-out infinite',
          animationDelay: '-4s',
          opacity: 0.5,
          transition: 'background 0.35s ease',
        }}
      />
    </div>
  )
}