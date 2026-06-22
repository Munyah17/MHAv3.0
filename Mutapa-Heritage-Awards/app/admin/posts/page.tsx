import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Eye, Pencil } from 'lucide-react'
import Link from 'next/link'

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100">News & Blog</h1>
          <p className="text-stone-400 mt-1">Manage your articles and updates</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600">
          <Link href="/admin/posts/new">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <Card className="bg-stone-900/80 border-stone-800">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            All Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {posts && posts.length > 0 ? (
            <div className="space-y-3">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-amber-100 font-medium">{post.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-stone-400 text-sm">{post.category}</span>
                      <span className={`
                        px-2 py-0.5 rounded text-xs font-medium
                        ${post.is_published ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}
                      `}>
                        {post.is_published ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild className="text-stone-400 hover:text-amber-100">
                      <Link href={`/news/${post.slug}`} target="_blank">
                        <Eye className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild className="text-stone-400 hover:text-amber-100">
                      <Link href={`/admin/posts/${post.id}`}>
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-center py-8">No posts yet. Create your first post!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
