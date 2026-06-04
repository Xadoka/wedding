'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart } from 'lucide-react'

export default function WishesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=2072&auto=format&fit=crop')`,
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
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-[#F5F1E8]/50 text-xs tracking-[0.4em] uppercase mb-4 font-sans">
              Наши пожелания
            </p>
            <h2 className="text-4xl md:text-6xl text-[#F5F1E8] mb-4"
                style={{ fontFamily: 'var(--font-script)' }}>
              Dear Guests
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5F1E8]/30" />
              <Heart className="w-5 h-5 text-[#F5F1E8]/40" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5F1E8]/30" />
            </div>
          </motion.div>

          {/* Wishes content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-dark rounded-2xl p-8 md:p-12"
          >
            <p className="text-[#F5F1E8]/90 text-lg md:text-xl leading-relaxed mb-8 font-sans font-light">
              Мы очень хотим, чтобы этот вечер прошёл уютно, тепло и в кругу самых близких людей.
            </p>
            
            <div className="w-16 h-[1px] bg-[#F5F1E8]/20 mx-auto mb-8" />
            
            <p className="text-[#F5F1E8]/80 text-base md:text-lg leading-relaxed mb-8 font-sans font-light">
              Пожалуйста, приходите вовремя — для нас важно разделить с вами каждую минуту этого дня.
            </p>
            
            <div className="w-16 h-[1px] bg-[#F5F1E8]/20 mx-auto mb-8" />
            
            <p className="text-[#F5F1E8]/70 text-base md:text-lg leading-relaxed font-sans font-light italic">
              Также просим с пониманием отнестись к формату мероприятия — вечер будет организован только для взрослых гостей.
            </p>
          </motion.div>

          {/* Decorative element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12"
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#F5F1E8]/30 text-2xl">✦</span>
              <span className="text-[#F5F1E8]/20 text-xl">✦</span>
              <span className="text-[#F5F1E8]/30 text-2xl">✦</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
