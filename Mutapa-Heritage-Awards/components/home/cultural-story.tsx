"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { AlertTriangle, Heart, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const storyChapters = [
  {
    id: "tradition",
    title: "The Ancient Ways",
    subtitle: "Our Roots Run Deep",
    description: "For centuries, the people of Zimbabwe have carried the wisdom of their ancestors through sacred rituals, traditional crafts, and oral histories passed down through generations.",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
    color: "from-amber-900/20 to-transparent",
    icon: Heart,
  },
  {
    id: "erosion",
    title: "The Silent Erosion",
    subtitle: "What We Stand to Lose",
    description: "As modernity sweeps across our land, precious traditions fade into memory. Young voices forget the songs of their grandmothers. Ancient crafts lie dormant as artisan hands grow still.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    color: "from-red-900/30 to-transparent",
    icon: AlertTriangle,
    warning: true,
  },
  {
    id: "preservation",
    title: "The Guardians Rise",
    subtitle: "Our Answer to the Call",
    description: "The Munhumutapa Heritage Awards honours those who stand against the tide of cultural erosion. These guardians ensure our children will know who they are and where they come from.",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/36/Great_Zimbabwe_%28Donjon%29.jpg",
    color: "from-primary/20 to-transparent",
    icon: Sparkles,
  },
]

function StoryCard({ chapter, index }: { chapter: typeof storyChapters[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const Icon = chapter.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative overflow-hidden rounded-lg border ${
        chapter.warning ? "border-red-500/30" : "border-border"
      } story-card`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={chapter.image}
          alt={chapter.title}
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${chapter.color}`} />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 sm:p-8">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
          chapter.warning ? "bg-red-500/20 text-red-400" : "bg-primary/20 text-primary"
        }`}>
          <Icon className="w-6 h-6" />
        </div>
        
        <p className={`text-xs font-medium tracking-[0.2em] uppercase mb-2 ${
          chapter.warning ? "text-red-400" : "text-primary"
        }`}>
          {chapter.subtitle}
        </p>
        
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
          {chapter.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed">
          {chapter.description}
        </p>

        {chapter.warning && (
          <div className="mt-6 p-4 rounded-md bg-red-500/10 border border-red-500/20">
            <p className="text-red-300 text-sm font-medium">
              UNESCO estimates that indigenous languages and traditions are disappearing at an alarming rate globally. Zimbabwe is not immune.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export function CulturalStory() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section 
      id="cultural-story" 
      ref={containerRef}
      className="relative py-16 sm:py-24 lg:py-32 overflow-hidden"
    >
      {/* Decorative Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-50" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="w-12 h-px bg-primary mx-auto mb-6" />
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            The Living Archive
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            A Story of <span className="text-gold-gradient">Erosion</span> <br className="hidden sm:block" />
            and <span className="text-primary">Revival</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Understanding what we risk losing is the first step to preservation.
            This is Zimbabwe&apos;s cultural journey.
          </p>
        </motion.div>

        {/* Story Cards - Mobile Stacked, Desktop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
          {storyChapters.map((chapter, index) => (
            <StoryCard key={chapter.id} chapter={chapter} index={index} />
          ))}
        </div>

        {/* Visual Timeline - Mobile Motion Graphics */}
        <motion.div
          style={{ y, opacity }}
          className="relative py-8 md:py-16"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            {/* Past */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary/30 mb-3">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Traditional life"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-muted-foreground text-sm">Yesterday</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-primary rotate-90 md:rotate-0"
            >
              <ArrowRight className="w-8 h-8" />
            </motion.div>

            {/* Present - Danger Zone */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-red-500/50 mb-3 ring-4 ring-red-500/20">
                  <Image
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80"
                    alt="Modern disconnect"
                    width={128}
                    height={128}
                    className="object-cover w-full h-full grayscale"
                  />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center"
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                </motion.div>
              </div>
              <span className="text-red-400 text-sm font-medium">Today&apos;s Crisis</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-primary rotate-90 md:rotate-0"
            >
              <ArrowRight className="w-8 h-8" />
            </motion.div>

            {/* Future */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-primary mb-3 ring-4 ring-primary/30 animate-pulse-glow">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/Zimbabwe_wall.jpg"
                  alt="Cultural revival"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-primary text-sm font-medium">Our Tomorrow</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
