import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { callAI } from '../../lib/anthropic'
import useExamStore from '../../store/examStore'
import toast from 'react-hot-toast'

const SAT_WEAKNESSES = ['Algebra', 'Reading Evidence', 'Inference', 'Grammar', 'Trigonometry', 'Data Analysis', 'Word Choice', 'Cross-Text']
const IELTS_WEAKNESSES = ['Listening Section 3', 'Reading True/False', 'Writing Task 2', 'Vocabulary Range', 'Grammar Accuracy', 'Speaking Fluency']

export default function StudyPlanner() {
  const { exam, examDate, setExamDate } = useExamStore()
  const [selectedWeaknesses, setSelectedWeaknesses] = useState(new Set())
  const [dailyHours, setDailyHours] = useState('2')
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)

  const weaknesses = exam === 'sat' ? SAT_WEAKNESSES : IELTS_WEAKNESSES

  const toggleWeakness = (w) => {
    setSelectedWeaknesses(prev => {
      const next = new Set(prev)
      next.has(w) ? next.delete(w) : next.add(w)
      return next
    })
  }

  const generatePlan = async () => {
    if (!examDate) { toast.error('Please select your exam date first'); return }
    if (selectedWeaknesses.size === 0) { toast.error('Please select at least one weak area'); return }
    setLoading(true)
    setPlan(null)
    try {
      const result = await callAI('study-plan', {
        exam,
        examDate,
        weaknesses: [...selectedWeaknesses],
        dailyHours,
      })
      setPlan(Array.isArray(result) ? result : generateFallbackPlan())
    } catch {
      setPlan(generateFallbackPlan())
      toast('Using offline plan — connect to internet for AI plan', { icon: '📡' })
    }
    setLoading(false)
  }

  const generateFallbackPlan = () => [
    { week: 1, title: 'Foundation Building', focus: [...selectedWeaknesses].slice(0, 2).join(', ') || 'Core skills', dailyTasks: ['20 practice questions', 'Review incorrect answers', '10 vocabulary words'] },
    { week: 2, title: 'Targeted Practice', focus: [...selectedWeaknesses].slice(2, 4).join(', ') || 'Mixed topics', dailyTasks: ['30 practice questions', 'Timed section drills', 'Strategy review'] },
    { week: 3, title: 'Full Test Simulation', focus: 'Mock tests + analysis', dailyTasks: ['Full mock test', 'Detailed error review', 'Weak area targeting'] },
    { week: 4, title: 'Final Polish', focus: 'Speed & accuracy', dailyTasks: ['Timed question banks', 'Final mock test', 'Rest and confidence building'] },
  ]

  return (
    <div className="max-w-2xl mx-auto py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🧠</div>
          <h1 className="font-sora font-black text-2xl text-slate-800 mb-2">AI Study Planner</h1>
          <p className="font-dm text-sm text-slate-400">
            Tell us your exam date and weaknesses — we'll build your entire daily plan.
          </p>
        </div>

        <div className="rounded-3xl p-7 mb-5"
          style={{
            background: 'rgba(255,255,255,0.58)',
            border: '1px solid rgba(255,255,255,0.72)',
            boxShadow: '0 8px 32px rgba(0,25,70,0.09)',
          }}
        >
          {/* Exam date */}
          <div className="mb-6">
            <label className="block font-sora text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">
              Exam Date
            </label>
            <input
              type="date"
              value={examDate || ''}
              onChange={e => setExamDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-2xl font-dm text-sm text-slate-800 outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.75)',
              }}
            />
          </div>

          {/* Weak areas */}
          <div className="mb-6">
            <label className="block font-sora text-xs font-bold text-slate-500 tracking-widest uppercase mb-3">
              Weak Areas (select all that apply)
            </label>
            <div className="flex flex-wrap gap-2">
              {weaknesses.map((w) => (
                <button
                  key={w}
                  onClick={() => toggleWeakness(w)}
                  className="px-3 py-2 rounded-full font-sora text-xs font-semibold transition-all"
                  style={selectedWeaknesses.has(w)
                    ? { background: 'rgba(1,43,170,0.08)', border: '1.5px solid #012BAA', color: '#012BAA' }
                    : { background: 'rgba(255,255,255,0.60)', border: '1.5px solid rgba(255,255,255,0.72)', color: '#6b7a99' }
                  }
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Daily time */}
          <div className="mb-7">
            <label className="block font-sora text-xs font-bold text-slate-500 tracking-widest uppercase mb-2">
              Daily Study Time
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['0.5', '1', '2', '3'].map((h) => (
                <button
                  key={h}
                  onClick={() => setDailyHours(h)}
                  className="py-2.5 rounded-2xl font-sora text-sm font-bold transition-all"
                  style={dailyHours === h
                    ? { background: '#012BAA', color: '#fff', boxShadow: '0 4px 12px rgba(1,43,170,0.30)' }
                    : { background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.72)', color: '#6b7a99' }
                  }
                >
                  {h === '0.5' ? '30 min' : h === '3' ? '3+ hrs' : `${h} hr${h === '1' ? '' : 's'}`}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ y: -2, boxShadow: '0 12px 36px rgba(1,43,170,0.50)' }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePlan}
            disabled={loading}
            className="w-full py-4 rounded-full font-sora font-bold text-white text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #012BAA, #2d52d4)', boxShadow: '0 6px 24px rgba(1,43,170,0.40)' }}
          >
            {loading ? '⟳ AI is building your plan...' : 'Generate My AI Plan ✦'}
          </motion.button>
        </div>

        {/* Plan output */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="rounded-2xl p-8 text-center"
              style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.72)' }}
            >
              <div className="text-2xl mb-3" style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
              <p className="font-sora text-sm text-slate-400 mb-2">AI is analyzing your goals...</p>
              <div className="flex flex-col gap-2 text-left max-w-xs mx-auto">
                {['Calculating optimal schedule', 'Prioritizing weak areas', 'Building daily task list', 'Finalizing your plan'].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 font-dm text-xs text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: i === 0 ? '#012BAA' : 'rgba(0,25,70,0.15)', animation: i === 0 ? 'pulse-dot 1s infinite' : 'none' }} />
                    {s}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {plan && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.58)', border: '1px solid rgba(255,255,255,0.72)' }}
            >
              <p className="font-sora font-bold text-slate-800 mb-5">✦ Your Personalized Study Plan</p>
              <div className="space-y-4">
                {plan.map((week, i) => (
                  <div key={i} className="flex gap-4 pb-4" style={{ borderBottom: i < plan.length - 1 ? '1px solid rgba(0,25,70,0.07)' : 'none' }}>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-sora font-black text-sm flex-shrink-0"
                      style={{ background: 'rgba(1,43,170,0.10)', color: '#012BAA' }}
                    >
                      {week.week}
                    </div>
                    <div className="flex-1">
                      <div className="font-sora text-sm font-bold text-slate-800 mb-1">{week.title}</div>
                      <div className="font-dm text-xs text-slate-400 mb-2">Focus: {week.focus}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {(week.dailyTasks || []).map((task, j) => (
                          <span key={j} className="font-dm text-xs px-2.5 py-1 rounded-full"
                            style={{ background: 'rgba(1,43,170,0.07)', color: '#012BAA' }}>
                            {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full mt-5 py-3.5 rounded-full font-sora font-bold text-white text-sm"
                style={{ background: '#012BAA', boxShadow: '0 4px 16px rgba(1,43,170,0.30)' }}
              >
                Save Plan & Start Today →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}