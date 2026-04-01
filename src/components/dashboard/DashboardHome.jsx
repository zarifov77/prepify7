import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../ui/GlassCard'
import useProgressStore from '../../store/progressStore'
import useAuthStore from '../../store/authStore'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today']
const TAG_COLORS = {
  Math:    { bg: 'rgba(52,152,219,0.12)',  color: '#2980b9' },
  Reading: { bg: 'rgba(155,89,182,0.12)', color: '#8e44ad' },
  Words:   { bg: 'rgba(39,174,96,0.12)',  color: '#27ae60' },
}

export default function DashboardHome() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const {
    questionsTotal, questionsToday, streak, xp,
    accuracy, studyTimeMinutes, weeklyData,
    dreamScore, currentScore, topicBreakdown,
    achievements, todayTasks,
  } = useProgressStore()

  const hrs = Math.floor(studyTimeMinutes / 60)
  const displayName = user?.user_metadata?.full_name?.split(' ')[0] || 'Student'

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  })

  return (
    <div className="max-w-6xl mx-auto">

      {/* Announcement banner */}
      <motion.div {...fadeUp(0)}
        className="flex items-center justify-between px-4 py-3 rounded-2xl mb-5 text-sm font-dm"
        style={{
          background: 'rgba(1,43,170,0.06)',
          border: '1px solid rgba(1,43,170,0.15)',
        }}
      >
        <span className="text-slate-600">
          📣 <strong className="font-sora" style={{ color: '#012BAA' }}>Question Rush</strong> mode is now live — try it today!
        </span>
        <button
          onClick={() => navigate('/dashboard/question-rush')}
          className="font-sora text-xs font-bold px-3 py-1.5 rounded-full text-white ml-3"
          style={{ background: '#012BAA' }}
        >
          Try it →
        </button>
      </motion.div>

      {/* Jump back in */}
      <motion.div {...fadeUp(0.05)} className="mb-5">
        <p className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
          Jump Back In
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Question Bank', sub: 'Continue practicing', icon: '📚', path: '/dashboard/question-bank', color: 'rgba(52,152,219,0.12)' },
            { label: 'Practice Tests', sub: 'Full mock exams', icon: '📝', path: '/dashboard/mocks', color: 'rgba(155,89,182,0.12)' },
            { label: 'My Stats', sub: 'View detailed progress', icon: '📊', path: '/dashboard', color: 'rgba(1,43,170,0.10)' },
          ].map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -3, boxShadow: '0 10px 30px rgba(0,25,70,0.12)' }}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all"
              style={{
                background: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.72)',
              }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: item.color }}>
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-sora text-sm font-bold text-slate-800">{item.label}</div>
                <div className="font-dm text-xs text-slate-400">{item.sub}</div>
              </div>
              <span className="text-slate-300">→</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-3 gap-4 mb-4">

        {/* Progress card — spans 2 cols */}
        <motion.div {...fadeUp(0.1)} className="col-span-2">
          <GlassCard className="p-5 h-full" hover={false}>
            <p className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
              Dream Score
            </p>
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-sora font-black text-4xl" style={{ color: '#012BAA' }}>
                {dreamScore.toLocaleString()}
              </span>
              <span className="font-dm text-sm text-slate-400">
                Current: {currentScore.toLocaleString()} · +{dreamScore - currentScore} to go
              </span>
            </div>

            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,25,70,0.08)' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.round(currentScore / dreamScore * 100)}%` }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #012BAA, #2d52d4)' }}
                />
              </div>
              <span className="font-sora text-xs font-bold" style={{ color: '#012BAA' }}>
                {Math.round(currentScore / dreamScore * 100)}%
              </span>
            </div>

            {/* Weekly bars */}
            <p className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
              Questions this week
            </p>
            <div className="flex items-end gap-2 mb-5">
              {weeklyData.map((count, i) => (
                <div key={i} className="flex flex-col items-center gap-1 flex-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: Math.round(count * 1.2) }}
                    transition={{ duration: 0.7, delay: 0.1 * i }}
                    className="w-full rounded-t-lg"
                    style={{
                      background: i === 6 ? '#012BAA' : 'rgba(1,43,170,0.15)',
                      minHeight: 4,
                    }}
                  />
                  <span className="font-dm text-[10px] text-slate-400">{DAYS[i]}</span>
                </div>
              ))}
            </div>

            {/* Topic breakdown */}
            <div className="space-y-2.5">
              {topicBreakdown.map((t) => (
                <div key={t.name} className="flex items-center gap-3">
                  <span className="font-dm text-xs text-slate-500 w-36 flex-shrink-0">{t.name}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,25,70,0.08)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${t.pct}%` }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="h-full rounded-full"
                      style={{ background: t.color }}
                    />
                  </div>
                  <span className="font-sora text-xs font-bold text-slate-700 w-9 text-right">{t.pct}%</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats column */}
        <div className="flex flex-col gap-3">
          {[
            { label: 'Questions Solved', val: questionsTotal.toLocaleString(), delta: `+${questionsToday} today`, positive: true },
            { label: 'Accuracy This Week', val: `${accuracy}%`, delta: '+4% this week', positive: true },
            { label: 'Study Streak', val: `${streak} 🔥`, delta: 'Keep it up!', positive: true },
            { label: 'Study Time', val: `${hrs}h`, delta: '+2.5h this week', positive: true },
          ].map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp(0.1 + i * 0.05)}>
              <GlassCard className="p-4" hover={false}>
                <p className="font-sora text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-1">
                  {stat.label}
                </p>
                <p className="font-sora font-black text-2xl text-slate-800 leading-none mb-1">
                  {stat.val}
                </p>
                <p className="font-dm text-xs" style={{ color: '#27ae60' }}>{stat.delta}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements + Today's Tasks */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div {...fadeUp(0.3)}>
          <GlassCard className="p-5" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase">
                Achievements
              </p>
              <span className="font-sora text-xs font-bold" style={{ color: '#012BAA' }}>
                {achievements.filter(a => a.done).length}/{achievements.length}
              </span>
            </div>
            <div className="space-y-3">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs"
                    style={{
                      background: a.done ? 'rgba(39,174,96,0.15)' : 'rgba(0,25,70,0.08)',
                      color: a.done ? '#27ae60' : '#9ca3af',
                    }}
                  >
                    {a.done ? '✓' : '○'}
                  </div>
                  <span className="font-dm text-sm text-slate-600 flex-1">{a.label}</span>
                  {a.progress && (
                    <span className="font-dm text-xs text-slate-400">{a.progress}</span>
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <motion.div {...fadeUp(0.35)}>
          <GlassCard className="p-5" hover={false}>
            <div className="flex items-center justify-between mb-4">
              <p className="font-sora text-xs font-bold text-slate-400 tracking-widest uppercase">
                Today's Tasks
              </p>
              <span className="font-sora text-xs font-bold" style={{ color: '#012BAA' }}>
                0/{todayTasks.length} done
              </span>
            </div>
            <div className="space-y-3">
              {todayTasks.map((task, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl"
                  style={{ background: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,255,255,0.70)' }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-sora text-sm font-bold text-slate-800">{task.name}</span>
                    <span
                      className="font-sora text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={TAG_COLORS[task.tag] || TAG_COLORS.Math}
                    >
                      {task.tag}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-dm text-xs text-slate-400">
                      {task.time} · {task.questions} questions
                    </span>
                    <button
                      onClick={() => navigate('/dashboard/question-bank')}
                      className="font-sora text-xs font-bold text-white px-3 py-1.5 rounded-full transition-all hover:-translate-y-0.5"
                      style={{ background: '#012BAA', boxShadow: '0 3px 10px rgba(1,43,170,0.30)' }}
                    >
                      Start →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}