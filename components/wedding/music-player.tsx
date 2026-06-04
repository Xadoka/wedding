'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Music, Music2 } from 'lucide-react'

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          height: string
          width: string
          videoId: string
          playerVars: {
            autoplay: number
            loop: number
            playlist: string
            controls: number
            showinfo: number
            modestbranding: number
            rel: number
            enablejsapi: number
            origin: string
          }
          events: {
            onReady: (event: { target: YTPlayer }) => void
            onStateChange: (event: { data: number }) => void
          }
        }
      ) => YTPlayer
      PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  setVolume: (volume: number) => void
  getPlayerState: () => number
  destroy: () => void
}

// Sara Perche Ti Amo - Ricchi Poveri
const YOUTUBE_VIDEO_ID = 'FWXLKwRFVHg'

export default function MusicPlayer() {
  const playerRef = useRef<YTPlayer | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('wedding-music-playing')
    if (savedState === 'true') {
      setIsPlaying(true)
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('wedding-music-playing', String(isPlaying))
  }, [isPlaying])

  const initPlayer = useCallback(() => {
    if (playerRef.current || !window.YT) return

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 0,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1,
        origin: typeof window !== 'undefined' ? window.location.origin : '',
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(18)
          setIsReady(true)
          
          // Auto-play if was playing before
          const savedState = localStorage.getItem('wedding-music-playing')
          if (savedState === 'true' && hasInteracted) {
            event.target.playVideo()
          }
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true)
          } else if (event.data === window.YT.PlayerState.PAUSED) {
            setIsPlaying(false)
          }
        },
      },
    })
  }, [hasInteracted])

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return

    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    window.onYouTubeIframeAPIReady = () => {
      initPlayer()
    }

    // Check if API already loaded
    if (window.YT && window.YT.Player) {
      initPlayer()
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
      }
    }
  }, [initPlayer])

  // Handle first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasInteracted(true)
      
      // Try to auto-play after interaction if state was saved as playing
      const savedState = localStorage.getItem('wedding-music-playing')
      if (savedState === 'true' && playerRef.current && isReady) {
        playerRef.current.playVideo()
      }
      
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }

    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [isReady])

  const toggleMusic = () => {
    if (!playerRef.current || !isReady) return

    if (isPlaying) {
      playerRef.current.pauseVideo()
      setIsPlaying(false)
    } else {
      playerRef.current.playVideo()
      setIsPlaying(true)
    }
  }

  return (
    <>
      {/* Hidden YouTube player */}
      <div id="youtube-player" className="hidden" />

      {/* Music toggle button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 5, duration: 0.5 }}
        onClick={toggleMusic}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center group transition-all duration-300 shadow-xl ${
          isPlaying 
            ? 'bg-[#5A1E2D]/80 backdrop-blur-md border border-[#F5F1E8]/20' 
            : 'bg-[#F5F1E8]/80 backdrop-blur-md border border-[#5A1E2D]/20'
        }`}
        style={{
          boxShadow: isPlaying 
            ? '0 0 20px rgba(90, 30, 45, 0.4), 0 0 40px rgba(90, 30, 45, 0.2)' 
            : '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
      >
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 4, repeat: isPlaying ? Infinity : 0, ease: 'linear' }}
        >
          {isPlaying ? (
            <Music2 className="w-6 h-6 text-[#F5F1E8]" />
          ) : (
            <Music className="w-6 h-6 text-[#5A1E2D]/60" />
          )}
        </motion.div>
        
        {/* Pulsing glow effect when playing */}
        {isPlaying && (
          <>
            <motion.div
              animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-[#5A1E2D]/40"
            />
            <motion.div
              animate={{ scale: [1, 1.7], opacity: [0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              className="absolute inset-0 rounded-full border border-[#5A1E2D]/30"
            />
          </>
        )}

        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 px-3 py-1 bg-[#2B1B18] text-[#F5F1E8] text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-sans">
          {isPlaying ? 'Music Off' : 'Music On'}
        </span>
      </motion.button>
    </>
  )
}
