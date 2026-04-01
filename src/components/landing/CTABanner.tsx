import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTABanner() {
    return (
        <section style={{ position: 'relative', zIndex: 1, padding: '20px 24px 80px' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <motion.div 
                    initial={{ opacity: 0, y: 24 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                    style={{
                        borderRadius: 40, 
                        padding: '80px 48px', 
                        textAlign: 'center', 
                        position: 'relative', 
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #001946, #0a2a5e)',
                        boxShadow: '0 20px 60px rgba(0,25,70,0.35)',
                    }}
                >
                    {/* Decorative Background Element */}
                    <div style={{ 
                        position: 'absolute', 
                        top: '-60%', 
                        right: '-10%', 
                        width: 500, 
                        height: 500, 
                        background: 'radial-gradient(circle, rgba(1,43,170,0.30), transparent)',
                        pointerEvents: 'none' 
                    }} />

                    <h2 style={{ 
                        fontFamily: 'Sora, sans-serif', 
                        fontWeight: 900, 
                        color: '#fff', 
                        lineHeight: 1.1, 
                        marginBottom: 16, 
                        fontSize: 'clamp(2rem, 4vw, 3rem)' 
                    }}>
                        Your Target Score<br />Is Closer Than You Think
                    </h2>

                    <p style={{ 
                        fontFamily: 'DM Sans, sans-serif', 
                        fontSize: '1.05rem', 
                        marginBottom: 36, 
                        position: 'relative', 
                        color: 'rgba(255,255,255,0.60)' 
                    }}>
                        Join 50,000+ students who chose Prepify to reach their academic goals.
                    </p>

                    <Link to="/login" style={{
                        display: 'inline-flex', 
                        fontFamily: 'Sora, sans-serif', 
                        fontWeight: 700, 
                        color: '#001946',
                        padding: '14px 36px', 
                        borderRadius: 100, 
                        textDecoration: 'none',
                        background: '#fff', 
                        boxShadow: '0 6px 24px rgba(0,0,0,0.25)',
                        transition: 'transform 0.2s, box-shadow 0.2s', 
                        position: 'relative',
                    }}
                    onMouseEnter={e => { 
                        e.currentTarget.style.transform = 'translateY(-2px)'; 
                        e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.35)'; 
                    }}
                    onMouseLeave={e => { 
                        e.currentTarget.style.transform = 'translateY(0)'; 
                        e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.25)'; 
                    }}
                    >
                        Start Free – No Card Required →
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}