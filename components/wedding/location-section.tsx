'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import Script from 'next/script'

declare global {
  interface Window {
    DG: any;
  }
}

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const LAT = 49.876315
  const LON = 82.632927
  const MAP_URL = "https://2gis.kz/ustkam/geo/70030076171953716/82.632927,49.876315"

  useEffect(() => {
    if (isInView && typeof window !== 'undefined' && window.DG) {
      window.DG.then(() => {
        const map = window.DG.map(mapRef.current, {
          center: [LAT, LON],
          zoom: 16,
        });
        window.DG.marker([LAT, LON]).addTo(map).bindPopup('Villa Tau');
      });
    }
  }, [isInView]);

  const openMap = () => {
    window.open(MAP_URL, '_blank')
  }

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-[#2B1B18]">
      <Script 
        src="https://maps.api.2gis.ru/2.0/loader.js?pkg=full" 
        strategy="afterInteractive"
      />
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2048&auto=format&fit=crop')`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <p className="text-[#F5F1E8]/50 text-xs tracking-[0.4em] uppercase mb-4 font-sans">
              Место проведения
            </p>
            <h2 className="text-4xl md:text-6xl text-[#F5F1E8] mb-4"
                style={{ fontFamily: 'var(--font-script)' }}>
              Location
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#F5F1E8]/30" />
              <MapPin className="w-5 h-5 text-[#F5F1E8]/40" />
              <div className="w-12 md:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#F5F1E8]/30" />
            </div>
          </motion.div>

          {/* Location card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass rounded-2xl p-8 md:p-12 mb-8"
          >
            <h3 className="text-3xl md:text-5xl text-[#5A1E2D] mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}>
              Villa Tau
            </h3>
            
            <p className="text-[#2B1B18]/70 text-lg md:text-xl font-sans font-light mb-8">
              г. Усть-Каменогорск, улица Буранная, 23/1
            </p>

            {/* Map preview */}
            <div className="relative rounded-xl overflow-hidden mb-8 aspect-video md:aspect-[21/9] z-0">
              <div 
                ref={mapRef}
                className="w-full h-full grayscale-[30%] contrast-[90%] sepia-[20%]"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#5A1E2D]/10 rounded-xl" />
            </div>

            {/* Open map button */}
            <motion.button
              onClick={openMap}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#5A1E2D] text-[#F5F1E8] rounded-full font-sans text-sm tracking-wider uppercase hover:bg-[#7D3A4B] transition-colors duration-300 shadow-lg"
            >
              <Navigation className="w-4 h-4" />
              Открыть карту
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
