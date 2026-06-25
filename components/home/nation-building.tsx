"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, Building, Handshake, Globe, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

const pillars = [
  {
    icon: Heart,
    title: "Cultural Identity",
    description: "Preserving the essence of who we are as Zimbabweans",
  },
  {
    icon: Users,
    title: "Unity in Diversity",
    description: "Celebrating our many tribes as one nation",
  },
  {
    icon: Building,
    title: "Economic Growth",
    description: "Heritage as a driver of the creative economy",
  },
  {
    icon: Globe,
    title: "Global Presence",
    description: "Showcasing Zimbabwe to the world",
  },
]


const impactStats = [
  { value: "8", label: "Award Categories", suffix: "" },
  { value: "500", label: "Nominations Received", suffix: "+" },
  { value: "50", label: "Cultural Guardians Honoured", suffix: "+" },
  { value: "10", label: "Provinces Reached", suffix: "" },
]

function AnimatedCounter({ value, suffix }: { value: string; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const numericValue = parseInt(value)

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setCount(numericValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, numericValue])

  return (
    <span ref={ref} className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
      {count}{suffix}
    </span>
  )
}


export function NationBuilding() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Parallax Background - Victoria Falls or Great Zimbabwe */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1470071459603-6f6f9c5e2b01?w=800&q=80"
          alt="Victoria Falls Zimbabwe"
          fill
          className="object-cover opacity-15"
        />
      </motion.div>

      {/* Cultural Pattern */}
      <div className="absolute inset-0 cultural-pattern" />

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
            United We Stand
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            <span className="text-gold-gradient">Zimbabwe</span> is<br className="hidden sm:block" />
            {" "}Open{" "}for <span className="text-primary">Business</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Our cultural heritage is not just our development—it's our competitive advantage.
            Together, we build a nation that honours its past while embracing its future.
          </p>
        </motion.div>

        {/* Four Pillars */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 sm:mt-16 mb-12 sm:mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="group p-4 sm:p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-serif text-base sm:text-lg lg:text-xl font-bold text-foreground mb-1 sm:mb-2">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 py-8 sm:py-12 border-y border-border"
        >
          {impactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 sm:mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <blockquote className="font-serif text-xl sm:text-2xl lg:text-3xl text-foreground italic mb-6 sm:mb-8">
              &ldquo;When we invest in our culture, we invest in our nation.
              When we honour our guardians, we honour ourselves.&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 h-11 sm:h-12"
              >
                <Link href="/partner">
                  <Handshake className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Partner With Us
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 sm:px-8 h-11 sm:h-12"
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
