"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

const awardCategories = [
  "The Munhumutapa Grand Honour for Cultural Stewardship",
  "The Mubikira Award — Culinary Heritage",
  "The Hwando Award — Linguistic Excellence",
  "The Mbira Award — Performing Arts",
  "The Dhaga Award — Visual Arts & Craft",
  "The Lupembe Award — Cultural Fashion",
  "The Goto Award — Storytelling & Film",
  "The Muti Award — Sacred Sites & Ecology",
  "The Munhumutapa Eternal Flame Award — Posthumous Honours",
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i))

export default function NewWinnerPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState(String(currentYear))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category) { setError("Please select a category."); return }

    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    const supabase = createClient()
    const { error: supabaseError } = await supabase.from("winners").insert({
      name: data.get("name") as string,
      category,
      year,
      description: (data.get("description") as string) || null,
      image_url: (data.get("image_url") as string) || null,
    })

    setIsSubmitting(false)

    if (supabaseError) {
      setError(supabaseError.message)
    } else {
      router.push("/admin/winners")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="text-stone-400 hover:text-amber-100">
          <Link href="/admin/winners"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-amber-100">Add Winner</h1>
          <p className="text-stone-400 mt-1">Record a new award winner</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader>
            <CardTitle className="text-amber-100">Winner Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Winner Name *</Label>
                <Input
                  name="name"
                  placeholder="Full name of the winner"
                  required
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Award Year *</Label>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger className="bg-stone-800 border-stone-700 text-amber-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700">
                    {years.map((y) => (
                      <SelectItem key={y} value={y} className="text-amber-100">{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Award Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-stone-800 border-stone-700 text-amber-100">
                  <SelectValue placeholder="Select award category" />
                </SelectTrigger>
                <SelectContent className="bg-stone-800 border-stone-700">
                  {awardCategories.map((cat) => (
                    <SelectItem key={cat} value={cat} className="text-amber-100">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Profile Photo URL</Label>
              <Input
                name="image_url"
                placeholder="https://..."
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Description / Citation</Label>
              <Textarea
                name="description"
                placeholder="Brief description of the winner's contribution and why they were chosen..."
                rows={4}
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? "Saving..." : "Add Winner"}
          </Button>
          <Button variant="outline" asChild className="border-stone-700 text-stone-300">
            <Link href="/admin/winners">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
