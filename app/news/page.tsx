"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, Tag } from "lucide-react"

const featuredStory = {
  id: 1,
  title: "Nominations Now Open for 2026 Heritage Awards",
  excerpt: "The Munhumutapa Heritage Awards invites nominations across 9 categories. Submit your nominations before the deadline.",
  category: "Announcements",
  date: "April 15, 2026",
  image: "https://images.unsplash.com/photo-1539571696357-5a69c17f0f27?w=1200&q=80",
  slug: "nominations-open-2026",
}

const newsStories = [
  {
    id: 2,
    title: "Celebrating Master Sculptor Tapfuma Gutsa",
    excerpt: "A look at the life and work of one of Zimbabwe's most celebrated stone sculptors and his contribution to preserving our artistic heritage.",
    category: "Profiles",
    date: "April 10, 2026",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80",
    slug: "master-sculptor-tapfuma-gutsa",
  },
  {
    id: 3,
    title: "Youth Cultural Festival Returns to Bulawayo",
    excerpt: "The annual festival showcasing young talents in traditional arts, music, and dance will take place this August.",
    category: "Events",
    date: "April 5, 2026",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80",
    slug: "youth-cultural-festival-bulawayo",
  },
  {
    id: 4,
    title: "Traditional Cuisine Revival: The Nhopi Renaissance",
    excerpt: "How young chefs are bringing traditional Zimbabwean dishes back to modern restaurants.",
    category: "Culture",
    date: "March 28, 2026",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    slug: "nhopi-renaissance-traditional-cuisine",
  },
  {
    id: 5,
    title: "Language Preservation Initiative Launches in Rural Schools",
    excerpt: "A new program aims to teach indigenous languages in 50 rural schools across Zimbabwe.",
    category: "Education",
    date: "March 20, 2026",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    slug: "language-preservation-rural-schools",
  },
  {
    id: 6,
    title: "Great Zimbabwe World Heritage Site Gets Restoration",
    excerpt: "UNESCO-funded restoration project begins at the iconic ancient city ruins.",
    category: "Heritage",
    date: "March 15, 2026",
    image: "https://images.unsplash.com/photo-1590845947376-2638caa89309?w=600&q=80",
    slug: "great-zimbabwe-restoration",
  },
  {
    id: 7,
    title: "Interview: The Future of Mbira Music",
    excerpt: "Renowned mbira player shares thoughts on keeping traditional music relevant for younger generations.",
    category: "Interviews",
    date: "March 8, 2026",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&q=80",
    slug: "future-of-mbira-music",
  },
]

const categories = ["All", "Announcements", "Profiles", "Events", "Culture", "Heritage", "Interviews", "Education"]

export default function NewsPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [activeCategory, setActiveCategory] = useState("All")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const filteredStories = activeCategory === "All"
    ? newsStories
    : newsStories.filter((s) => s.category === activeCategory)

  const showFeatured = activeCategory === "All" || activeCategory === featuredStory.category

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setSubscribed(true)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-24 pb-8 sm:pt-32 sm:pb-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-primary" />
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase">News & Stories</p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Latest <span className="text-gold-gradient">Updates</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
                Stay informed about heritage preservation efforts, upcoming events, winner spotlights, and cultural news.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-4 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-md z-30">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Story */}
        {showFeatured && (
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-8 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-lg overflow-hidden border border-primary"
              >
                <div className="grid lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto">
                    <Image src={featuredStory.image} alt={featuredStory.title} fill className="object-cover" />
                  </div>
                  <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Featured</span>
                      <span className="text-muted-foreground text-sm">{featuredStory.category}</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-4">
                      {featuredStory.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{featuredStory.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {featuredStory.date}
                      </div>
                      <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                        <Link href={`/news/${featuredStory.slug}`}>
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            {filteredStories.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No stories in this category yet.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setActiveCategory("All")}
                >
                  View all stories
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStories.map((story, index) => (
                  <motion.article
                    key={story.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/news/${story.slug}`}
                      className="group block rounded-lg overflow-hidden border border-border bg-card hover:border-primary/50 transition-colors h-full"
                    >
                      <div className="relative aspect-video">
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-2 py-1 bg-background/90 text-foreground text-xs rounded flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {story.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-muted-foreground text-sm mb-2 flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {story.date}
                        </p>
                        <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2">{story.excerpt}</p>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 sm:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">Stay Connected</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Subscribe to our newsletter for the latest news, event updates, and heritage stories.
            </p>
            {subscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg text-primary font-medium">
                You&apos;re subscribed. Thank you!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-md bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90">Subscribe</Button>
              </form>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
