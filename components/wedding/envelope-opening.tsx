'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnvelopeOpeningProps {
  onComplete: () => void
}

export default function EnvelopeOpening({ onComplete }: EnvelopeOpeningProps) {
  const [stage, setStage] = useState<'closed' | 'opening' | 'letter-rising' | 'letter-fullscreen' | 'done'>('closed')

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('opening'), 1200)
    const timer2 = setTimeout(() => setStage('letter-rising'), 2200)
    const timer3 = setTimeout(() => setStage('letter-fullscreen'), 3200)
    const timer4 = setTimeout(() => setStage('done'), 4500)
    const timer5 = setTimeout(() => onComplete(), 5000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
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
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[#C9A85C]"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                  y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                  opacity: 0,
                  scale: 0 
                }}
                animate={{ 
                  y: [null, Math.random() * -200 - 100],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'easeOut'
                }}
              />
            ))}
          </div>

          {/* Main envelope container */}
          <motion.div 
            className="relative"
            animate={stage === 'letter-fullscreen' ? { 
              scale: 0,
              opacity: 0
            } : {}}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Envelope wrapper with 3D perspective */}
            <div 
              className="relative w-[85vw] max-w-[420px] aspect-[1.4/1]"
              style={{ perspective: '1200px' }}
            >
              {/* Envelope body - back layer */}
              <div 
                className="absolute inset-0 rounded-lg shadow-2xl"
                style={{ 
                  backgroundColor: '#5A1E2D',
                  boxShadow: '0 25px 50px -12px rgba(43, 27, 24, 0.5), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                {/* Decorative gold border */}
                <div className="absolute inset-3 rounded-md border border-[#C9A85C]/20" />
                <div className="absolute inset-5 rounded border border-[#C9A85C]/10" />
                
                {/* Corner ornaments */}
                {['top-4 left-4', 'top-4 right-4 rotate-90', 'bottom-4 left-4 -rotate-90', 'bottom-4 right-4 rotate-180'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-8 h-8 opacity-30`}>
                    <svg viewBox="0 0 32 32" fill="none">
                      <path d="M0 0 C8 0 16 8 16 16 C16 8 24 0 32 0" stroke="#C9A85C" strokeWidth="1"/>
                      <path d="M0 0 C0 8 8 16 16 16 C8 16 0 24 0 32" stroke="#C9A85C" strokeWidth="1"/>
                    </svg>
                  </div>
                ))}
              </div>

              {/* Letter/Card inside - rises up and expands */}
              <motion.div
                initial={{ y: 0, scale: 1 }}
                animate={
                  stage === 'letter-rising' || stage === 'letter-fullscreen'
                    ? { y: -80, scale: 1 }
                    : { y: 0, scale: 1 }
                }
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="absolute inset-6 rounded-md flex flex-col items-center justify-center overflow-hidden"
                style={{ 
                  backgroundColor: '#FAF8F3',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
                }} />
                
                {/* Elegant inner border */}
                <div className="absolute inset-3 border border-[#5A1E2D]/10 rounded" />
                <div className="absolute inset-5 border border-[#5A1E2D]/5 rounded" />

                {/* Decorative lace pattern top */}
                <div className="absolute top-0 left-0 right-0 h-6 opacity-20">
                  <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0 24 Q25 0 50 24 Q75 0 100 24 Q125 0 150 24 Q175 0 200 24 Q225 0 250 24 Q275 0 300 24 Q325 0 350 24 Q375 0 400 24" 
                          fill="none" stroke="#5A1E2D" strokeWidth="1"/>
                  </svg>
                </div>

                {/* Letter content */}
                <div className="text-center px-6 relative z-10">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage === 'letter-rising' || stage === 'letter-fullscreen' ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[#5A1E2D]/50 text-[9px] sm:text-[10px] tracking-[0.5em] uppercase mb-3 font-sans"
                  >
                    Wedding Invitation
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: stage === 'letter-rising' || stage === 'letter-fullscreen' ? 1 : 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl sm:text-4xl md:text-5xl text-[#5A1E2D]"
                    style={{ fontFamily: 'var(--font-script)' }}
                  >
                    Damir & Anel
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: stage === 'letter-rising' || stage === 'letter-fullscreen' ? 1 : 0, scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex items-center justify-center gap-4 mt-4"
                  >
                    <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[#5A1E2D]/30" />
                    <div className="w-2 h-2 rotate-45 border border-[#5A1E2D]/30" />
                    <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-[#5A1E2D]/30" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: stage === 'letter-rising' || stage === 'letter-fullscreen' ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-[#5A1E2D]/40 text-[10px] sm:text-xs tracking-[0.3em] uppercase mt-4 font-sans"
                  >
                    08.08.2026
                  </motion.p>
                </div>

                {/* Decorative lace pattern bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-6 opacity-20 rotate-180">
                  <svg viewBox="0 0 400 24" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0 24 Q25 0 50 24 Q75 0 100 24 Q125 0 150 24 Q175 0 200 24 Q225 0 250 24 Q275 0 300 24 Q325 0 350 24 Q375 0 400 24" 
                          fill="none" stroke="#5A1E2D" strokeWidth="1"/>
                  </svg>
                </div>
              </motion.div>

              {/* Envelope flap (top triangle) - opens upward */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={
                  stage === 'opening' || stage === 'letter-rising' || stage === 'letter-fullscreen'
                    ? { rotateX: -180 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                style={{ 
                  transformOrigin: 'top center',
                  transformStyle: 'preserve-3d',
                }}
                className="absolute -top-[1px] left-0 right-0 z-20"
              >
                {/* Front of flap (burgundy) */}
                <svg 
                  viewBox="0 0 420 130" 
                  className="w-full"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <defs>
                    <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6B2438" />
                      <stop offset="100%" stopColor="#5A1E2D" />
                    </linearGradient>
                  </defs>
                  <path 
                    d="M0 0 L210 130 L420 0 Z" 
                    fill="url(#flapGradient)"
                  />
                  {/* Decorative lines on flap */}
                  <path 
                    d="M15 5 L210 120 L405 5" 
                    fill="none"
                    stroke="rgba(201, 168, 92, 0.15)"
                    strokeWidth="1"
                  />
                  <path 
                    d="M30 10 L210 110 L390 10" 
                    fill="none"
                    stroke="rgba(201, 168, 92, 0.1)"
                    strokeWidth="1"
                  />
                </svg>
                
                {/* Back of flap (ivory) */}
                <svg 
                  viewBox="0 0 420 130" 
                  className="w-full absolute top-0 left-0"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateX(180deg)',
                  }}
                >
                  <path 
                    d="M0 0 L210 130 L420 0 Z" 
                    fill="#EDE9E0"
                  />
                  <path 
                    d="M25 10 L210 115 L395 10" 
                    fill="none"
                    stroke="rgba(90, 30, 45, 0.08)"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>

              {/* Envelope front bottom triangles */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-[55%] z-10"
                style={{ overflow: 'hidden' }}
              >
                <svg viewBox="0 0 420 145" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bottomGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#4A1825" />
                      <stop offset="100%" stopColor="#5A1E2D" />
                    </linearGradient>
                  </defs>
                  {/* Left triangle */}
                  <path d="M0 145 L0 0 L210 110 Z" fill="url(#bottomGradient)" />
                  {/* Right triangle */}
                  <path d="M420 145 L420 0 L210 110 Z" fill="url(#bottomGradient)" />
                  {/* Fold line */}
                  <path 
                    d="M0 0 L210 110 L420 0" 
                    fill="none"
                    stroke="rgba(201, 168, 92, 0.1)"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              {/* Elegant wax seal */}
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={
                  stage === 'opening' || stage === 'letter-rising' || stage === 'letter-fullscreen'
                    ? { scale: 0, opacity: 0, rotate: 180 }
                    : { scale: 1, opacity: 1, rotate: 0 }
                }
                transition={{ duration: 0.4 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <div 
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative"
                  style={{
                    background: 'radial-gradient(ellipse at 30% 30%, #9B3A52, #6B2438 50%, #4A1825)',
                    boxShadow: '0 8px 25px rgba(43, 27, 24, 0.5), inset 0 -2px 10px rgba(0,0,0,0.3), inset 0 2px 10px rgba(255,255,255,0.1)',
                  }}
                >
                  {/* Seal texture ring */}
                  <div className="absolute inset-2 rounded-full border border-[#F5F1E8]/10" />
                  <div className="absolute inset-3 rounded-full border border-[#F5F1E8]/5" />
                  
                  {/* Monogram */}
                  <span 
                    className="text-[#F5F1E8] text-xl sm:text-2xl relative z-10"
                    style={{ 
                      fontFamily: 'var(--font-script)',
                      textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                    }}
                  >
                    D&A
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Fullscreen letter expansion */}
          <AnimatePresence>
            {stage === 'letter-fullscreen' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
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
                    Wedding Invitation
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

          {/* Tap to open hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === 'closed' ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.p 
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-[#5A1E2D]/50 text-[10px] tracking-[0.3em] uppercase font-sans"
            >
              Opening your invitation...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
