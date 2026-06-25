"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Utensils, Music, Palette, Shirt, BookOpen, Trees, Languages, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = [
  {
    name: "The Munhumutapa Grand Honour for Cultural Stewardship",
    subtitle: "Flagship Honour",
    icon: Award,
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17f0f27?w=800&q=80",
    description: "Our flagship honour celebrating exceptional cultural stewardship and preservation of Zimbabwe's heritage. This is the premier award of the Munhumutapa Heritage Awards.",
    flagship: true
  },
  {
    name: "The Mubikira Award",
    subtitle: "Culinary Heritage",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    description: "Honouring chefs, food activists, and innovators reviving traditional grains and recipes."
  },
  {
    name: "The Hwando Award",
    subtitle: "Linguistic Excellence",
    icon: Languages,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    description: "Celebrating authors, poets, and linguists preserving Zimbabwean languages."
  },
  {
    name: "The Mbira Award",
    subtitle: "Performing Arts",
    icon: Music,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    description: "Recognising traditional musicians, dancers, and contemporary artists who fuse heritage with modernity."
  },
  {
    name: "The Dhaga Award",
    subtitle: "Visual Arts & Craft",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    description: "For sculptors, potters, and weavers, keeping indigenous techniques alive."
  },
  {
    name: "The Lupembe Award",
    subtitle: "Cultural Fashion",
    icon: Shirt,
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Traditional_Amhara_Dresses.jpg",
    description: "Honouring designers who incorporate hides, beads, and traditional regalia into wearable art."
  },
  {
    name: "The Goto Award",
    subtitle: "Storytelling & Film",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80",
    description: "For filmmakers and oral historians capturing Zimbabwe's narratives for future generations."
  },
  {
    name: "The Muti Award",
    subtitle: "Sacred Sites & Ecology",
    icon: Trees,
    image: "https://images.unsplash.com/photo-1470071459603-6f6f9c5e2b01?w=800&q=80",
    description: "Recognising traditional leaders and communities preserving sacred forests and water bodies."
  },
  {
    name: "The Munhumutapa Eternal Flame Award",
    subtitle: "Posthumous Honours",
    icon: Award,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
    description: "Heritage is a relay race. While we celebrate those holding the torch today, we bow to those who carried it before us. Our Posthumous Honours recognise the icons whose voices still echo in our music, our speech, and our traditions.",
  },
]

export function AwardsShowcase() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const handleCategoryClick = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden">
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
            The Sovereign Series
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Nine Pillars of <span className="text-primary">Excellence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Celebrating the diverse facets of Zimbabwean heritage through
            our prestigious award categories.
          </p>
        </motion.div>

        {/* Featured Category Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0"
              >
                <Image
                  src={categories[activeIndex].image}
                  alt={categories[activeIndex].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Category Icon Buttons - Mobile */}
            <div className="absolute bottom-4 left-4 right-4 lg:hidden">
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(index)}
                      className={cn(
                        "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all",
                        index === activeIndex
                          ? "bg-primary text-primary-foreground scale-110 ring-2 ring-primary/50"
                          : "bg-background/60 text-foreground/70 hover:bg-background/80"
                      )}
                      aria-label={category.name}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    {(() => {
                      const Icon = categories[activeIndex].icon
                      return <Icon className="w-6 h-6 text-primary" />
                    })()}
                  </div>
                  {categories[activeIndex].flagship ? (
                    <span className="text-primary font-medium tracking-wide uppercase text-sm">Flagship Honour</span>
                  ) : (
                    <span className="text-primary font-medium tracking-wide">Featured Category</span>
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 leading-tight">
                  {categories[activeIndex].name}
                </h3>
                <p className="text-primary text-xl mb-4">{categories[activeIndex].subtitle}</p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {categories[activeIndex].description}
                </p>

                <Button
                  asChild
                  className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6 group"
                >
                  <Link href="/awards">
                    View All Categories
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Category Grid - Desktop */}
        <div className="hidden lg:grid grid-cols-8 gap-2">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                onClick={() => handleCategoryClick(index)}
                className={cn(
                  "p-4 rounded-lg border transition-all duration-300 text-center group",
                  index === activeIndex
                    ? "bg-primary/10 border-primary"
                    : "bg-card/50 border-border hover:border-primary/50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center transition-colors",
                  index === activeIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className={cn(
                  "text-xs font-medium transition-colors",
                  index === activeIndex ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {category.name}
                </p>
              </motion.button>
            )
          })}
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(index)}
              className="relative h-1 rounded-full overflow-hidden bg-border w-8 sm:w-12"
              aria-label={`Go to category ${index + 1}`}
            >
              {index === activeIndex && isAutoPlaying && (
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  className="absolute inset-0 bg-primary"
                />
              )}
              {index === activeIndex && !isAutoPlaying && (
                <div className="absolute inset-0 bg-primary" />
              )}
              {index < activeIndex && (
                <div className="absolute inset-0 bg-primary/50" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
