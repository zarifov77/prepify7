import { motion } from 'framer-motion'
import { IELTS_READING_TESTS } from '../../data/ieltsPrompts'
import toast from 'react-hot-toast'

export default function IELTSReading() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-sora font-black text-xl text-slate-800 mb-6">📖 Reading Tests</h1>

      <div className="grid grid-cols-2 gap-4">
        {IELTS_READING_TESTS.map((test, i) => (
          <motion.div
            key={test.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -3, boxShadow: '0 12px 36px rgba(0,25,70,0.12)' }}
            onClick={() => toast('Reading test content coming soon!', { icon: '📖' })}
            className="rounded-2xl p-5 cursor-pointer transition-all"
            style={{
              background: 'rgba(255,255,255,0.58)',
              border: '1px solid rgba(255,255,255,0.72)',
              boxShadow: '0 4px 16px rgba(0,25,70,0.07)',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">📖</span>
              <span className="font-sora text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(1,43,170,0.10)', color: '#012BAA' }}>
                {test.book}
              </span>
            </div>
            <div className="font-sora font-bold text-sm text-slate-800 mb-1">
              {test.book} · {test.test}
            </div>
            <div className="font-dm text-xs text-slate-400 mb-3">
              {test.passages} passages · {test.questions} questions · {test.duration} min
            </div>
            <button
              className="font-sora text-xs font-bold text-white px-4 py-2 rounded-full"
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