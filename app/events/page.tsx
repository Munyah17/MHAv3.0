"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Users, ArrowRight, Ticket } from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "Munhumutapa Heritage Awards 2026",
    date: "September 2026",
    time: "18:00 CAT",
    venue: "TBA",
    description: "The grand ceremony celebrating Zimbabwe's cultural guardians. Red carpet, live performances, and awards presentation.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Nominations Gala",
    date: "September 2026",
    time: "17:00 CAT",
    venue: "TBA",
    description: "Announcement of nominees across all categories with cultural performances.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
  },
  {
    id: 3,
    title: "Cultural Heritage Workshop",
    date: "September 2026",
    time: "09:00 CAT",
    venue: "TBA",
    description: "A day of learning traditional crafts, music, and storytelling from master artisans.",
    image: "https://images.unsplash.com/photo-1529390079861-591f6db75eab?w=800&q=80",
  },
]

const pastEvents = [
  {
    id: 1,
    title: "Heritage Awards 2025",
    date: "September 2026",
    attendees: "500+",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    highlights: ["Red Carpet Arrivals", "8 Award Categories", "Live Cultural Performances"],
  },
  {
    id: 2,
    title: "Cultural Festival 2026",
    date: "September 2026",
    attendees: "2,000+",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    highlights: ["Traditional Dance Competition", "Craft Market", "Food Festival"],
  },
]

export default function EventsPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
              alt="Events and celebrations"
              fill
              className="object-cover opacity-15"
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
                  Events & Gatherings
                </p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Where <span className="text-gold-gradient">Culture</span> Comes Alive
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
                Join us at our events celebrating Zimbabwe&apos;s heritage, from the grand awards ceremony to intimate cultural workshops.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Upcoming <span className="text-primary">Events</span>
            </h2>

            <div className="space-y-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-lg border ${event.featured ? "border-primary" : "border-border"
                    } bg-card`}
                >
                  {event.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-full z-10">
                      Featured Event
                    </div>
                  )}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative aspect-video md:aspect-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <h3 className="font-serif text-2xl font-bold text-foreground mb-3">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.venue}
                        </div>
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Ticket className="mr-2 h-4 w-4" />
                        Register Interest
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-8">
              Past <span className="text-primary">Events</span>
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group rounded-lg overflow-hidden border border-border bg-card"
                >
                  <div className="relative aspect-video">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-foreground">{event.attendees} Attendees</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-primary text-sm mb-1">{event.date}</p>
                    <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {event.highlights.map((highlight) => (
                        <span
                          key={highlight}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Don&apos;t Miss Our Next Event
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Subscribe to stay updated on upcoming events, ticket releases, and exclusive invitations.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/partner">
                Get Notified <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
