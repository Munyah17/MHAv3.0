"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Trophy, Star, ArrowRight, Play, Users, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const upcomingEvents = [
  {
    id: 1,
    title: "MHA 2026 Gala Night",
    date: "September 2026",
    venue: "TBA",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
    description: "The prestigious annual ceremony celebrating Zimbabwe's cultural guardians.",
    type: "Main Event",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Heritage Exhibition",
    date: "September 2026",
    venue: "TBA",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
    description: "A showcase of traditional crafts, art, and cultural artifacts.",
    type: "Exhibition",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Youth Cultural Workshop",
    date: "September 2026",
    venue: "TBA",
    image: "https://images.unsplash.com/photo-1529390079861-591f6db75eab?w=800&q=80",
    description: "Engaging the next generation with traditional skills and knowledge.",
    type: "Workshop",
    status: "upcoming",
  },
]

const pastWinners = [
  {
    id: 1,
    name: "Winner 1",
    category: "Mubikira (Culinary Arts)",
    year: "2024",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80",
    achievement: "Preserving traditional Shona recipes for 40+ years",
  },
  {
    id: 2,
    name: "Winner 2",
    category: "Lupembe (Fashion & Adornment)",
    year: "2025",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    achievement: "Master weaver keeping Ndebele textile traditions alive",
  },
  {
    id: 3,
    name: "Winner 3",
    category: "Nhaka (Custodian Award)",
    year: "2026",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&q=80",
    achievement: "Lifetime dedication to preserving Shona cultural practices",
  },
  {
    id: 4,
    name: "Winner 4",
    category: "Hwando (Performing Arts)",
    year: "2026",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&q=80",
    achievement: "Bringing mbira music to global audiences",
  },
]

const redCarpetGallery = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    caption: "MHA 2024 Red Carpet Arrivals",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    caption: "Award Ceremony Highlights",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    caption: "Cultural Performances",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80",
    caption: "VIP Networking Reception",
  },
]

const newsStories = [
  {
    id: 1,
    title: "MHA 2025 Nominations Now Open",
    excerpt: "Submit your nominations for cultural guardians who are preserving Zimbabwe's heritage.",
    date: "March 15, 2025",
    category: "Announcement",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
  },
  {
    id: 2,
    title: "Partnership with Ministry of Culture",
    excerpt: "MHA strengthens ties with government to expand cultural preservation initiatives nationwide.",
    date: "February 28, 2025",
    category: "Partnership",
    image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=600&q=80",
  },
  {
    id: 3,
    title: "Youth Heritage Program Launches",
    excerpt: "New initiative brings traditional skills to schools across all provinces.",
    date: "January 10, 2025",
    category: "Program",
    image: "https://images.unsplash.com/photo-1529390079861-591f6db75eab?w=600&q=80",
  },
]

function EventCard({ event, index }: { event: typeof upcomingEvents[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border border-border bg-card story-card"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
          {event.type}
        </Badge>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.venue}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function WinnerCard({ winner, index }: { winner: typeof pastWinners[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-[3/4] relative">
          <Image
            src={winner.image}
            alt={winner.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-medium">{winner.year} Winner</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-foreground mb-1">
            {winner.name}
          </h3>
          <p className="text-primary text-sm font-medium mb-2">
            {winner.category}
          </p>
          <p className="text-muted-foreground text-xs line-clamp-2">
            {winner.achievement}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function EventsNews() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState("events")

  return (
    <section ref={containerRef} className="relative py-20 sm:py-32 overflow-hidden bg-secondary">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-12 h-px bg-primary mx-auto mb-6" />
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-4">
            Stay Connected
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
            Events, Winners <span className="text-primary">&amp;</span> Stories
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From red carpet glamour to grassroots initiatives, stay updated with
            everything happening in Zimbabwe&apos;s cultural renaissance.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="events" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="flex flex-wrap justify-center gap-2 mb-10 bg-transparent">
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 sm:px-6 py-2 rounded-full border border-border text-xs sm:text-sm"
            >
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" />
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger
              value="winners"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 sm:px-6 py-2 rounded-full border border-border text-xs sm:text-sm"
            >
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" />
              Past Winners
            </TabsTrigger>
            <TabsTrigger
              value="redcarpet"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 sm:px-6 py-2 rounded-full border border-border text-xs sm:text-sm"
            >
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" />
              Red Carpet
            </TabsTrigger>
            <TabsTrigger
              value="news"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 sm:px-6 py-2 rounded-full border border-border text-xs sm:text-sm"
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" />
              News &amp; Updates
            </TabsTrigger>
          </TabsList>

          {/* Upcoming Events */}
          <TabsContent value="events" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/events">
                  View All Events
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Past Winners */}
          <TabsContent value="winners" className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {pastWinners.map((winner, index) => (
                <WinnerCard key={winner.id} winner={winner} index={index} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/winners">
                  View All Winners
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* Red Carpet Gallery */}
          <TabsContent value="redcarpet" className="mt-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {redCarpetGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Play className="w-10 h-10 text-primary mx-auto mb-2" />
                      <p className="text-foreground text-sm font-medium">{item.caption}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/gallery">
                  View Full Gallery
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          {/* News & Updates */}
          <TabsContent value="news" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsStories.map((story, index) => (
                <motion.article
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-card rounded-lg border border-border overflow-hidden story-card"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary/80 text-primary-foreground">
                      {story.category}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <p className="text-muted-foreground text-xs mb-2">{story.date}</p>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {story.excerpt}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link href="/news">
                  Read All Stories
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
