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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Award, Clock, CheckCircle, ArrowRight, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const categories = [
  { value: "culinary-heritage", label: "The Mubikira Award — Culinary Heritage" },
  { value: "linguistic-excellence", label: "The Hwando Award — Linguistic Excellence" },
  { value: "performing-arts", label: "The Mbira Award — Performing Arts" },
  { value: "visual-arts", label: "The Dhaga Award — Visual Arts & Craft" },
  { value: "cultural-fashion", label: "The Lupembe Award — Cultural Fashion" },
  { value: "storytelling-film", label: "The Goto Award — Storytelling & Film" },
  { value: "sacred-sites", label: "The Muti Award — Sacred Sites & Ecology" },
  { value: "posthumous", label: "The Munhumutapa Eternal Flame Award — Posthumous Honours" },
]

const criteria = [
  "Demonstrated commitment to cultural preservation over a sustained period",
  "Measurable impact on community or national level",
  "Innovation in preserving or promoting traditional practices",
  "Role in educating or mentoring others in cultural heritage",
  "Recognition by peers and community members",
]

export default function NominationsPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })
  const [agreed, setAgreed] = useState(false)
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!agreed || !category) return

    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    const supabase = createClient()
    const { error: supabaseError } = await supabase.from("nominations").insert({
      nominee_name: data.get("nominee-name") as string,
      nominee_email: data.get("nominee-email") as string,
      nominee_phone: data.get("nominee-phone") as string,
      category,
      reason: `${data.get("nominee-bio")}\n\nCommunity Impact:\n${data.get("impact")}`,
      supporting_evidence: data.get("achievements") as string,
      nominator_name: data.get("your-name") as string,
      nominator_email: data.get("your-email") as string,
      status: "pending",
    })

    setIsSubmitting(false)

    if (supabaseError) {
      setError("Failed to submit nomination. Please try again.")
    } else {
      setIsSuccess(true)
      form.reset()
      setCategory("")
      setAgreed(false)
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
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Nomination Submitted!</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for nominating a cultural guardian. We will review your submission and be in touch shortly.
            </p>
            <Button onClick={() => setIsSuccess(false)} className="bg-primary hover:bg-primary/90">
              Submit Another Nomination
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
              alt="Nominations"
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
                <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase">Nominate a Guardian</p>
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                Honour a <span className="text-gold-gradient">Cultural</span> Champion
              </h1>
              <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl leading-relaxed mb-8">
                Know someone making an extraordinary contribution to preserving Zimbabwe&apos;s cultural heritage?
                Nominate them for the Munhumutapa Heritage Awards.
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/30 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-foreground font-medium">Nominations close Soon. File Now!</p>
                  <p className="text-muted-foreground text-sm">Don&apos;t miss the deadline!</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Criteria */}
        <section className="py-12 sm:py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
                Nomination <span className="text-primary">Criteria</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {criteria.map((criterion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 bg-card rounded-lg border border-border"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm">{criterion}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Nomination Form */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-8 lg:px-16">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <Award className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-4">
                  Nomination <span className="text-primary">Form</span>
                </h2>
                <p className="text-muted-foreground">Complete all fields to submit your nomination</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Nominee Information */}
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-foreground border-b border-border pb-2">
                    Nominee Information
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nominee-name">Nominee Full Name *</Label>
                      <Input id="nominee-name" name="nominee-name" placeholder="Full name of the nominee" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nominee-email">Nominee Email (if known)</Label>
                      <Input id="nominee-email" name="nominee-email" type="email" placeholder="nominee@email.com" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nominee-phone">Nominee Phone (if known)</Label>
                      <Input id="nominee-phone" name="nominee-phone" placeholder="+263 XX XXX XXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label>Award Category *</Label>
                      <Select required value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat.value} value={cat.value}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nominee-bio">Brief Biography *</Label>
                    <Textarea
                      id="nominee-bio"
                      name="nominee-bio"
                      placeholder="Tell us about the nominee's background, their work, and their contribution to cultural preservation..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="achievements">Key Achievements *</Label>
                    <Textarea
                      id="achievements"
                      name="achievements"
                      placeholder="List specific achievements, projects, recognitions, or milestones..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="impact">Community Impact *</Label>
                    <Textarea
                      id="impact"
                      name="impact"
                      placeholder="Describe how their work has impacted the community, cultural preservation, or future generations..."
                      rows={4}
                      required
                    />
                  </div>
                </div>

                {/* Nominator Information */}
                <div className="space-y-6">
                  <h3 className="font-serif text-xl font-bold text-foreground border-b border-border pb-2">
                    Your Information (Nominator)
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="your-name">Your Full Name *</Label>
                      <Input id="your-name" name="your-name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="your-email">Your Email *</Label>
                      <Input id="your-email" name="your-email" type="email" placeholder="you@email.com" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="your-phone">Your Phone *</Label>
                      <Input id="your-phone" name="your-phone" placeholder="+263 XX XXX XXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship to Nominee *</Label>
                      <Input id="relationship" name="relationship" placeholder="e.g., Colleague, Community member" required />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreed}
                    onCheckedChange={(checked) => setAgreed(checked === true)}
                  />
                  <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer leading-relaxed">
                    I confirm that the information provided is accurate to the best of my knowledge and I consent to
                    the Munhumutapa Heritage Awards contacting me regarding this nomination.
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={!agreed || isSubmitting || !category}
                >
                  {isSubmitting ? "Submitting..." : <>Submit Nomination <ArrowRight className="ml-2 h-4 w-4" /></>}
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
