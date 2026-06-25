"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

// Cultural erosion motion graphic sequences
const culturalTransitions = [
  {
    id: 1,
    before: {
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
      label: "Our Heritage",
    },
    after: {
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80",
      label: "Our Present",
    },
    title: "Our Heritage",
    subtitle: "From deep roots to living truth.",
  },
  {
    id: 2,
    before: {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      label: "Ancient Practices",
    },
    after: {
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
      label: "Modern Life",
    },
    title: "Our Nation",
    subtitle: "From cultural essence to national honour.",
  },
  {
    id: 3,
    before: {
      image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Great_Zimbabwe_%28Donjon%29.jpg",
      label: "Our Ancestors",
    },
    after: {
      image: "https://images.unsplash.com/photo-1529390079861-591f6db75eab?w=800&q=80",
      label: "The Next Generation",
    },
    title: "Our Heroes",
    subtitle: "From timeless legacy to endless potential.",
  },
]

function MotionGraphicSlide({ slide, isActive }: { slide: typeof culturalTransitions[0]; isActive: boolean }) {
  const [showAfter, setShowAfter] = useState(false)

  useEffect(() => {
    if (isActive) {
      setShowAfter(false)
      const timer = setTimeout(() => setShowAfter(true), 2500)
      return () => clearTimeout(timer)
    }
  }, [isActive])

  return (
    <div className="absolute inset-0">
      {/* Before Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: showAfter ? 0 : 1,
          scale: showAfter ? 1.1 : 1
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={slide.before.image}
          alt={slide.before.label}
          fill
          priority
          className="object-cover"
        />
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showAfter ? 0 : 1, y: showAfter ? -20 : 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-32 sm:bottom-40 left-4 sm:left-8 lg:left-16"
        >
          <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs sm:text-sm font-medium rounded">
            {slide.before.label}
          </span>
        </motion.div>
      </motion.div>

      {/* After Image with transition effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: showAfter ? 1 : 0,
          scale: showAfter ? 1 : 0.95
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <Image
          src={slide.after.image}
          alt={slide.after.label}
          fill
          className="object-cover"
        />
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showAfter ? 1 : 0, y: showAfter ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-32 sm:bottom-40 left-4 sm:left-8 lg:left-16"
        >
          <span className="px-3 py-1 bg-red-500/80 text-white text-xs sm:text-sm font-medium rounded">
            {slide.after.label}
          </span>
        </motion.div>
      </motion.div>

      {/* Transition line effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: showAfter ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-white to-red-500 origin-left"
        style={{ transform: "translateY(-50%)" }}
      />
    </div>
  )
}

export function CinematicHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % culturalTransitions.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const scrollToStory = () => {
    document.getElementById("cultural-story")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Motion Graphic Backgrounds */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          {culturalTransitions.map((slide, index) => (
            index === currentSlide && (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <MotionGraphicSlide slide={slide} isActive={index === currentSlide} />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-background/50" />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 film-grain" />
      </div>

      {/* Content - positioned lower to avoid header overlap */}
      <div className="relative z-20 h-full flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-20 sm:pt-24 pb-28 sm:pb-0">
        <div className="max-w-5xl">
          {/* Animated Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-4 sm:mb-6"
          >
            <div className="w-12 md:w-24 h-px bg-primary" />
            <p className="text-primary text-xs sm:text-sm font-medium tracking-[0.2em] uppercase">
              Zimbabwe is Open for Business
            </p>
          </motion.div>

          {/* Main Title - Animated per slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground mb-2 sm:mb-4 leading-[0.9] tracking-tight">
                <span className="block text-gold-gradient">{culturalTransitions[currentSlide].title}</span>
              </h1>
              <p className="text-foreground/80 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-xl leading-relaxed">
                {culturalTransitions[currentSlide].subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Static Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 sm:mt-8"
          >
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6">
              Munhumutapa <span className="text-primary">Heritage</span> Awards
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mb-6 sm:mb-8 leading-relaxed">
              A celebration of the guardians who preserve Zimbabwe&apos;s
              rich cultural legacy for future generations. The Munhumutapa
              Heritage Awards unite us in building our nation brick by brick.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 h-11 sm:h-14 text-sm sm:text-base font-medium animate-pulse-glow"
            >
              <Link href="/nominations">
                Nominate a Guardian
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/50 text-foreground hover:bg-primary/10 px-6 sm:px-8 h-11 sm:h-14 text-sm sm:text-base"
            >
              <Link href="/about">
                Discover Our Story
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-24 sm:bottom-20 left-4 sm:left-8 lg:left-16 flex gap-2">
          {culturalTransitions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-500 ${index === currentSlide ? "w-8 bg-primary" : "w-4 bg-foreground/30"
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToStory}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label="Scroll to next section"
      >
        <span className="text-foreground/50 text-xs tracking-[0.2em] uppercase hidden sm:block">Discover</span>
        <ChevronDown className="w-5 h-5 text-primary animate-bounce" />
      </motion.button>
    </section>
  )
}
