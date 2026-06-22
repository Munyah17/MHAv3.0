"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Award, Music, Palette, BookOpen, Utensils, Shirt, Trees, Languages, ArrowRight, Trophy, Flame } from "lucide-react"

const categories = [
  {
    icon: Award,
    title: "The Munhumutapa Grand Honour for Cultural Stewardship",
    subtitle: "Flagship Honour",
    description: "Our flagship honour celebrating exceptional cultural stewardship and preservation of Zimbabwe's heritage. This is the premier award of the Munhumutapa Heritage Awards.",
    color: "bg-primary/10 text-primary",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17f0f27?w=800&q=80",
    flagship: true,
  },
  {
    icon: Utensils,
    title: "The Mubikira Award",
    subtitle: "Culinary Heritage",
    description: "Honouring chefs, food activists, and innovators reviving traditional grains and recipes.",
    color: "bg-amber-500/10 text-amber-500",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    icon: Languages,
    title: "The Hwando Award",
    subtitle: "Linguistic Excellence",
    description: "Celebrating authors, poets, and linguists preserving Zimbabwean languages.",
    color: "bg-emerald-500/10 text-emerald-500",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
  },
  {
    icon: Music,
    title: "The Mbira Award",
    subtitle: "Performing Arts",
    description: "Recognising traditional musicians, dancers, and contemporary artists who fuse heritage with modernity.",
    color: "bg-orange-500/10 text-orange-500",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
  },
  {
    icon: Palette,
    title: "The Dhaga Award",
    subtitle: "Visual Arts & Craft",
    description: "For sculptors, potters, and weavers, keeping indigenous techniques alive.",
    color: "bg-red-500/10 text-red-500",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
  },
  {
    icon: Shirt,
    title: "The Lupembe Award",
    subtitle: "Cultural Fashion",
    description: "Honouring designers who incorporate hides, beads, and traditional regalia into wearable art.",
    color: "bg-purple-500/10 text-purple-500",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/Traditional_Amhara_Dresses.jpg",
  },
  {
    icon: BookOpen,
    title: "The Goto Award",
    subtitle: "Storytelling & Film",
    description: "For filmmakers and oral historians capturing Zimbabwe's narratives for future generations.",
    color: "bg-pink-500/10 text-pink-500",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80",
  },
  {
    icon: Trees,
    title: "The Muti Award",
    subtitle: "Sacred Sites & Ecology",
    description: "Recognising traditional leaders and communities preserving sacred forests and water bodies.",
    color: "bg-blue-500/10 text-blue-500",
    image: "https://images.unsplash.com/photo-1470071459603-6f6f9c5e2b01?w=800&q=80",
  },
  {
    icon: Flame,
    title: "The Munhumutapa Eternal Flame Award",
    subtitle: "Posthumous Honours",
    description: "Heritage is a relay race. While we celebrate those holding the torch today, we bow to those who carried it before us. Our Posthumous Honours recognise the icons whose voices still echo in our music, our speech, and our traditions.",
    color: "bg-yellow-500/10 text-yellow-500",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&q=80",
  },
]

const pastWinners = [
  {
    year: "2024",
    name: "Winner 1",
    category: "Traditional Music",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80",
  },
  {
    year: "2025",
    name: "Winner 2",
    category: "Visual Arts",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
  },
  {
    year: "2026",
    name: "Winner 3",
    category: "Oral Traditions",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
  },
]

export default function AwardsPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const categoriesRef = useRef(null)
  const categoriesInView = useInView(categoriesRef, { once: true })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1920&q=80"
              alt="Awards ceremony"
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
                  Award Categories
                </p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Nine Pillars of <span className="text-gold-gradient">Excellence</span>
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
                Nine prestigious categories honouring different facets of Zimbabwe&apos;s rich cultural tapestry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories Grid */}
        <section ref={categoriesRef} className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const Icon = category.icon
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={categoriesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group p-6 bg-card rounded-lg border transition-all duration-300 ${category.flagship ? 'border-primary sm:col-span-2 lg:col-span-3' : 'border-border hover:border-primary/50'}`}
                  >
                    {category.flagship && (
                      <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <div className="relative w-full lg:w-1/3 aspect-video lg:aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className={`w-14 h-14 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="text-primary text-sm font-medium tracking-wide uppercase">Flagship Award</span>
                          <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                            {category.title}
                          </h3>
                          <p className="text-primary text-lg mb-2">{category.subtitle}</p>
                          <p className="text-muted-foreground">
                            {category.description}
                          </p>
                        </div>
                      </div>
                    )}
                    {!category.flagship && (
                      <>
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className={`w-14 h-14 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-serif text-lg font-bold text-foreground mb-1">
                          {category.title}
                        </h3>
                        <p className="text-primary text-sm mb-2">{category.subtitle}</p>
                        <p className="text-muted-foreground text-sm">
                          {category.description}
                        </p>
                      </>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Past Winners */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Past <span className="text-primary">Winners</span>
              </h2>
              <p className="text-muted-foreground">
                The cultural guardians who have been honoured
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {pastWinners.map((winner, index) => (
                <motion.div
                  key={winner.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden border border-border">
                    <Image
                      src={winner.image}
                      alt={winner.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-primary text-sm font-medium">{winner.year} Winner</span>
                      <h3 className="font-serif text-xl font-bold text-foreground">{winner.name}</h3>
                      <p className="text-muted-foreground text-sm">{winner.category}</p>
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
            <Award className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Know a Cultural Guardian?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Nominate them for the Munhumutapa Heritage Awards and help us celebrate their invaluable contribution.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/nominations">
                Nominate Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
