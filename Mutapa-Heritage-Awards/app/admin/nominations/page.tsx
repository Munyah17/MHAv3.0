'use client'

import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Eye, Check, X as XIcon, Award } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Nomination {
  id: string
  nominee_name: string
  nominee_email: string
  nominee_phone: string
  category: string
  nominator_name: string
  nominator_email: string
  reason: string
  supporting_evidence: string
  status: string
  created_at: string
}

export default function AdminNominationsPage() {
  const [nominations, setNominations] = useState<Nomination[]>([])
  const [selectedNomination, setSelectedNomination] = useState<Nomination | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchNominations = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('nominations')
      .select('*')
      .order('created_at', { ascending: false })
    
    setNominations(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchNominations()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase
      .from('nominations')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    fetchNominations()
    setSelectedNomination(null)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-ZW', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-100">Nominations</h1>
        <p className="text-stone-400 mt-1">Review and manage award nominations</p>
      </div>

      <Card className="bg-stone-900/80 border-stone-800">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            All Nominations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-stone-500 text-center py-8">Loading...</p>
          ) : nominations.length > 0 ? (
            <div className="space-y-3">
              {nominations.map((nomination) => (
                <div 
                  key={nomination.id} 
                  className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-amber-100 font-medium">{nomination.nominee_name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-stone-400 text-sm">{nomination.category}</span>
                      <span className="text-stone-500 text-sm">by {nomination.nominator_name}</span>
                      <span className="text-stone-600 text-xs">{formatDate(nomination.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`
                      px-2 py-1 rounded text-xs font-medium
                      ${nomination.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' : ''}
                      ${nomination.status === 'approved' ? 'bg-green-900/30 text-green-400' : ''}
                      ${nomination.status === 'rejected' ? 'bg-red-900/30 text-red-400' : ''}
                      ${nomination.status === 'winner' ? 'bg-amber-900/30 text-amber-400' : ''}
                    `}>
                      {nomination.status}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-stone-400 hover:text-amber-100"
                      onClick={() => setSelectedNomination(nomination)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-center py-8">No nominations yet</p>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedNomination} onOpenChange={() => setSelectedNomination(null)}>
        <DialogContent className="bg-stone-900 border-stone-800 text-amber-100 max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-amber-100">Nomination Details</DialogTitle>
          </DialogHeader>
          {selectedNomination && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-stone-400 text-sm">Nominee</p>
                  <p className="text-amber-100 font-medium">{selectedNomination.nominee_name}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-sm">Category</p>
                  <p className="text-amber-100">{selectedNomination.category}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-sm">Email</p>
                  <p className="text-amber-100">{selectedNomination.nominee_email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-sm">Phone</p>
                  <p className="text-amber-100">{selectedNomination.nominee_phone || 'N/A'}</p>
                </div>
              </div>
              
              <div>
                <p className="text-stone-400 text-sm">Reason for Nomination</p>
                <p className="text-amber-100 mt-1 bg-stone-800 p-3 rounded">{selectedNomination.reason}</p>
              </div>
              
              {selectedNomination.supporting_evidence && (
                <div>
                  <p className="text-stone-400 text-sm">Supporting Evidence</p>
                  <p className="text-amber-100 mt-1 bg-stone-800 p-3 rounded">{selectedNomination.supporting_evidence}</p>
                </div>
              )}

              <div className="border-t border-stone-800 pt-4">
                <p className="text-stone-400 text-sm mb-2">Nominated by</p>
                <p className="text-amber-100">{selectedNomination.nominator_name} ({selectedNomination.nominator_email})</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => updateStatus(selectedNomination.id, 'approved')}
                  className="bg-green-600 hover:bg-green-500"
                >
                  <Check className="w-4 h-4 mr-2" /> Approve
                </Button>
                <Button 
                  onClick={() => updateStatus(selectedNomination.id, 'rejected')}
                  variant="destructive"
                >
                  <XIcon className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button 
                  onClick={() => updateStatus(selectedNomination.id, 'winner')}
                  className="bg-gradient-to-r from-amber-600 to-amber-700"
                >
                  <Award className="w-4 h-4 mr-2" /> Mark as Winner
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
