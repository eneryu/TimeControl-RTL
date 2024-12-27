'use client'

import React from 'react'
import { IconBrain, IconCoffee, IconZzz } from '@tabler/icons-react'

interface TimerControlsProps {
  selectedMode: 'focus' | 'shortBreak' | 'longBreak'
  onModeChange: (mode: 'focus' | 'shortBreak' | 'longBreak') => void
}

const modes = [
  {
    id: 'focus',
    label: 'تركيز',
    icon: IconBrain,
    duration: 25,
    color: 'text-primary'
  },
  {
    id: 'shortBreak',
    label: 'استراحة قصيرة',
    icon: IconCoffee,
    duration: 5,
    color: 'text-green-500'
  },
  {
    id: 'longBreak',
    label: 'استراحة طويلة',
    icon: IconZzz,
    duration: 15,
    color: 'text-blue-500'
  }
] as const

export function TimerControls({ selectedMode, onModeChange }: TimerControlsProps) {
  return (
    <div className="flex gap-4">
      {modes.map((mode) => {
        const Icon = mode.icon
        const isSelected = selectedMode === mode.id
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all hover:scale-105 ${
              isSelected
                ? `bg-dark-card ${mode.color} ring-2 ring-current shadow-lg shadow-current/20`
                : 'text-gray-400 hover:text-white hover:bg-dark-card/50 ring-1 ring-white/10'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{mode.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export { modes } 