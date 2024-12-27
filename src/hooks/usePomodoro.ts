'use client'

import { useState, useEffect } from 'react'

interface PomodoroStats {
  totalSessions: number
  totalFocusTime: number
  dailyGoal: number
  streak: number
  lastActiveDate: string | null
}

const defaultStats: PomodoroStats = {
  totalSessions: 0,
  totalFocusTime: 0,
  dailyGoal: 120,
  streak: 0,
  lastActiveDate: null
}

export function usePomodoro() {
  const [stats, setStats] = useState<PomodoroStats>(() => {
    if (typeof window !== 'undefined') {
      const savedStats = localStorage.getItem('pomodoroStats')
      if (savedStats) {
        const parsed = JSON.parse(savedStats)
        const today = new Date().toDateString()
        if (parsed.lastActiveDate) {
          const lastActive = new Date(parsed.lastActiveDate)
          const daysDiff = Math.floor((new Date().getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24))
          
          if (daysDiff > 1) {
            return { ...defaultStats, lastActiveDate: today }
          } else if (daysDiff === 1) {
            return {
              ...parsed,
              totalSessions: 0,
              totalFocusTime: 0,
              streak: parsed.streak + 1,
              lastActiveDate: today
            }
          }
        }
        return parsed
      }
    }
    return { ...defaultStats, lastActiveDate: new Date().toDateString() }
  })

  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify(stats))
  }, [stats])

  const updateStats = (focusMinutes: number) => {
    setStats(prev => ({
      ...prev,
      totalSessions: prev.totalSessions + 1,
      totalFocusTime: prev.totalFocusTime + focusMinutes
    }))
  }

  const resetDailyStats = () => {
    setStats(prev => ({
      ...prev,
      totalSessions: 0,
      totalFocusTime: 0,
      lastActiveDate: new Date().toDateString()
    }))
  }

  const setDailyGoal = (minutes: number) => {
    setStats(prev => ({
      ...prev,
      dailyGoal: minutes
    }))
  }

  return {
    stats,
    updateStats,
    resetDailyStats,
    setDailyGoal
  }
} 