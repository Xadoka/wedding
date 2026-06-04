'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart } from 'lucide-react'

const WEDDING_DATE = new Date('2026-08-08T16:00:00')

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const difference = WEDDING_DATE.getTime() - new Date().getTime()
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function CalendarWidget() {
  // August 2026 calendar
  const year = 2026
  const month = 7 // August (0-indexed)
  const weddingDay = 8
  
  // Get first day of month (0 = Sunday, adjust for Monday start)
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const startDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
  
  // Get number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  // Create calendar grid
  const calendarDays = []
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }
  
  return (
    <div className="bg-[#FAF8F3] rounded-xl p-6 md:p-8 shadow-xl border border-[#5A1E2D]/10">
      {/* Month header */}
      <div className="text-center mb-6">
        <p className="text-[#5A1E2D]/60 text-xs tracking-[0.3em] uppercase font-sans mb-1">
          {year}
        </p>
        <h3 className="text-2xl md:text-3xl text-[#5A1E2D]"
            style={{ fontFamily: 'var(--font-playfair)' }}>
          {months[month]}
        </h3>
      </div>
      
      {/* Week days header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-[#5A1E2D]/50 text-xs font-sans py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            className={`aspect-square flex items-center justify-center text-sm font-sans relative
              ${day === weddingDay ? 'text-[#F5F1E8]' : 'text-[#2B1B18]/70'}
              ${day ? 'hover:bg-[#5A1E2D]/5 rounded-full transition-colors' : ''}
            `}
          >
            {day === weddingDay ? (
              <div className="absolute inset-0.5 flex items-center justify-center">
                {/* Heart shape with number inside */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Heart className="absolute w-8 h-8 text-[#5A1E2D] fill-[#5A1E2D]" />
                  <span className="relative z-10 text-[#F5F1E8] text-sm font-semibold">
                    {day}
                  </span>
                </div>
              </div>
            ) : (
              day
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DateSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft())
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-[#2B1B18]/80" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-[#F5F1E8]/50 text-xs tracking-[0.4em] uppercase mb-4 font-sans">
              Дата торжества
            </p>
            <h2 className="text-5xl md:text-7xl text-[#F5F1E8] mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}>
              08.08.2026
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5F1E8]/30" />
              <Heart className="w-5 h-5 text-[#F5F1E8]/40" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5F1E8]/30" />
            </div>
          </motion.div>

          {/* Calendar and countdown layout */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <CalendarWidget />
            </motion.div>

            {/* Time and Countdown */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              {/* Time */}
              <div className="glass-dark rounded-xl p-6 mb-6">
                <p className="text-[#F5F1E8]/50 text-xs tracking-[0.3em] uppercase mb-2 font-sans">
                  Начало торжества
                </p>
                <p className="text-4xl md:text-5xl text-[#F5F1E8]"
                   style={{ fontFamily: 'var(--font-playfair)' }}>
                  16:00
                </p>
              </div>

              {/* Countdown Timer */}
              <div className="glass-dark rounded-xl p-6">
                <p className="text-[#F5F1E8]/50 text-xs tracking-[0.3em] uppercase mb-6 font-sans">
                  До нашей свадьбы осталось
                </p>
                
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { value: timeLeft.days, label: 'дней' },
                    { value: timeLeft.hours, label: 'часов' },
                    { value: timeLeft.minutes, label: 'минут' },
                    { value: timeLeft.seconds, label: 'секунд' },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <span className="text-2xl md:text-4xl text-[#F5F1E8] font-serif tabular-nums block"
                            style={{ fontFamily: 'var(--font-playfair)' }}>
                        {mounted ? String(item.value).padStart(2, '0') : '00'}
                      </span>
                      <p className="text-[#F5F1E8]/40 text-[9px] md:text-[10px] tracking-wider uppercase mt-1 font-sans">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
