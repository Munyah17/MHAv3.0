import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Users, Pencil } from 'lucide-react'
import Link from 'next/link'

export default async function AdminWinnersPage() {
  const supabase = await createClient()
  const { data: winners } = await supabase
    .from('winners')
    .select('*')
    .order('year', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100">Winners</h1>
          <p className="text-stone-400 mt-1">Manage award winners</p>
        </div>
        <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600">
          <Link href="/admin/winners/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Winner
          </Link>
        </Button>
      </div>

      <Card className="bg-stone-900/80 border-stone-800">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <Users className="w-5 h-5" />
            All Winners
          </CardTitle>
        </CardHeader>
        <CardContent>
          {winners && winners.length > 0 ? (
            <div className="space-y-3">
              {winners.map((winner) => (
                <div 
                  key={winner.id} 
                  className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-amber-100 font-medium">{winner.name}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-stone-400 text-sm">{winner.category}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-amber-900/30 text-amber-400">
                        {winner.year}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="text-stone-400 hover:text-amber-100">
                    <Link href={`/admin/winners/${winner.id}`}>
                      <Pencil className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-center py-8">No winners yet. Add your first winner!</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
