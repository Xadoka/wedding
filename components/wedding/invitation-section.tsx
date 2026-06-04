'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function InvitationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#F5F1E8]">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none" />
      
      {/* Decorative background pattern */}
      <div className="absolute inset-0 lace-border opacity-30" />

      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          {/* Invitation card */}
          <div className="relative">
            {/* Lace border frame */}
            <div className="absolute -inset-4 md:-inset-8 border border-[#5A1E2D]/20 rounded-sm" />
            <div className="absolute -inset-2 md:-inset-4 border border-[#5A1E2D]/10 rounded-sm" />
            
            {/* Corner ornaments */}
            <svg className="absolute -top-6 -left-6 w-12 h-12 text-[#5A1E2D]/30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" />
            </svg>
            <svg className="absolute -top-6 -right-6 w-12 h-12 text-[#5A1E2D]/30 rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" />
            </svg>
            <svg className="absolute -bottom-6 -left-6 w-12 h-12 text-[#5A1E2D]/30 -rotate-90" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" />
            </svg>
            <svg className="absolute -bottom-6 -right-6 w-12 h-12 text-[#5A1E2D]/30 rotate-180" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 12 12 2 12C12 12 12 22 12 22C12 22 12 12 22 12C12 12 12 2 12 2Z" />
            </svg>

            <div className="bg-[#FAF8F3] p-8 md:p-16 text-center shadow-xl">
              {/* Header ornament */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-8"
              >
                <p className="text-[#5A1E2D]/60 text-xs tracking-[0.4em] uppercase font-sans mb-4">
                  Приглашение
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#5A1E2D]/30" />
                  <div className="text-[#5A1E2D]/40 text-2xl">&#10022;</div>
                  <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#5A1E2D]/30" />
                </div>
              </motion.div>

              {/* Main text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl text-[#2B1B18] mb-8 font-sans font-medium">
                  Дорогие гости!
                </h2>
                
                <p className="text-[#2B1B18]/80 text-base md:text-lg leading-relaxed mb-6 font-sans font-light">
                  Мы будем счастливы разделить с вами самый важный день нашей жизни.
                </p>
                
                <p className="text-[#2B1B18]/80 text-base md:text-lg leading-relaxed font-sans font-light">
                  С огромной радостью приглашаем вас стать частью нашего особенного дня 
                  и разделить вместе с нами моменты любви, счастья и тепла.
                </p>
              </motion.div>

              {/* Decorative divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="my-10"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="w-24 h-[1px] bg-[#5A1E2D]/20" />
                  <div className="w-2 h-2 rotate-45 bg-[#5A1E2D]/30" />
                  <div className="w-24 h-[1px] bg-[#5A1E2D]/20" />
                </div>
              </motion.div>

              {/* Names signature */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="inline-block"
              >
                <p className="text-2xl md:text-3xl text-[#5A1E2D]"
                   style={{ fontFamily: 'var(--font-script)' }}>
                  Damir & Anel
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
