import { motion } from 'framer-motion'

const FEATURES = [
  { icon: '🧠', title: 'AI Study Planner', desc: 'Set your exam date and weaknesses. Our AI maps a day-by-day personalized plan that adapts as you improve.' },
  { icon: '📚', title: 'Question Bank', desc: '10,000+ curated questions for SAT and IELTS, sorted by topic and difficulty. Cambridge 11–20 for IELTS.' },
  { icon: '⚡', title: 'Question Rush', desc: 'Timed pressure mode — auto-advancing questions build speed and accuracy simultaneously.' },
  { icon: '📝', title: 'Full-Length Mocks', desc: 'Real digital SAT simulations — full test or module-by-module. Authentic timing, adaptive scoring.' },
  { icon: '🎯', title: 'Score Predictor', desc: '20 diagnostic questions to predict your SAT score range with the actual College Board scoring model.' },
  { icon: '✍️', title: 'IELTS Writing AI', desc: 'Submit Task 1 or Task 2. Our AI grades with band-accurate criteria for coherence, lexical resource, and grammar.' },
]

const card = {
  padding: '32px',
  borderRadius: 24,
  background: 'var(--bg-card)',
  backdropFilter: 'var(--glass-blur)',
  WebkitBackdropFilter: 'var(--glass-blur)',
  border: '1px solid var(--border-card)',
  boxShadow: 'var(--shadow-card)',
  transition: 'background 0.35s ease, border-color 0.35s ease, transform 0.25s ease',
  height: '100%',
}

export default function Features() {
  return (
    <section id="features" style={{ position: 'relative', zIndex: 1, padding: '96px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:'Sora,sans-serif', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#012BAA', marginBottom:12 }}>
          Everything You Need
        </motion.p>
        <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          style={{ fontFamily:'Sora,sans-serif', fontWeight:900, color:'var(--text-primary)', lineHeight:1.1, marginBottom:14, fontSize:'clamp(2rem,4vw,3rem)', transition:'color 0.35s ease' }}>
          The Ultimate Ecosystem<br />for High Achievers
        </motion.h2>
        <motion.p initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}
          style={{ fontFamily:'DM Sans,sans-serif', color:'var(--text-muted)', fontSize:'1.05rem', lineHeight:1.7, maxWidth:520, marginBottom:56, transition:'color 0.35s ease' }}>
          From question banks to AI study planners — every tool precision-built to push your score to its absolute ceiling.
        </motion.p>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {FEATURES.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * 0.08 }}
              whileHover={{ y:-4 }}
              style={card}
            >
              <div style={{
                width:50, height:50, borderRadius:14, fontSize:'1.4rem',
                display:'flex', alignItems:'center', justifyContent:'center',
                background:'rgba(1,43,170,0.12)', border:'1px solid rgba(1,43,170,0.18)',
                marginBottom:20,
              }}>{f.icon}</div>
              <h3 style={{ fontFamily:'Sora,sans-serif', fontWeight:700, fontSize:'1rem', color:'var(--text-primary)', marginBottom:8, transition:'color 0.35s ease' }}>{f.title}</h3>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.9rem', color:'var(--text-muted)', lineHeight:1.7, margin:0, transition:'color 0.35s ease' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}