"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Linkedin, Twitter } from "lucide-react"

const boardMembers = [
  {
    name: "Board Member Name",
    role: "Chairperson",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17f0f27?w=400&q=80",
    bio: "A distinguished leader in cultural preservation with over 20 years of experience.",
  },
  {
    name: "Board Member Name",
    role: "Vice Chairperson",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
    bio: "Renowned advocate for African heritage and traditional arts.",
  },
  {
    name: "Board Member Name",
    role: "Secretary General",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    bio: "Expert in cultural policy and heritage management.",
  },
  {
    name: "Board Member Name",
    role: "Treasurer",
    image: "https://images.unsplash.com/photo-1566492031773-43120a5a5af5?w=400&q=80",
    bio: "Financial strategist with passion for cultural investment.",
  },
]

export function BoardMembers() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section ref={containerRef} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 cultural-pattern opacity-30" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-12 h-px bg-primary mx-auto mb-6" />
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Leadership
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our <span className="text-primary">Board</span> Members
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the dedicated individuals guiding the Munhumutapa Heritage Awards
            in our mission to preserve and celebrate Zimbabwe&apos;s cultural heritage.
          </p>
        </motion.div>

        {/* Board Members Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {boardMembers.map((member, index) => (
            <motion.div
              key={member.name + index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                {/* Image Container */}
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                  
                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-foreground hover:bg-primary transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-colors duration-300" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium text-sm mb-2">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-12 italic"
        >
          Board member details coming soon. Check back for updates.
        </motion.p>
      </div>
    </section>
  )
}
