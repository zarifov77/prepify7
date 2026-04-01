import { motion } from 'framer-motion'
import clsx from 'clsx'

export default function GlassCard({ children, className, hover = true, onClick, ...props }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, boxShadow: '0 20px 60px rgba(0,0,0,0.20)' } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={clsx('glass-card', className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}