import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(duration, onExpire) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const intervalRef = useRef(null)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  const start = useCallback(() => {
    clearInterval(intervalRef.current)
    setTimeLeft(duration)
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          onExpireRef.current()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [duration])

  const stop = useCallback(() => clearInterval(intervalRef.current), [])

  const reset = useCallback(() => {
    stop()
    setTimeLeft(duration)
  }, [stop, duration])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return {
    timeLeft,
    start,
    stop,
    reset,
    progress: timeLeft / duration, // 1.0 → 0.0
  }
}