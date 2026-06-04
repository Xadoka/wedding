'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ClipboardList, User, Users, UserX, Loader2, Check, Send } from 'lucide-react'

type AttendanceOption = 'attending' | 'with-partner' | 'not-attending' | null

export default function RSVPSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [name, setName] = useState('')
  const [attendance, setAttendance] = useState<AttendanceOption>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const attendanceOptions = [
    { 
      value: 'attending' as const, 
      label: 'Обязательно буду', 
      icon: User,
      description: 'Приду один/одна'
    },
    { 
      value: 'with-partner' as const, 
      label: 'Приду с парой', 
      icon: Users,
      description: 'Буду с партнером'
    },
    { 
      value: 'not-attending' as const, 
      label: 'К сожалению, не смогу присутствовать', 
      icon: UserX,
      description: 'Не смогу быть'
    },
  ]

  const handleSubmit = async () => {
    setError(null)

    const trimmedName = name.trim()
    if (!trimmedName) {
      setError('Пожалуйста, укажите ваше имя')
      return
    }
    if (!attendance) {
      setError('Пожалуйста, выберите вариант присутствия')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmedName, attendance }),
      })

      const data = (await response.json()) as { error?: string }

      if (!response.ok) {
        setError(data.error ?? 'Не удалось отправить анкету')
        return
      }

      setIsSubmitted(true)
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-[#2B1B18]/85" />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-2xl mx-auto"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <p className="text-[#F5F1E8]/50 text-xs tracking-[0.4em] uppercase mb-4 font-sans">
              Подтверждение присутствия
            </p>
            <h2 className="text-4xl md:text-6xl text-[#F5F1E8] mb-4"
                style={{ fontFamily: 'var(--font-script)' }}>
              RSVP
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5F1E8]/30" />
              <ClipboardList className="w-5 h-5 text-[#F5F1E8]/40" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5F1E8]/30" />
            </div>
          </motion.div>

          {/* RSVP Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark rounded-2xl p-8 md:p-10"
          >
            {/* Name input */}
            <div className="mb-8">
              <label className="block text-[#F5F1E8]/70 text-sm mb-3 font-sans">
                Ваше имя и фамилия
                <span className="text-[#F5F1E8]/40 text-xs block mt-1">
                  (если с парой, укажите имя пары)
                </span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше имя"
                className="w-full px-4 py-3 bg-[#F5F1E8]/10 border border-[#F5F1E8]/20 rounded-lg text-[#F5F1E8] placeholder-[#F5F1E8]/30 font-sans focus:outline-none focus:border-[#F5F1E8]/40 transition-colors"
              />
            </div>

            {/* Attendance options */}
            <div className="mb-8">
              <label className="block text-[#F5F1E8]/70 text-sm mb-4 font-sans">
                Подтвердите своё присутствие
              </label>
              <div className="space-y-3">
                {attendanceOptions.map((option) => {
                  const Icon = option.icon
                  const isSelected = attendance === option.value
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => setAttendance(option.value)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-lg border transition-all duration-300 text-left ${
                        isSelected
                          ? 'bg-[#5A1E2D]/30 border-[#5A1E2D]/50'
                          : 'bg-[#F5F1E8]/5 border-[#F5F1E8]/10 hover:border-[#F5F1E8]/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#5A1E2D]' : 'bg-[#F5F1E8]/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-[#F5F1E8]' : 'text-[#F5F1E8]/60'}`} />
                      </div>
                      <div>
                        <p className={`font-sans text-sm ${isSelected ? 'text-[#F5F1E8]' : 'text-[#F5F1E8]/80'}`}>
                          {option.label}
                        </p>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected ? 'border-[#5A1E2D] bg-[#5A1E2D]' : 'border-[#F5F1E8]/30'
                      }`}>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-2 h-2 rounded-full bg-[#F5F1E8]"
                          />
                        )}
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {error && (
              <p className="text-red-300/90 text-sm text-center mb-4 font-sans" role="alert">
                {error}
              </p>
            )}

            {isSubmitted ? (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <div className="w-12 h-12 rounded-full bg-[#5A1E2D]/40 flex items-center justify-center">
                  <Check className="w-6 h-6 text-[#F5F1E8]" />
                </div>
                <p className="text-[#F5F1E8] font-sans text-sm">
                  Спасибо! Ваш ответ сохранён.
                </p>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={isSubmitting ? undefined : { scale: 1.02 }}
                whileTap={isSubmitting ? undefined : { scale: 0.98 }}
                className="w-full py-4 bg-[#5A1E2D] hover:bg-[#6B2940] disabled:opacity-60 disabled:cursor-not-allowed text-[#F5F1E8] rounded-lg font-sans text-sm tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Отправка...</span>
                  </>
                ) : (
                  <>
                    <span>Заполнить анкету</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            )}

            {!isSubmitted && (
              <p className="text-[#F5F1E8]/40 text-xs text-center mt-4 font-sans">
                Ответ сохранится в нашей таблице гостей
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
