"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Target, Users, Award, ArrowRight, Quote } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Ubuntu",
    description: "I am because we are. Our interconnectedness is our greatest strength.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We pursue the  standards in honouring cultural preservation.",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Every tribe, every tradition, every voice matters in our mission.",
  },
  {
    icon: Award,
    title: "Integrity",
    description: "Transparent, fair, and accountable in all we do.",
  },
]

const team = [
  {
    name: "Team Member 1",
    role: "Founder & Executive Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Team Member 2",
    role: "Cultural Programs Director",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80",
  },
  {
    name: "Team Member 3",
    role: "Partnerships Manager",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80",
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const missionRef = useRef(null)
  const missionInView = useInView(missionRef, { once: true })
  const valuesRef = useRef(null)
  const valuesInView = useInView(valuesRef, { once: true })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80"
              alt="Zimbabwe cultural heritage"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
          </div>

          <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-primary" />
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase">
                  Our Story
                </p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Guardians of <span className="text-gold-gradient">Zimbabwe&apos;s</span> Soul
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
                The Munhumutapa Heritage Awards was born from a simple yet profound realization:
                our cultural heritage is slipping away, and those fighting to preserve it deserve recognition.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section ref={missionRef} className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Our <span className="text-primary">Mission</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  To identify, celebrate, and empower the individuals, organizations, and communities
                  who are actively preserving, promoting, and innovating Zimbabwe&apos;s rich cultural heritage.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={missionInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
                  Our <span className="text-primary">Vision</span>
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  A Zimbabwe where cultural heritage is a source of national pride, economic opportunity,
                  and global recognition. A nation united by its diverse traditions.
                </p>
                <blockquote className="border-l-4 border-primary pl-6 py-2">
                  <p className="font-serif text-xl text-foreground italic">
                    &ldquo;Munhu munhu nekuda kwevanhu&rdquo;
                  </p>
                  <cite className="text-muted-foreground text-sm mt-2 block">
                    A person is a person because of other people
                  </cite>
                </blockquote>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section ref={valuesRef} className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Our <span className="text-primary">Values</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 bg-card rounded-lg border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Meet the <span className="text-primary">Team</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Passionate individuals dedicated to preserving Zimbabwe&apos;s heritage
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-primary/20 mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Join the Movement
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Whether you&apos;re a cultural guardian, a supporter, or a partner,
              there&apos;s a place for you in preserving Zimbabwe&apos;s heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/nominations">
                  Nominate Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/partner">Partner With Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
