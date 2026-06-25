import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, Tag, ArrowLeft, ArrowRight } from "lucide-react"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) return { title: "Article Not Found" }
  return { title: post.title, description: post.excerpt }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) notFound()

  const { data: relatedPosts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, category, image_url, created_at")
    .eq("is_published", true)
    .eq("category", post.category)
    .neq("id", post.id)
    .order("created_at", { ascending: false })
    .limit(3)

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-ZW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        {/* Hero Image */}
        {post.image_url && (
          <div className="relative h-64 sm:h-80 lg:h-96 w-full">
            <Image
              src={post.image_url}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto">
            {/* Back */}
            <Button variant="ghost" asChild className="mb-8 -ml-2 text-muted-foreground hover:text-foreground">
              <Link href="/news">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to News
              </Link>
            </Button>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="flex items-center gap-1.5 text-sm text-primary font-medium">
                <Tag className="w-3.5 h-3.5" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.created_at)}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 border-l-4 border-primary pl-4">
              {post.excerpt}
            </p>

            {/* Content */}
            <div className="prose prose-stone dark:prose-invert max-w-none">
              {post.content.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-foreground/80 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share / CTA */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <p className="text-muted-foreground text-sm">
                  Know a cultural guardian? Help us celebrate them.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90 shrink-0">
                  <Link href="/nominations">
                    Nominate Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="max-w-5xl mx-auto mt-16 pt-16 border-t border-border">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                More in <span className="text-primary">{post.category}</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/news/${related.slug}`}
                    className="group rounded-lg overflow-hidden border border-border bg-card hover:border-primary/50 transition-colors"
                  >
                    {related.image_url && (
                      <div className="relative aspect-video">
                        <Image
                          src={related.image_url}
                          alt={related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-muted-foreground text-xs mb-2">{formatDate(related.created_at)}</p>
                      <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
