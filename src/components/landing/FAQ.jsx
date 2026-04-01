import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FAQS = [
  { q: 'Can I use Prepify for both SAT and IELTS?', a: 'Yes! Prepify supports both exams under one account. Simply switch between SAT Prep and IELTS Prep modes from the top of your dashboard sidebar. Your progress is tracked separately for each exam.' },
  { q: 'Can I change the difficulty of practice questions?', a: 'Absolutely. Every question bank section has a difficulty filter (Easy, Medium, Hard) so you can focus where you need the most work. The AI study planner also automatically adjusts your practice queue based on your performance.' },
  { q: 'How accurate is the Score Predictor?', a: 'Our score predictor uses the actual College Board scoring rubric model — 20 diagnostic questions calibrated to predict your score within ±50 points.' },
  { q: 'Which IELTS books does Prepify use?', a: 'We use Cambridge IELTS books 11 through 20 for Listening and Reading tests. These are the gold standard for IELTS preparation.' },
  { q: 'Does the free plan ever expire?', a: 'Never. The free Starter plan is free forever with no time limit. You get 50 questions per day and access to Question Rush mode.' },
  { q: 'How does the IELTS Writing AI grader work?', a: 'You submit your Task 1 or Task 2 essay and our AI grades it against the four official IELTS band descriptors: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy.' },
]

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      borderRadius:18, overflow:'hidden',
      background:'var(--bg-card)',
      backdropFilter:'var(--glass-blur)',
      WebkitBackdropFilter:'var(--glass-blur)',
      border:'1px solid var(--border-card)',
      boxShadow:'var(--shadow-card)',
      transition:'background 0.35s ease, border-color 0.35s ease',
    }}>
      <button onClick={() => setOpen(o => !o)}
        style={{
          width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'20px 24px', textAlign:'left', background:'transparent', border:'none',
          cursor:'pointer', gap:12,
          fontFamily:'Sora,sans-serif', fontSize:'0.93rem', fontWeight:600,
          color:'var(--text-primary)', transition:'color 0.35s ease',
        }}
      >
        <span>{question}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration:0.25 }}
          style={{
            flexShrink:0, width:26, height:26, borderRadius:'50%',
            background:'rgba(1,43,170,0.10)', color:'#012BAA',
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem',
          }}>▼</motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }}
            exit={{ height:0, opacity:0 }} transition={{ duration:0.28, ease:'easeInOut' }}
            style={{ overflow:'hidden' }}
          >
            <p style={{
              padding:'0 24px 20px', paddingTop:14,
              fontFamily:'DM Sans,sans-serif', fontSize:'0.9rem',
              color:'var(--text-secondary)', lineHeight:1.7, margin:0,
              borderTop:'1px solid var(--border-subtle)',
              transition:'color 0.35s ease',
            }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" style={{ position:'relative', zIndex:1, padding:'96px 24px' }}>
      <div style={{ maxWidth:780, margin:'0 auto' }}>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:'Sora,sans-serif', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#012BAA', marginBottom:12 }}>
          Frequently Asked Questions
        </motion.p>
        <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          style={{ fontFamily:'Sora,sans-serif', fontWeight:900, color:'var(--text-primary)', marginBottom:40, fontSize:'clamp(2rem,4vw,2.8rem)', transition:'color 0.35s ease' }}>
          Got Questions?
        </motion.h2>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {FAQS.map((faq, i) => (
            <motion.div key={i} initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: i * 0.06 }}>
              <FAQItem question={faq.q} answer={faq.a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}