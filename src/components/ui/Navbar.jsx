import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion' // Added for smooth transition
import { LogoFull } from './Logo'
import { useTheme } from '../../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',     href: '#'         },
  { label: 'Features', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'FAQ',      href: '#faq'      },
]

export default function NavBar() {
  const { dark, toggle } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)

  // Listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls more than 20px, set minimized state to true
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', 
      top: 0, // Changed to 0 so we can control padding via motion.div
      left: 0, 
      right: 0, 
      zIndex: 50,
      display: 'flex', 
      justifyContent: 'center',
      padding: '0 24px', 
      pointerEvents: 'none',
      transition: 'all 0.4s ease',
    }}>
      <motion.nav 
        // Framer Motion animations for the "minimize" effect
        initial={false}
        animate={{
          marginTop: isScrolled ? 8 : 16, // Moves closer to top
          maxWidth: isScrolled ? 900 : 1100, // Shrinks horizontally
          paddingTop: isScrolled ? 6 : 10, // Thinner padding
          paddingBottom: isScrolled ? 6 : 10,
        }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        style={{
          pointerEvents: 'auto',
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingLeft: 20,
          paddingRight: 20,
          background: 'var(--bg-nav)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--border-nav)',
          borderRadius: 100,
          boxShadow: 'var(--shadow-nav)',
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >

        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <LogoFull className="h-9" />
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 500,
                color: 'var(--text-muted)', padding: '7px 16px',
                borderRadius: 100, textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#012BAA'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right — toggle + auth buttons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

          {/* Dark / Light toggle */}
          <button
            onClick={toggle}
            title={dark ? 'Switch to Light' : 'Switch to Dark'}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px solid var(--border-subtle)',
              background: 'var(--bg-pill)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', cursor: 'pointer',
              transition: 'all 0.3s ease', flexShrink: 0,
            }}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Sign In */}
          <Link
            to="/login"
            style={{
              fontFamily: 'Sora, sans-serif', fontSize: '0.83rem', fontWeight: 600,
              color: 'var(--text-primary)', padding: '7px 18px',
              borderRadius: 100, border: '1.5px solid var(--border-subtle)',
              textDecoration: 'none', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#012BAA'; e.currentTarget.style.color = '#012BAA' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-primary)' }}
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            to="/login"
            style={{
              fontFamily: 'Sora, sans-serif', fontSize: '0.83rem', fontWeight: 700,
              color: '#fff', padding: '8px 20px', borderRadius: 100,
              background: '#012BAA', textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(1,43,170,0.35)',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Get Started →
          </Link>
        </div>
      </motion.nav>
    </div>
  )
}