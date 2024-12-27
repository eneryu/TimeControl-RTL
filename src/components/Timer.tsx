'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { IconPlayerPlay, IconPlayerPause, IconRotate } from '@tabler/icons-react'

interface TimerProps {
  duration: number
  onComplete: () => void
}

export function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            onComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, onComplete])

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(duration * 60)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="relative w-80 h-80">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r="45%"
          className="stroke-dark-card"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.circle
          cx="50%"
          cy="50%"
          r="45%"
          className="stroke-primary"
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress / 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold mb-6 font-mono">{formatTime(timeLeft)}</div>
        <div className="flex gap-6">
          <button
            onClick={toggleTimer}
            className="p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary ring-1 ring-primary/20 transition-all hover:scale-110"
          >
            {isRunning ? (
              <IconPlayerPause className="w-8 h-8" />
            ) : (
              <IconPlayerPlay className="w-8 h-8" />
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-4 rounded-full bg-dark-card hover:bg-dark-card/80 ring-1 ring-white/10 transition-all hover:scale-110"
          >
            <IconRotate className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  )
} 