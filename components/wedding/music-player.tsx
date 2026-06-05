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
const YOUTUBE_VIDEO_ID = 'm3xfP4M50wo' // Вставьте сюда ID вашего видео

export default function MusicPlayer() {
  const playerRef = useRef<YTPlayer | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isReady, setIsReady] = useState(false) // Player is ready
  const [userInteracted, setUserInteracted] = useState(false) // User has clicked/touched the document

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('wedding-music-playing')
    if (savedState !== null) {
      setIsPlaying(savedState === 'true')
    }
  }, [])

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('wedding-music-playing', String(isPlaying))
  }, [isPlaying])

  const initPlayer = useCallback(() => { // Function to initialize the YouTube player
    if (playerRef.current || !window.YT) return

    playerRef.current = new window.YT.Player('youtube-player', {
      height: '0',
      width: '0',
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID,
        controls: 0, // We will handle autoplay manually after interaction
        showinfo: 0,
        modestbranding: 1,
        rel: 0,
        enablejsapi: 1,
        origin: typeof window !== 'undefined' ? window.location.origin : '',
      },
      events: {
        onReady: (event) => {
          event.target.setVolume(18)
          // Пытаемся запустить сразу при готовности (на случай, если браузер разрешит)
          if (isPlaying) event.target.playVideo()
          setIsReady(true)
          // Playback logic will be handled by a separate useEffect
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true)
            // Если видео заиграло само, значит взаимодействие уже произошло
            setUserInteracted(true)
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false)
          }
        },
      },
    })
  }, []) // No dependency on hasInteracted here, as playback is handled by a separate effect

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Only load API if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

      window.onYouTubeIframeAPIReady = () => {
        initPlayer()
      }
    }

    // Check if API already loaded
    if (window.YT && window.YT.Player) {
      initPlayer()
    }
    
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy()
        playerRef.current = null // Clear ref on unmount
      }
    }
  }, [initPlayer])

  // Handle first user interaction
  useEffect(() => {
    const events = ['click', 'touchstart', 'mousedown', 'keydown', 'scroll', 'wheel']
    const handleInteraction = () => {
      setUserInteracted(true)
      
      // Пытаемся запустить видео прямо в момент события
      if (playerRef.current && isReady && isPlaying) {
        playerRef.current.playVideo()
      }

      // Удаляем обработчики после первого же любого действия
      events.forEach(e => {
        document.removeEventListener(e, handleInteraction)
        window.removeEventListener(e, handleInteraction)
      })
    }

    if (!userInteracted) {
      events.forEach(e => {
        document.addEventListener(e, handleInteraction, { once: true, passive: true })
        window.addEventListener(e, handleInteraction, { once: true, passive: true })
      })
    }

    return () => {
      events.forEach(e => {
        document.removeEventListener(e, handleInteraction)
        window.removeEventListener(e, handleInteraction)
      })
    }
  }, [userInteracted])

  // Effect to control playback based on state
  useEffect(() => {
    if (isReady && userInteracted && isPlaying && playerRef.current) {
      playerRef.current.playVideo()
    } else if (isReady && playerRef.current && !isPlaying) {
      playerRef.current.pauseVideo()
    }
  }, [isReady, userInteracted, isPlaying]) // Depend on all relevant states

  const toggleMusic = () => {
    if (!playerRef.current || !isReady) return

    // If user interacts with the button, it counts as interaction
    setUserInteracted(true)

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
        transition={{ delay: 1, duration: 0.5 }} // Кнопка появляется почти сразу (через 1с)
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
