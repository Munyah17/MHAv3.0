"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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

const postCategories = [
  "Announcements", "Profiles", "Events", "Culture",
  "Heritage", "Interviews", "Education", "News",
]

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  image_url: string | null
  is_published: boolean
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [category, setCategory] = useState("")
  const [isPublished, setIsPublished] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("posts").select("*").eq("id", id).single()
      if (data) {
        setPost(data)
        setCategory(data.category || "")
        setIsPublished(data.is_published || false)
      }
      setIsLoading(false)
    }
    fetchPost()
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
      .from("posts")
      .update({
        title: data.get("title") as string,
        slug: data.get("slug") as string,
        excerpt: data.get("excerpt") as string,
        content: data.get("content") as string,
        category,
        image_url: (data.get("image_url") as string) || null,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    setIsSubmitting(false)

    if (supabaseError) {
      setError(supabaseError.message)
    } else {
      router.push("/admin/posts")
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from("posts").delete().eq("id", id)
    router.push("/admin/posts")
  }

  if (isLoading) {
    return <div className="text-stone-400 text-center py-16">Loading...</div>
  }

  if (!post) {
    return <div className="text-red-400 text-center py-16">Post not found.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="text-stone-400 hover:text-amber-100">
            <Link href="/admin/posts"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-amber-100">Edit Post</h1>
            <p className="text-stone-400 mt-1">{post.title}</p>
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
              <AlertDialogTitle className="text-amber-100">Delete Post?</AlertDialogTitle>
              <AlertDialogDescription className="text-stone-400">
                This will permanently delete &ldquo;{post.title}&rdquo;. This action cannot be undone.
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
            <CardTitle className="text-amber-100">Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Title *</Label>
                <Input
                  name="title"
                  defaultValue={post.title}
                  placeholder="Post title"
                  required
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Slug *</Label>
                <Input
                  name="slug"
                  defaultValue={post.slug}
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
                  defaultValue={post.image_url || ""}
                  placeholder="https://..."
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Excerpt *</Label>
              <Textarea
                name="excerpt"
                defaultValue={post.excerpt}
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
                defaultValue={post.content}
                placeholder="Full article content..."
                rows={14}
                required
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500 font-mono text-sm"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch id="published" checked={isPublished} onCheckedChange={setIsPublished} />
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" asChild className="border-stone-700 text-stone-300">
            <Link href="/admin/posts">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
