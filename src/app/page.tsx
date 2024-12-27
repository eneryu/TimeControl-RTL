'use client'

import React from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { usePomodoro } from '@/hooks/usePomodoro'
import { modes } from '@/components/TimerControls'

const Timer = dynamic(() => import('@/components/Timer').then(mod => mod.Timer), { ssr: false })
const TimerControls = dynamic(() => import('@/components/TimerControls').then(mod => mod.TimerControls), { ssr: false })
const Stats = dynamic(() => import('@/components/Stats').then(mod => mod.Stats), { ssr: false })

export default function Home() {
  const [selectedMode, setSelectedMode] = React.useState<'focus' | 'shortBreak' | 'longBreak'>('focus')
  const { stats, updateStats } = usePomodoro()

  React.useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission()
    }
  }, [])

  const handleTimerComplete = () => {
    if (selectedMode === 'focus') {
      updateStats(25)
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('انتهى وقت التركيز!', {
          body: 'حان وقت الاستراحة',
          icon: '/images/logo.svg'
        })
      }
    }
  }

  const currentMode = modes.find(mode => mode.id === selectedMode)!

  return (
    <main className="min-h-screen bg-dark text-light">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Image src="/images/logo.svg" alt="Logo" width={40} height={40} className="animate-bounce-slow" />
            <h1 className="text-3xl font-bold gradient-text">تحكم الوقت</h1>
          </div>
          <Stats
            totalSessions={stats.totalSessions}
            totalFocusTime={stats.totalFocusTime}
            dailyGoal={stats.dailyGoal}
            streak={stats.streak}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 mt-16">
          <TimerControls
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
          />

          <Timer
            duration={currentMode.duration}
            onComplete={handleTimerComplete}
          />

          <div className="text-center">
            <h2 className={`text-2xl font-bold ${currentMode.color}`}>
              {currentMode.label}
            </h2>
            <p className="text-gray-400 mt-2">
              {selectedMode === 'focus'
                ? 'ركز على مهمة واحدة فقط'
                : 'خذ استراحة واسترخِ'}
            </p>
          </div>
        </div>

        <footer className="fixed bottom-4 left-4">
          <a
            href="https://github.com/eneryu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-400"
          >
            Developed by Jack
          </a>
        </footer>
      </div>
    </main>
  )
}
