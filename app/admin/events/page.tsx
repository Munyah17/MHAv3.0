import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Calendar, Pencil } from 'lucide-react'
import Link from 'next/link'

export default async function AdminEventsPage() {
  const supabase = await createClient()
  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: false })

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-ZW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100">Events</h1>
          <p className="text-stone-400 mt-1">Manage upcoming and past events</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600">
          <Link href="/admin/events/new">
            <Plus className="w-4 h-4 mr-2" />
            New Event
          </Link>
        </Button>
      </div>

      <Card className="bg-stone-900/80 border-stone-800">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            All Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {events && events.length > 0 ? (
            <div className="space-y-3">
              {events.map((event) => (
                <div 
                  key={event.id} 
                  className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-amber-100 font-medium">{event.title}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-stone-400 text-sm">{formatDate(event.event_date)}</span>
                      <span className="text-stone-500 text-sm">{event.venue}</span>
                      <span className={`
                        px-2 py-0.5 rounded text-xs font-medium
                        ${event.event_type === 'upcoming' ? 'bg-blue-900/30 text-blue-400' : 'bg-stone-700 text-stone-400'}
                      `}>
                        {event.event_type}
                      </span>
                      {event.is_featured && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-900/30 text-amber-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="text-stone-400 hover:text-amber-100">
                    <Link href={`/admin/events/${event.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-center py-8">No events yet. Create your first event!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
