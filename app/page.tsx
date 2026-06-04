'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EnvelopeOpening from '@/components/wedding/envelope-opening'
import InvitationSection from '@/components/wedding/invitation-section'
import DateSection from '@/components/wedding/date-section'
import LocationSection from '@/components/wedding/location-section'
import ScheduleSection from '@/components/wedding/schedule-section'
import WishesSection from '@/components/wedding/wishes-section'
import DressCodeSection from '@/components/wedding/dress-code-section'
import RSVPSection from '@/components/wedding/rsvp-section'
import FooterSection from '@/components/wedding/footer-section'
import MusicPlayer from '@/components/wedding/music-player'
import FloatingParticles from '@/components/wedding/floating-particles'

export default function WeddingPage() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)

  const handleEnvelopeComplete = useCallback(() => {
    setIsEnvelopeOpen(true)
  }, [])

  return (
    <>
      <AnimatePresence>
        {!isEnvelopeOpen && (
          <EnvelopeOpening onComplete={handleEnvelopeComplete} />
        )}
      </AnimatePresence>

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: isEnvelopeOpen ? 1 : 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative"
      >
        <FloatingParticles />
        <MusicPlayer />
        
        {/* 1. Invitation - "Дорогие гости!" */}
        <InvitationSection />
        
        {/* 2. Date Section - Calendar with countdown */}
        <DateSection />
        
        {/* 3. Location */}
        <LocationSection />
        
        {/* 4. Schedule */}
        <ScheduleSection />
        
        {/* 5. Wishes */}
        <WishesSection />
        
        {/* 6. Dress Code */}
        <DressCodeSection />
        
        {/* 7. RSVP Form */}
        <RSVPSection />
        
        {/* 8. Footer */}
        <FooterSection />
      </motion.main>
    </>
  )
}
