'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock } from 'lucide-react'

const schedule = [
  { time: '15:00', event: 'Сбор гостей', description: 'Добро пожаловать' },
  { time: '16:00', event: 'Начало торжества', description: 'Церемония' },
  { time: '17:00', event: 'Банкет', description: 'Праздничный ужин' },
]

export default function ScheduleSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#F5F1E8]">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-3xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <p className="text-[#5A1E2D]/50 text-xs tracking-[0.4em] uppercase mb-4 font-sans">
              Расписание дня
            </p>
            <h2 className="text-4xl md:text-6xl text-[#5A1E2D] mb-4"
                style={{ fontFamily: 'var(--font-script)' }}>
              Schedule
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#5A1E2D]/30" />
              <Clock className="w-5 h-5 text-[#5A1E2D]/40" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#5A1E2D]/30" />
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#5A1E2D]/10 via-[#5A1E2D]/30 to-[#5A1E2D]/10 md:-translate-x-1/2" />

            {schedule.map((item, index) => (
              <motion.div
                key={item.time}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className={`relative flex items-center gap-6 md:gap-12 mb-12 last:mb-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[28px] md:left-1/2 w-3 h-3 md:-translate-x-1/2 z-10">
                  <div className="w-full h-full bg-[#5A1E2D] rounded-full" />
                  <div className="absolute inset-0 bg-[#5A1E2D]/30 rounded-full animate-ping" />
                </div>

                {/* Content */}
                <div className={`flex-1 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                  <div className={`glass p-6 md:p-8 rounded-xl inline-block ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                    <p className="text-2xl md:text-3xl text-[#5A1E2D] mb-2"
                       style={{ fontFamily: 'var(--font-playfair)' }}>
                      {item.time}
                    </p>
                    <h3 className="text-lg md:text-xl text-[#2B1B18] font-medium mb-1 font-sans">
                      {item.event}
                    </h3>
                    <p className="text-[#2B1B18]/60 text-sm font-sans">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
