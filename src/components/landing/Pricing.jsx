import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const PLANS = [
  {
    name: 'Starter', price: '0', period: 'Free forever',
    features: ['50 questions/day', 'Question Rush access', 'Basic dashboard', 'SAT & IELTS content'],
    cta: 'Start Free', featured: false,
  },
  {
    name: 'Elite Pro', price: '19', period: 'per month · cancel anytime',
    badge: 'Most Popular',
    features: ['Unlimited questions', 'AI Study Planner', 'Full-length mock tests', 'Score Predictor', 'IELTS Writing AI checker', 'Detailed analytics'],
    cta: 'Get Elite Pro →', featured: true,
  },
  {
    name: 'Academic Elite', price: 'TBA', period: 'Institutional pricing',
    badge: 'Coming Soon',
    features: ['Everything in Elite Pro', 'School / tutor dashboard', 'Student progress tracking', 'Bulk seat licenses', 'Priority support'],
    cta: 'Join Waitlist', featured: false, comingSoon: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ position:'relative', zIndex:1, padding:'96px 24px', textAlign:'center' }}>
      <div style={{ maxWidth:1100, margin:'0 auto' }}>

        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          style={{ fontFamily:'Sora,sans-serif', fontSize:'0.75rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'#012BAA', marginBottom:12 }}>
          Simple Pricing
        </motion.p>
        <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          style={{ fontFamily:'Sora,sans-serif', fontWeight:900, color:'var(--text-primary)', lineHeight:1.1, marginBottom:52, fontSize:'clamp(2rem,4vw,3rem)', transition:'color 0.35s ease' }}>
          Stop Guessing.<br />Start Dominating.
        </motion.h2>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {PLANS.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }} transition={{ delay: i * 0.1 }}
              style={{
                position:'relative', borderRadius:28, padding:'36px 28px', textAlign:'left',
                background: plan.featured ? '#012BAA' : 'var(--bg-card)',
                backdropFilter: plan.featured ? 'none' : 'var(--glass-blur)',
                WebkitBackdropFilter: plan.featured ? 'none' : 'var(--glass-blur)',
                border: plan.featured ? 'none' : '1px solid var(--border-card)',
                boxShadow: plan.featured
                  ? '0 16px 48px rgba(1,43,170,0.50)'
                  : 'var(--shadow-card)',
                transition:'background 0.35s ease, border-color 0.35s ease',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position:'absolute', top:-14, left:'50%', transform:'translateX(-50%)',
                  fontFamily:'Sora,sans-serif', fontSize:'0.72rem', fontWeight:700,
                  padding:'5px 14px', borderRadius:100, whiteSpace:'nowrap',
                  background: plan.featured ? '#001946' : 'rgba(1,43,170,0.12)',
                  color: plan.featured ? '#fff' : '#012BAA',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{
                fontFamily:'Sora,sans-serif', fontSize:'0.75rem', fontWeight:700,
                letterSpacing:'0.10em', textTransform:'uppercase', marginBottom:12,
                color: plan.featured ? 'rgba(255,255,255,0.60)' : 'var(--text-muted)',
              }}>
                {plan.name}
              </div>

              {/* Price */}
              <div style={{
                fontFamily:'Sora,sans-serif', fontWeight:900, marginBottom:4, lineHeight:1,
                fontSize: plan.comingSoon ? '1.6rem' : '2.8rem',
                color: plan.featured ? '#fff' : plan.comingSoon ? 'var(--text-muted)' : 'var(--text-primary)',
                transition:'color 0.35s ease',
              }}>
                {!plan.comingSoon && <span style={{ fontSize:'1.2rem', fontWeight:500 }}>$</span>}
                {plan.price}
              </div>

              {/* Period */}
              <div style={{
                fontFamily:'DM Sans,sans-serif', fontSize:'0.83rem', marginBottom:24,
                color: plan.featured ? 'rgba(255,255,255,0.55)' : 'var(--text-muted)',
              }}>
                {plan.period}
              </div>

              {/* Features */}
              <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:10 }}>
                {plan.features.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:10, fontFamily:'DM Sans,sans-serif', fontSize:'0.88rem',
                    color: plan.featured ? 'rgba(255,255,255,0.88)' : 'var(--text-secondary)',
                    transition:'color 0.35s ease',
                  }}>
                    <span style={{
                      width:18, height:18, borderRadius:'50%', flexShrink:0,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.65rem', fontWeight:700,
                      background: plan.featured ? 'rgba(255,255,255,0.22)' : 'rgba(1,43,170,0.12)',
                      color: plan.featured ? '#fff' : '#012BAA',
                    }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to={plan.comingSoon ? '#' : '/login'} style={{
                display:'block', width:'100%', textAlign:'center',
                padding:'13px', borderRadius:100,
                fontFamily:'Sora,sans-serif', fontSize:'0.9rem', fontWeight:700,
                textDecoration:'none', transition:'all 0.25s',
                background: plan.featured ? '#fff'
                  : plan.comingSoon ? 'transparent' : 'var(--bg-pill)',
                color: plan.featured ? '#012BAA'
                  : plan.comingSoon ? 'var(--text-muted)' : 'var(--text-primary)',
                border: plan.featured ? 'none'
                  : `1.5px solid ${plan.comingSoon ? 'var(--border-card)' : 'var(--border-subtle)'}`,
                boxShadow: plan.featured ? '0 4px 16px rgba(0,0,0,0.18)' : 'none',
              }}>
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}