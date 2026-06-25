"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Users, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function NominationsCTA() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const deadline = new Date("2026-08-30T23:59:59")
    
    const timer = setInterval(() => {
      const now = new Date()
      const difference = deadline.getTime() - now.getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80"
          alt="African pattern"
          fill
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary" />
      </div>

      {/* Animated particles/shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-primary-foreground/10 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="w-12 h-px bg-primary-foreground/50 mx-auto mb-6" />
          <p className="text-primary-foreground/80 text-sm font-medium tracking-[0.2em] uppercase mb-4">
            The Inaugural Ceremony
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Honour Those Who <br className="hidden sm:block" />
            Preserve Our Legacy
          </h2>
          <p className="text-primary-foreground/80 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Know someone who embodies the spirit of Zimbabwean heritage? 
            Nominate them for the Munhumutapa Heritage Awards and help us 
            recognize the guardians of our culture.
          </p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-primary-foreground/70" />
              <span className="text-primary-foreground/70 text-sm font-medium">
                Nominations close: 30 August 2026
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto">
              {[
                { value: timeLeft.days, label: "Days" },
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Min" },
                { value: timeLeft.seconds, label: "Sec" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-primary-foreground/20">
                    <motion.span
                      key={item.value}
                      initial={{ opacity: 0.5, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground block"
                    >
                      {String(item.value).padStart(2, "0")}
                    </motion.span>
                  </div>
                  <span className="text-primary-foreground/60 text-xs mt-2 block tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground hover:bg-primary-foreground/90 text-primary h-14 px-10 text-base font-medium group"
            >
              <Link href="/nominations">
                Submit a Nomination
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          {/* Event Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 justify-center bg-primary-foreground/5 rounded-lg p-4 border border-primary-foreground/10">
              <Calendar className="w-5 h-5 text-primary-foreground/80" />
              <div className="text-left">
                <p className="text-primary-foreground/60 text-xs uppercase tracking-wide">Inaugural Event</p>
                <p className="text-primary-foreground font-medium text-sm">September 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center bg-primary-foreground/5 rounded-lg p-4 border border-primary-foreground/10">
              <MapPin className="w-5 h-5 text-primary-foreground/80" />
              <div className="text-left">
                <p className="text-primary-foreground/60 text-xs uppercase tracking-wide">Venue</p>
                <p className="text-primary-foreground font-medium text-sm">TBA</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center bg-primary-foreground/5 rounded-lg p-4 border border-primary-foreground/10">
              <Users className="w-5 h-5 text-primary-foreground/80" />
              <div className="text-left">
                <p className="text-primary-foreground/60 text-xs uppercase tracking-wide">Categories</p>
                <p className="text-primary-foreground font-medium text-sm">9 Awards</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
