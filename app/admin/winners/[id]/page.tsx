"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

interface Winner {
  id: string
  name: string
  category: string
  year: string
  description: string | null
  image_url: string | null
}

export default function EditWinnerPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [winner, setWinner] = useState<Winner | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState(String(currentYear))

  useEffect(() => {
    const fetchWinner = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("winners").select("*").eq("id", id).single()
      if (data) {
        setWinner(data)
        setCategory(data.category || "")
        setYear(data.year || String(currentYear))
      }
      setIsLoading(false)
    }
    fetchWinner()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category) { setError("Please select a category."); return }

    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    const supabase = createClient()
    const { error: supabaseError } = await supabase
      .from("winners")
      .update({
        name: data.get("name") as string,
        category,
        year,
        description: (data.get("description") as string) || null,
        image_url: (data.get("image_url") as string) || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    setIsSubmitting(false)

    if (supabaseError) {
      setError(supabaseError.message)
    } else {
      router.push("/admin/winners")
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from("winners").delete().eq("id", id)
    router.push("/admin/winners")
  }

  if (isLoading) return <div className="text-stone-400 text-center py-16">Loading...</div>
  if (!winner) return <div className="text-red-400 text-center py-16">Winner not found.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="text-stone-400 hover:text-amber-100">
            <Link href="/admin/winners"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-amber-100">Edit Winner</h1>
            <p className="text-stone-400 mt-1">{winner.name}</p>
          </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-900/20">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-stone-900 border-stone-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-amber-100">Remove Winner?</AlertDialogTitle>
              <AlertDialogDescription className="text-stone-400">
                This will permanently remove &ldquo;{winner.name}&rdquo; from the winners list.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-stone-800 border-stone-700 text-stone-300">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-red-700 hover:bg-red-600">
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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
                  defaultValue={winner.name}
                  placeholder="Full name"
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
                  <SelectValue placeholder="Select category" />
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
                defaultValue={winner.image_url || ""}
                placeholder="https://..."
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Description / Citation</Label>
              <Textarea
                name="description"
                defaultValue={winner.description || ""}
                placeholder="Brief description..."
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" asChild className="border-stone-700 text-stone-300">
            <Link href="/admin/winners">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
