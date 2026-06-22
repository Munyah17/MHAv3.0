"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"

const postCategories = [
  "Announcements", "Profiles", "Events", "Culture",
  "Heritage", "Interviews", "Education", "News",
]

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export default function NewPostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTitle(value)
    setSlug(slugify(value))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category) { setError("Please select a category."); return }

    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    const supabase = createClient()
    const { error: supabaseError } = await supabase.from("posts").insert({
      title,
      slug: slug || slugify(title),
      excerpt: data.get("excerpt") as string,
      content: data.get("content") as string,
      category,
      image_url: data.get("image_url") as string || null,
      is_published: isPublished,
    })

    setIsSubmitting(false)

    if (supabaseError) {
      setError(supabaseError.message)
    } else {
      router.push("/admin/posts")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="text-stone-400 hover:text-amber-100">
          <Link href="/admin/posts"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-amber-100">New Post</h1>
          <p className="text-stone-400 mt-1">Create a new news article or blog post</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader>
            <CardTitle className="text-amber-100">Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Title *</Label>
                <Input
                  name="title"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Post title"
                  required
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Slug *</Label>
                <Input
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  required
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Category *</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="bg-stone-800 border-stone-700 text-amber-100">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700">
                    {postCategories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-amber-100">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Cover Image URL</Label>
                <Input
                  name="image_url"
                  placeholder="https://..."
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Excerpt *</Label>
              <Textarea
                name="excerpt"
                placeholder="Short summary shown in article listings..."
                rows={2}
                required
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Content *</Label>
              <Textarea
                name="content"
                placeholder="Full article content..."
                rows={14}
                required
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500 font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="published" className="text-stone-300 cursor-pointer">
                {isPublished ? "Published" : "Draft"}
              </Label>
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
            {isSubmitting ? "Saving..." : "Save Post"}
          </Button>
          <Button variant="outline" asChild className="border-stone-700 text-stone-300">
            <Link href="/admin/posts">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
