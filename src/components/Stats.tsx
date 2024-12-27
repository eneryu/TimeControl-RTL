'use client'

import React from 'react'
import { IconClock, IconTarget, IconTrophy } from '@tabler/icons-react'

interface StatsProps {
  totalSessions: number
  totalFocusTime: number
  dailyGoal: number
  streak: number
}

export function Stats({ totalSessions, totalFocusTime, dailyGoal, streak }: StatsProps) {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}س ${mins}د` : `${mins}د`
  }

  const progress = Math.min((totalFocusTime / dailyGoal) * 100, 100)

  return (
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-3 bg-dark-card/50 px-4 py-2 rounded-lg ring-1 ring-white/10">
        <IconClock className="w-5 h-5 text-primary" />
        <div>
          <div className="text-sm text-gray-400">وقت التركيز</div>
          <div className="font-bold">{formatTime(totalFocusTime)}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-dark-card/50 px-4 py-2 rounded-lg ring-1 ring-white/10">
        <IconTarget className="w-5 h-5 text-green-500" />
        <div>
          <div className="text-sm text-gray-400">الجلسات</div>
          <div className="font-bold">{totalSessions} / {Math.ceil(dailyGoal / 25)}</div>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-dark-card/50 px-4 py-2 rounded-lg ring-1 ring-white/10">
        <IconTrophy className="w-5 h-5 text-yellow-500" />
        <div>
          <div className="text-sm text-gray-400">التتابع</div>
          <div className="font-bold">{streak} يوم</div>
        </div>
      </div>
    </div>
  )
} 