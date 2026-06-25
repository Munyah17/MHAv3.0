"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VideoPortal() {
  const containerRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 overflow-hidden bg-card">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-12 h-px bg-primary mx-auto mb-6" />
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Experience the Spirit
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            A Poetic <span className="text-primary">Introduction</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch a poet introduce the Munhumutapa Heritage Awards and paint the picture
            of Zimbabwe&apos;s cultural richness and the importance of preserving our heritage.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        >
          {/* Video Placeholder - Replace with actual video */}
          <div className="relative aspect-video bg-gradient-to-br from-background to-card">
            {/* Placeholder Background */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-background">
              <div className="text-center p-8">
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-primary/30">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </div>
                <p className="text-foreground/80 text-lg font-serif italic max-w-md mx-auto">
                  &ldquo;From the stones of Great Zimbabwe to the rhythms of the mbira,
                  we are the keepers of a timeless flame...&rdquo;
                </p>
                <p className="text-primary mt-4 font-medium">
                  Video Coming Soon
                </p>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-primary/30" />
            <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-primary/30" />
          </div>

          {/* Video Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-foreground hover:text-primary"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-foreground hover:text-primary"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
              </div>
              <p className="hidden sm:block text-foreground/60 text-sm truncate max-w-[200px] md:max-w-none">
                Munhumutapa Heritage Awards - Poetic Introduction
              </p>
            </div>
          </div>
        </motion.div>

        {/* Poem Excerpt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto text-center"
        >
          <blockquote className="font-serif text-lg sm:text-xl text-foreground/80 italic leading-relaxed">
            &ldquo;In the echoes of our ancestors&apos; drums,
            <br />In the wisdom passed from mother to daughter,
            <br />In the stories that dance upon our tongues,
            <br />We find the gold that needs no water.&rdquo;
          </blockquote>
          <p className="text-primary mt-4 font-medium">
            - Celebrating Zimbabwe&apos;s Cultural Guardians
          </p>
        </motion.div>
      </div>
    </section>
  )
}
