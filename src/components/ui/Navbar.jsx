import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogoFull } from './Logo'
import { useTheme } from '../../context/ThemeContext'

const NAV_LINKS = [
  { label: 'Home',     href: '#'         },
  { label: 'Features', href: '#features' },
  { label: 'Pricing',  href: '#pricing'  },
  { label: 'FAQ',      href: '#faq'      },
]

export default function NavBar() {
  const { dark, toggle } = useTheme() // We use 'dark' here
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 50,
      display: 'flex', 
      justifyContent: 'center',
      padding: '0 24px', 
      pointerEvents: 'none',
    }}>
      <motion.nav 
        initial={false}
        animate={{
          marginTop: isScrolled ? 8 : 16,
          maxWidth: isScrolled ? 940 : 1100, // Adjusted for better balance
          paddingTop: isScrolled ? 8 : 12, 
          paddingBottom: isScrolled ? 8 : 12,
          // Subtle background shift on scroll
          backgroundColor: isScrolled ? 'var(--bg-nav-solid)' : 'var(--bg-nav)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: 'auto',
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          paddingLeft: 24,
          paddingRight: 24,
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--border-nav)',
          borderRadius: 100,
          boxShadow: isScrolled ? '0 20px 40px rgba(0,0,0,0.2)' : 'var(--shadow-nav)',
        }}
      >

        {/* Logo - Passing the 'dark' state as a filter or prop */}
        <Link to="/" style={{ 
          display: 'flex', 
          alignItems: 'center',
          transition: 'filter 0.3s ease'
        }}>
          {/* We use CSS filter to make the logo white in dark mode instantly */}
          <div style={{ filter: dark ? 'brightness(0) invert(1)' : 'none' }}>
             <LogoFull className="h-8" />
          </div>
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4 }}>
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              style={{
                fontFamily: 'Sora, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-muted)', padding: '8px 18px',
                borderRadius: 100, textDecoration: 'none', transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--text-primary)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right — toggle + auth buttons */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid var(--border-nav)',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Sign In */}
          <Link
            to="/login"
            style={{
              fontFamily: 'Sora, sans-serif', fontSize: '0.83rem', fontWeight: 700,
              color: 'var(--text-primary)', textDecoration: 'none',
              padding: '0 10px'
            }}
          >
            Sign In
          </Link>

          {/* Get Started */}
          <Link
            to="/login"
            style={{
              fontFamily: 'Sora, sans-serif', fontSize: '0.83rem', fontWeight: 700,
              color: '#fff', padding: '10px 24px', borderRadius: 100,
              background: 'linear-gradient(135deg, #012BAA, #2d52d4)', 
              textDecoration: 'none',
              boxShadow: '0 8px 20px rgba(1,43,170,0.3)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Get Started
          </Link>
        </div>
      </motion.nav>
    </div>
  )
}