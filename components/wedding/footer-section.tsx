'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Heart } from 'lucide-react'

export default function FooterSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <footer className="relative py-16 md:py-24 overflow-hidden bg-[#F5F1E8]">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 paper-texture pointer-events-none" />

      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          {/* Monogram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border border-[#5A1E2D]/20">
              <span className="text-4xl text-[#5A1E2D]"
                    style={{ fontFamily: 'var(--font-script)' }}>
                D & A
              </span>
            </div>
          </motion.div>

          {/* With love text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#5A1E2D]/30" />
              <Heart className="w-4 h-4 text-[#5A1E2D]/50 fill-[#5A1E2D]/30" />
              <div className="w-8 h-[1px] bg-[#5A1E2D]/30" />
            </div>
            <p className="text-xl md:text-2xl text-[#5A1E2D] tracking-wide"
               style={{ fontFamily: 'var(--font-playfair)' }}>
              With love
            </p>
          </motion.div>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-[#2B1B18]/50 text-sm tracking-[0.3em] uppercase font-sans">
              08.08.2026
            </p>
          </motion.div>

          {/* Decorative bottom element */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12"
          >
            <div className="flex items-center justify-center gap-4">
              <div className="w-16 md:w-32 h-[1px] bg-gradient-to-r from-transparent to-[#5A1E2D]/20" />
              <div className="flex gap-1">
                <span className="text-[#5A1E2D]/20">&#10022;</span>
                <span className="text-[#5A1E2D]/30">&#10022;</span>
                <span className="text-[#5A1E2D]/20">&#10022;</span>
              </div>
              <div className="w-16 md:w-32 h-[1px] bg-gradient-to-l from-transparent to-[#5A1E2D]/20" />
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-8 text-[#2B1B18]/30 text-xs font-sans"
          >
            Made with love for Damir & Anel
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}
