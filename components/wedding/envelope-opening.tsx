'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnvelopeOpeningProps {
  onComplete: () => void
}

interface Particle {
  id: number
  x: number
  y: number
  targetY: number
  duration: number
  delay: number
}

export default function EnvelopeOpening({ onComplete }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<'letter-fullscreen' | 'done'>('letter-fullscreen')
  const [particles, setParticles] = useState<Particle[]>([])
  const timersRef = useRef<NodeJS.Timeout[]>([])

  useEffect(() => {
    // Генерируем частицы только на клиенте, чтобы избежать Hydration Mismatch
    const generatedParticles = [...Array(20)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      targetY: Math.random() * -200 - 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 3,
    }))
    setParticles(generatedParticles)
  }, [])

  useEffect(() => {
    // Устанавливаем задержку перед тем, как экран приветствия исчезнет
    // 3000мс (6 секунд) — это время, пока имена будут на экране
    const mainTimer = setTimeout(() => {
      setStage('done')
      // Вызываем onComplete чуть позже, чтобы анимация выхода (opacity) успела отработать
      setTimeout(() => onComplete(), 1000)
    }, 3000)

    return () => {
      clearTimeout(mainTimer)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#F5F1E8' }}
        >
          {/* Elegant damask pattern background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%235A1E2D' fill-opacity='1'%3E%3Cpath d='M20 0c5.523 0 10 4.477 10 10 0 2.757-1.119 5.257-2.929 7.071L20 24.142l-7.071-7.07C11.119 15.256 10 12.756 10 10 10 4.477 14.477 0 20 0zm0 5c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zM0 20c0 5.523 4.477 10 10 10 2.757 0 5.257-1.119 7.071-2.929L24.142 20l-7.07-7.071C15.256 11.119 12.756 10 10 10 4.477 10 0 14.477 0 20zm5 0c0-2.761 2.239-5 5-5s5 2.239 5 5-2.239 5-5 5-5-2.239-5-5zm35 0c0 5.523-4.477 10-10 10-2.757 0-5.257-1.119-7.071-2.929L15.858 20l7.07-7.071C24.744 11.119 27.244 10 30 10c5.523 0 10 4.477 10 10zm-5 0c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5zM20 40c-5.523 0-10-4.477-10-10 0-2.757 1.119-5.257 2.929-7.071L20 15.858l7.071 7.07C28.881 24.744 30 27.244 30 30c0 5.523-4.477 10-10 10zm0-5c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Gold sparkle particles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute w-1 h-1 rounded-full bg-[#C9A85C]"
                initial={{ 
                  x: p.x,
                  y: p.y,
                  opacity: 0,
                  scale: 0 
                }}
                animate={{ 
                  y: [null, p.targetY],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Fullscreen letter expansion */}
          <AnimatePresence>
            {stage === 'letter-fullscreen' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: '#FAF8F3' }}
              >
                {/* Paper texture */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise2)' opacity='0.08'/%3E%3C/svg%3E")`,
                }} />

                {/* Content */}
                <div className="text-center px-8 relative z-10">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-[#5A1E2D]/50 text-xs tracking-[0.5em] uppercase mb-4 font-sans"
                  >
                    Wedding day
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-5xl sm:text-6xl md:text-7xl text-[#5A1E2D]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Damir & Anel
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center justify-center gap-4 mt-6"
                  >
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#5A1E2D]/30" />
                    <div className="w-2 h-2 rotate-45 border border-[#5A1E2D]/30" />
                    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#5A1E2D]/30" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
