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

interface Event {
  id: string
  title: string
  description: string
  event_date: string
  venue: string | null
  event_type: string
  is_featured: boolean
  image_url: string | null
}

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [event, setEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const [eventType, setEventType] = useState("upcoming")
  const [isFeatured, setIsFeatured] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("events").select("*").eq("id", id).single()
      if (data) {
        setEvent(data)
        setEventType(data.event_type || "upcoming")
        setIsFeatured(data.is_featured || false)
      }
      setIsLoading(false)
    }
    fetchEvent()
  }, [id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const data = new FormData(form)

    const supabase = createClient()
    const { error: supabaseError } = await supabase
      .from("events")
      .update({
        title: data.get("title") as string,
        description: data.get("description") as string,
        event_date: data.get("event_date") as string,
        venue: (data.get("venue") as string) || null,
        event_type: eventType,
        is_featured: isFeatured,
        image_url: (data.get("image_url") as string) || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    setIsSubmitting(false)

    if (supabaseError) {
      setError(supabaseError.message)
    } else {
      router.push("/admin/events")
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from("events").delete().eq("id", id)
    router.push("/admin/events")
  }

  const formatDateForInput = (dateStr: string) => {
    try {
      return new Date(dateStr).toISOString().slice(0, 16)
    } catch {
      return ""
    }
  }

  if (isLoading) return <div className="text-stone-400 text-center py-16">Loading...</div>
  if (!event) return <div className="text-red-400 text-center py-16">Event not found.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="text-stone-400 hover:text-amber-100">
            <Link href="/admin/events"><ArrowLeft className="w-4 h-4 mr-2" />Back</Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-amber-100">Edit Event</h1>
            <p className="text-stone-400 mt-1">{event.title}</p>
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
              <AlertDialogTitle className="text-amber-100">Delete Event?</AlertDialogTitle>
              <AlertDialogDescription className="text-stone-400">
                This will permanently delete &ldquo;{event.title}&rdquo;. This action cannot be undone.
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
            <CardTitle className="text-amber-100">Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-stone-300">Event Title *</Label>
              <Input
                name="title"
                defaultValue={event.title}
                placeholder="Event title"
                required
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Date & Time *</Label>
                <Input
                  name="event_date"
                  type="datetime-local"
                  defaultValue={formatDateForInput(event.event_date)}
                  required
                  className="bg-stone-800 border-stone-700 text-amber-100"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Venue</Label>
                <Input
                  name="venue"
                  defaultValue={event.venue || ""}
                  placeholder="Event venue"
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-stone-300">Event Type *</Label>
                <Select value={eventType} onValueChange={setEventType}>
                  <SelectTrigger className="bg-stone-800 border-stone-700 text-amber-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-stone-800 border-stone-700">
                    <SelectItem value="upcoming" className="text-amber-100">Upcoming</SelectItem>
                    <SelectItem value="past" className="text-amber-100">Past</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-stone-300">Cover Image URL</Label>
                <Input
                  name="image_url"
                  defaultValue={event.image_url || ""}
                  placeholder="https://..."
                  className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-stone-300">Description *</Label>
              <Textarea
                name="description"
                defaultValue={event.description}
                placeholder="Describe the event..."
                rows={4}
                required
                className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch id="featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              <Label htmlFor="featured" className="text-stone-300 cursor-pointer">Featured event</Label>
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
            <Link href="/admin/events">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
