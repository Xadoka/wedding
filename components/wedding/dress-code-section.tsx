'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Palette } from 'lucide-react'

const colorPalette = [
  { name: 'Burgundy', color: '#5A1E2D', textColor: '#F5F1E8' },
  { name: 'Olive', color: '#6B7050', textColor: '#F5F1E8' },
  { name: 'Coffee Bean', color: '#4A2C2A', textColor: '#F5F1E8' },
]

export default function DressCodeSection() {
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
          className="max-w-3xl mx-auto text-center"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-[#5A1E2D]/50 text-xs tracking-[0.4em] uppercase mb-4 font-sans">
              Что надеть
            </p>
            <h2 className="text-4xl md:text-6xl text-[#5A1E2D] mb-4"
                style={{ fontFamily: 'var(--font-script)' }}>
              Dress Code
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#5A1E2D]/30" />
              <Palette className="w-5 h-5 text-[#5A1E2D]/40" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#5A1E2D]/30" />
            </div>
          </motion.div>

          {/* Color palette */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-[#5A1E2D]/50 text-xs tracking-[0.3em] uppercase mb-8 font-sans">
              Цветовая палитра
            </p>
            
            <div className="flex items-center justify-center gap-4 md:gap-8">
              {colorPalette.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="group"
                >
                  <div 
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg mb-4 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center border-4 border-white/50"
                    style={{ backgroundColor: item.color }}
                  >
                    <span 
                      className="text-xs md:text-sm font-sans tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: item.textColor }}
                    >
                      {item.name}
                    </span>
                  </div>
                  <p className="text-[#2B1B18]/70 text-xs md:text-sm font-sans">
                    {item.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Pinterest-style moodboard hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12"
          >
            <p className="text-[#2B1B18]/40 text-xs tracking-wider font-sans italic">
              Elegant &bull; Romantic &bull; Timeless
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
