import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const STATS = [
  { num: '1520+', label: 'Avg SAT score' },
  { num: '80.',   label: 'Avg IELTS band' },
  { num: '1K+',  label: 'Students enrolled' },
  { num: '97%',   label: 'Score improvement' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const { dark } = useTheme()

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 80px',
        overflow: 'hidden',
      }}
    >
      {/* Background university image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundRepeat: 'no-repeat',
        transition: 'filter 0.35s ease',
        filter: dark ? 'brightness(0.3) saturate(0.8)' : 'brightness(1)',
      }} />

      {/* Gradient overlay — adapts to dark/light */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: dark
          ? 'linear-gradient(to bottom, rgba(14,21,37,0.75) 0%, rgba(14,21,37,0.65) 40%, rgba(14,21,37,0.92) 85%, rgba(14,21,37,1) 100%)'
          : 'linear-gradient(to bottom, rgba(248,243,240,0.88) 0%, rgba(248,243,240,0.78) 40%, rgba(248,243,240,0.95) 85%, rgba(248,243,240,1) 100%)',
        transition: 'background 0.35s ease',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

        {/* Badge */}
        <motion.div {...fadeUp(0.1)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px', borderRadius: 100, marginBottom: 32,
            background: 'var(--bg-pill)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-card)',
            boxShadow: '0 2px 12px rgba(0,25,70,0.10)',
          }}
        >
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#012BAA', animation: 'pulse-dot 2s infinite', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Sora, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Trusted by 1,000+ students
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fadeUp(0.15)}
          style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 12, fontSize: 'clamp(2.8rem, 7vw, 5.2rem)' }}
        >
          <span style={{ background: 'linear-gradient(135deg, #012BAA 20%, #2d52d4 80%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Master the Digital SAT
          </span>
          <br />
          <span style={{ color: 'var(--text-primary)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', transition: 'color 0.35s ease' }}>
            & IELTS — Directly through your device.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p {...fadeUp(0.2)}
          style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 40px', fontSize: 'clamp(1rem, 2vw, 1.12rem)', transition: 'color 0.35s ease' }}
        >
          The ultimate exam preparation ecosystem. AI-powered study plans, thousands of
          practice questions, real exam simulations, and personalized coaching.
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.25)} style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
          <Link to="/login" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 700, color: '#fff',
            padding: '14px 32px', borderRadius: 100, textDecoration: 'none',
            background: '#012BAA', boxShadow: '0 6px 24px rgba(1,43,170,0.40)',
            transition: 'transform 0.2s, opacity 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Start Free Today →
          </Link>
          <a href="#features" style={{
            fontFamily: 'Sora, sans-serif', fontWeight: 600,
            color: 'var(--text-primary)', padding: '14px 32px', borderRadius: 100, textDecoration: 'none',
            background: 'var(--bg-pill)', border: '1.5px solid var(--border-card)',
            backdropFilter: 'blur(12px)', transition: 'transform 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            ▶ Watch Demo
          </a>
        </motion.div>

        {/* Stat cards */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(0.3 + i * 0.07)}
              style={{
                textAlign: 'left', padding: '18px 24px', borderRadius: 20, minWidth: 140,
                background: 'var(--bg-card)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-card)',
                animation: `float ${4.5 + i * 0.5}s ${i * 0.8}s ease-in-out infinite`,
                transition: 'background 0.35s ease, border-color 0.35s ease',
              }}
            >
              <div style={{ fontFamily: 'Sora, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#012BAA', lineHeight: 1 }}>
                {s.num}
              </div>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4, transition: 'color 0.35s ease' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}