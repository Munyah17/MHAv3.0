"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Globe, Users, TrendingUp, Handshake, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const sponsorshipTiers = [
  {
    name: "The Visionary Partner (Platinum)",
    subtitle: "Title Sponsor",
    price: "$100K+",
    benefits: [
      "All Heritage Pillar benefits",
      "Title sponsorship consideration",
      "Exclusive networking dinner access",
      "12 complimentary VIP tickets",
      "Featured video at ceremony",
      "Year-round brand partnership",
    ],
  },
  {
    name: "The Heritage Pillar (Gold)",
    subtitle: "Gold Partner",
    price: "$50,000",
    popular: true,
    benefits: [
      "All Cultural Guardian benefits",
      "Prime logo placement",
      "8 complimentary VIP tickets",
      "Award category naming rights",
      "Full page in event program",
      "Red carpet photo opportunity",
    ],
  },
  {
    name: "The Cultural Guardian (Silver)",
    subtitle: "Silver Partner",
    price: "$25,000",
    benefits: [
      "Logo on event materials",
      "Logo on main stage banner",
      "4 complimentary VIP tickets",
      "Speaking opportunity",
      "Press release mention",
    ],
  },
]

const whyPartner = [
  {
    icon: Globe,
    title: "Brand Visibility",
    description: "Reach audiences across Zimbabwe and the diaspora through our events and media coverage.",
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "Directly support cultural preservation and empower heritage guardians.",
  },
  {
    icon: TrendingUp,
    title: "CSR Goals",
    description: "Align your corporate social responsibility with meaningful cultural initiatives.",
  },
  {
    icon: Handshake,
    title: "Networking",
    description: "Connect with government officials, cultural leaders, and fellow corporate partners.",
  },
]

export default function PartnerPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [selectedTier, setSelectedTier] = useState("The Heritage Pillar (Gold)")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    const customAmount = data.get("custom-amount") as string
    const additionalInfo = data.get("additional-info") as string
    const partnershipType = customAmount
      ? `${selectedTier} (Custom: ${customAmount})`
      : selectedTier

    const message = [
      additionalInfo,
      customAmount ? `Custom Investment: ${customAmount}` : "",
    ]
      .filter(Boolean)
      .join("\n\n")

    const supabase = createClient()
    const { error: supabaseError } = await supabase.from("partnerships").insert({
      company_name: data.get("company") as string,
      contact_name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      partnership_type: partnershipType,
      message: message || null,
      status: "new",
    })

    setIsSubmitting(false)

    if (supabaseError) {
      setError("Failed to submit your interest. Please try again.")
    } else {
      setIsSuccess(true)
      form.reset()
    }
  }

  if (isSuccess) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md px-4"
          >
            <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Thank You!</h2>
            <p className="text-muted-foreground mb-8">
              We&apos;ve received your partnership interest. Our team will be in touch shortly to discuss
              how we can work together to celebrate Zimbabwe&apos;s heritage.
            </p>
            <Button onClick={() => setIsSuccess(false)} className="bg-primary hover:bg-primary/90">
              Submit Another Enquiry
            </Button>
          </motion.div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero */}
        <section ref={heroRef} className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=1920&q=80"
              alt="Partnership"
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
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Partnership Opportunities</p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Invest in <span className="text-gold-gradient">Culture</span>
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed">
                Partner with the Munhumutapa Heritage Awards and play a vital role in preserving
                Zimbabwe&apos;s rich cultural legacy for future generations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Partner */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Why <span className="text-primary">Partner</span> With Us?
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyPartner.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-6 bg-card rounded-lg border border-border text-center"
                  >
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Sponsorship Tiers */}
        <section className="py-8 sm:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Partnership <span className="text-primary">Tiers</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {sponsorshipTiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`p-6 rounded-lg border bg-card ${tier.popular ? "border-primary" : "border-border"}`}
                >
                  {tier.popular && (
                    <div className="text-primary text-xs font-medium tracking-widest uppercase mb-2">Most Popular</div>
                  )}
                  <p className="text-primary text-sm font-medium">{tier.subtitle}</p>
                  <h3 className="font-serif text-lg font-bold text-foreground mt-1 mb-1">{tier.name}</h3>
                  <p className="text-2xl font-bold text-foreground mb-4">{tier.price}</p>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Express Your <span className="text-primary">Interest</span>
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form below and our partnerships team will be in touch
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company / Organization *</Label>
                    <Input id="company" name="company" placeholder="Company name" required />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" name="email" type="email" placeholder="you@company.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" name="phone" placeholder="+263 XX XXX XXXX" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Preferred Partnership Tier *</Label>
                  <RadioGroup value={selectedTier} onValueChange={setSelectedTier} className="space-y-2">
                    {sponsorshipTiers.map((tier) => (
                      <div key={tier.name} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors">
                        <RadioGroupItem value={tier.name} id={tier.name} />
                        <Label htmlFor={tier.name} className="font-normal cursor-pointer flex-1">
                          <span className="font-medium">{tier.name}</span>
                          <span className="text-muted-foreground ml-2">({tier.price})</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Investment Figure (optional)</Label>
                  <Input id="custom-amount" name="custom-amount" placeholder="e.g. $75,000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information</Label>
                  <Textarea
                    id="additional-info"
                    name="additional-info"
                    placeholder="Tell us about your organisation and partnership interests..."
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Interest"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
