export default function TimerCircle({ timeLeft, progress, size = 100 }) {
  const r = (size / 2) - 10
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - progress)

  const color =
    progress > 0.5 ? '#012BAA' :
    progress > 0.25 ? '#f39c12' : '#e74c3c'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="rgba(0,25,70,0.08)"
          strokeWidth="8"
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.1s linear, stroke 0.3s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-sora font-black text-2xl leading-none" style={{ color }}>
          {timeLeft}
        </span>
        <span className="font-dm text-[10px] text-slate-400 mt-0.5">seconds</span>
      </div>
    </div>
  )
}