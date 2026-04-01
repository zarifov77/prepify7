import { motion } from 'framer-motion'
import { IELTS_LISTENING_TESTS } from '../../data/ieltsPrompts'
import toast from 'react-hot-toast'

export default function IELTSListening() {
  const handleStart = (test) => {
    toast('Listening test audio coming soon. Audio files will be linked from Cambridge resources.', { icon: '🎧', duration: 4000 })
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-sora font-black text-xl text-slate-800 mb-2">🎧 Listening Tests</h1>

      {/* Headphone recommendation */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-3 px-5 py-4 rounded-2xl mb-6"
        style={{
          background: 'rgba(1,43,170,0.06)',
          border: '1px solid rgba(1,43,170,0.15)',
        }}
      >
        <span className="text-lg flex-shrink-0">🎧</span>
        <div>
          <p className="font-sora text-sm font-bold text-slate-800 mb-0.5">
            For Optimal Listening Experience
          </p>
          <p className="font-dm text-sm text-slate-500">
            We strongly recommend using headphones or earphones during all listening tests.
            This closely replicates actual IELTS exam conditions and ensures you can clearly
            distinguish between different speakers and accents.
          </p>
        </div>
      </motion.div>

      {/* Tests grid */}
      <div className="grid grid-cols-2 gap-4">
        {IELTS_LISTENING_TESTS.map((test, i) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(0,25,70,0.12)' }}
            onClick={() => handleStart(test)}
            className="rounded-2xl p-5 cursor-pointer transition-all"
            style={{
              background: 'rgba(255,255,255,0.58)',
              border: '1px solid rgba(255,255,255,0.72)',
              boxShadow: '0 4px 16px rgba(0,25,70,0.07)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">🎧</span>
              <span className="font-sora text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(1,43,170,0.10)', color: '#012BAA' }}>
                {test.book}
              </span>
            </div>
            <div className="font-sora font-bold text-sm text-slate-800 mb-1">
              {test.book} · {test.test}
            </div>
            <div className="font-dm text-xs text-slate-400 mb-3">
              {test.sections} sections · {test.questions} questions · {test.duration} min
            </div>
            <button
              className="font-sora text-xs font-bold text-white px-4 py-2 rounded-full transition-all hover:opacity-90"
              style={{ background: '#012BAA', boxShadow: '0 3px 10px rgba(1,43,170,0.25)' }}
            >
              Start Test →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}