import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const BARS = [
  { label:'Math',             pct:72, val:720,   color:'#3498db' },
  { label:'Reading & Writing',pct:67, val:670,   color:'#9b59b6' },
  { label:'Algebra',          pct:85, val:'85%', color:'#012BAA' },
  { label:'Inference',        pct:54, val:'54%', color:'#f39c12' },
]

export default function HybridSection() {
  return (
    <section style={{ position:'relative', zIndex:1, padding:'80px 24px' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:60, alignItems:'center' }}>

          {/* Left */}
          <div>
            <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
              style={{ fontFamily:'Sora,sans-serif', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#012BAA', marginBottom:12 }}>
              Score Visualization
            </motion.p>
            <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
              style={{ fontFamily:'Sora,sans-serif', fontWeight:900, color:'var(--text-primary)', lineHeight:1.1, marginBottom:16, fontSize:'clamp(1.8rem,3.5vw,2.6rem)', transition:'color 0.35s ease' }}>
              Track Every Point<br />of Progress
            </motion.h2>
            <motion.p initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.15 }}
              style={{ fontFamily:'DM Sans,sans-serif', color:'var(--text-muted)', fontSize:'1rem', lineHeight:1.7, marginBottom:24, transition:'color 0.35s ease' }}>
              Your dashboard surfaces exactly where you're gaining — and where you're leaving points on the table.
            </motion.p>
            <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:32 }}>
              {['SAT Prep','IELTS Prep'].map(l => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 16px', borderRadius:100,
                  fontFamily:'Sora,sans-serif', fontSize:'0.83rem', fontWeight:600,
                  color:'var(--text-primary)', background:'var(--bg-pill)', border:'1px solid var(--border-card)',
                  transition:'all 0.35s ease' }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'#012BAA', flexShrink:0 }} />{l}
                </div>
              ))}
            </div>
            <Link to="/login" style={{
              display:'inline-flex', fontFamily:'Sora,sans-serif', fontWeight:700, color:'#fff',
              padding:'12px 28px', borderRadius:100, textDecoration:'none',
              background:'#012BAA', boxShadow:'0 6px 20px rgba(1,43,170,0.35)',
              transition:'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
            >View Dashboard →</Link>
          </div>

          {/* Right — mock dashboard card */}
          <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}
            style={{
              borderRadius:28, padding:28,
              background:'var(--bg-card)',
              backdropFilter:'var(--glass-blur)',
              WebkitBackdropFilter:'var(--glass-blur)',
              border:'1px solid var(--border-card)',
              boxShadow:'var(--shadow-card)',
              animation:'float 5.5s 1s ease-in-out infinite',
              transition:'background 0.35s ease, border-color 0.35s ease',
            }}
          >
            <p style={{ fontFamily:'Sora,sans-serif', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:8 }}>
              Your Progress · SAT
            </p>
            <div style={{ fontFamily:'Sora,sans-serif', fontWeight:900, fontSize:'3rem', color:'#012BAA', lineHeight:1, marginBottom:4 }}>1,390</div>
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.8rem', color:'var(--text-muted)', marginBottom:20, transition:'color 0.35s ease' }}>
              Current score → Target: 1550 (Dream Score)
            </p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {BARS.map((b, i) => (
                <div key={b.label} style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'0.78rem', color:'var(--text-muted)', width:130, flexShrink:0 }}>{b.label}</span>
                  <div style={{ flex:1, height:8, borderRadius:100, background:'var(--border-subtle)', overflow:'hidden' }}>
                    <motion.div initial={{ width:0 }} whileInView={{ width:`${b.pct}%` }} viewport={{ once:true }}
                      transition={{ duration:0.8, delay:0.2+i*0.1 }}
                      style={{ height:'100%', borderRadius:100, background:b.color }} />
                  </div>
                  <span style={{ fontFamily:'Sora,sans-serif', fontSize:'0.75rem', fontWeight:700, color:'var(--text-primary)', width:36, textAlign:'right', transition:'color 0.35s ease' }}>{b.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}