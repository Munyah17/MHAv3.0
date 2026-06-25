import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, FileText, Trophy, Handshake, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch counts
  const [
    { count: eventsCount },
    { count: postsCount },
    { count: nominationsCount },
    { count: partnershipsCount },
  ] = await Promise.all([
    supabase.from('events').select('*', { count: 'exact', head: true }),
    supabase.from('posts').select('*', { count: 'exact', head: true }),
    supabase.from('nominations').select('*', { count: 'exact', head: true }),
    supabase.from('partnerships').select('*', { count: 'exact', head: true }),
  ])

  // Fetch recent nominations
  const { data: recentNominations } = await supabase
    .from('nominations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch recent partnership inquiries
  const { data: recentPartnerships } = await supabase
    .from('partnerships')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    { label: 'Events', value: eventsCount ?? 0, icon: Calendar, href: '/admin/events', color: 'text-blue-400' },
    { label: 'News & Posts', value: postsCount ?? 0, icon: FileText, href: '/admin/posts', color: 'text-green-400' },
    { label: 'Nominations', value: nominationsCount ?? 0, icon: Trophy, href: '/admin/nominations', color: 'text-amber-400' },
    { label: 'Partnerships', value: partnershipsCount ?? 0, icon: Handshake, href: '/admin/partnerships', color: 'text-purple-400' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-amber-100">Dashboard</h1>
        <p className="text-stone-400 mt-1">Welcome to the Munhumutapa Heritage Awards admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="bg-stone-900/80 border-stone-800 hover:border-amber-800/50 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-stone-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-amber-100 mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`${stat.color} w-10 h-10 opacity-60`} />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Nominations */}
        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Recent Nominations
            </CardTitle>
            <Link href="/admin/nominations" className="text-amber-400 text-sm hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentNominations && recentNominations.length > 0 ? (
              <div className="space-y-3">
                {recentNominations.map((nomination) => (
                  <div 
                    key={nomination.id} 
                    className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg"
                  >
                    <div>
                      <p className="text-amber-100 font-medium">{nomination.nominee_name}</p>
                      <p className="text-stone-400 text-sm">{nomination.category}</p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${nomination.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : ''}
                      ${nomination.status === 'approved' ? 'bg-green-900/30 text-green-400' : ''}
                      ${nomination.status === 'rejected' ? 'bg-red-900/30 text-red-400' : ''}
                      ${nomination.status === 'winner' ? 'bg-amber-900/30 text-amber-400' : ''}
                    `}>
                      {nomination.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 text-center py-8">No nominations yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Partnership Inquiries */}
        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <Handshake className="w-5 h-5 text-purple-400" />
              Partnership Inquiries
            </CardTitle>
            <Link href="/admin/partnerships" className="text-amber-400 text-sm hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentPartnerships && recentPartnerships.length > 0 ? (
              <div className="space-y-3">
                {recentPartnerships.map((partnership) => (
                  <div 
                    key={partnership.id} 
                    className="flex items-center justify-between p-3 bg-stone-800/50 rounded-lg"
                  >
                    <div>
                      <p className="text-amber-100 font-medium">{partnership.company_name}</p>
                      <p className="text-stone-400 text-sm">{partnership.partnership_type}</p>
                    </div>
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${partnership.status === 'new' ? 'bg-blue-900/30 text-blue-400' : ''}
                      ${partnership.status === 'contacted' ? 'bg-yellow-900/30 text-yellow-400' : ''}
                      ${partnership.status === 'confirmed' ? 'bg-green-900/30 text-green-400' : ''}
                    `}>
                      {partnership.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-stone-500 text-center py-8">No partnership inquiries yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-stone-900/80 border-stone-800">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link 
              href="/admin/posts/new"
              className="p-4 bg-stone-800 hover:bg-stone-700 rounded-lg text-center transition-colors"
            >
              <FileText className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-amber-100 font-medium">New Post</p>
            </Link>
            <Link 
              href="/admin/events/new"
              className="p-4 bg-stone-800 hover:bg-stone-700 rounded-lg text-center transition-colors"
            >
              <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-amber-100 font-medium">New Event</p>
            </Link>
            <Link 
              href="/admin/winners/new"
              className="p-4 bg-stone-800 hover:bg-stone-700 rounded-lg text-center transition-colors"
            >
              <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <p className="text-amber-100 font-medium">Add Winner</p>
            </Link>
            <Link 
              href="/admin/nominations"
              className="p-4 bg-stone-800 hover:bg-stone-700 rounded-lg text-center transition-colors"
            >
              <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-amber-100 font-medium">Review Nominations</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
