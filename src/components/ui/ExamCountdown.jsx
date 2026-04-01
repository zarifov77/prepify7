import { useState, useEffect } from 'react'
import useExamStore from '../../store/examStore'

export default function ExamCountdown() {
  const { exam, examDate } = useExamStore()
  const [time, setTime] = useState({ days: 34, hrs: 15, min: 42 })

  useEffect(() => {
    const target = examDate ? new Date(examDate) : new Date('2025-05-03')

    const update = () => {
      const diff = target - new Date()
      if (diff > 0) {
        setTime({
          days: Math.floor(diff / 86400000),
          hrs: Math.floor((diff % 86400000) / 3600000),
          min: Math.floor((diff % 3600000) / 60000),
        })
      }
    }

    update()
    const interval = setInterval(update, 30000)
    return () => clearInterval(interval)
  }, [examDate])

  return (
    <div
      className="mx-4 mb-4 rounded-2xl p-4"
      style={{
        background: 'linear-gradient(135deg, #001946, #0a2a5e)',
        boxShadow: '0 8px 24px rgba(0,25,70,0.30)',
      }}
    >
      <div
        className="text-xs font-sora font-bold tracking-widest uppercase mb-2"
        style={{ color: 'rgba(255,255,255,0.55)' }}
      >
        Next {exam === 'sat' ? 'SAT' : 'IELTS'}
      </div>
      <div className="flex items-end gap-1">
        {[
          { val: time.days, label: 'days' },
          { val: time.hrs, label: 'hrs' },
          { val: time.min, label: 'min' },
        ].map((seg, i) => (
          <div key={i} className="flex items-end gap-1">
            {i > 0 && (
              <span
                className="font-sora font-black text-xl mb-1"
                style={{ color: 'rgba(1,43,170,0.8)' }}
              >:
              </span>
            )}
            <div className="text-center">
              <div className="font-sora font-black text-2xl text-white leading-none">
                {String(seg.val).padStart(2, '0')}
              </div>
              <div className="font-dm text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {seg.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}