'use client'

import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Handshake, Eye, Mail, Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Partnership {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string
  partnership_type: string
  message: string
  status: string
  created_at: string
}

export default function AdminPartnershipsPage() {
  const [partnerships, setPartnerships] = useState<Partnership[]>([])
  const [selectedPartnership, setSelectedPartnership] = useState<Partnership | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchPartnerships = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('partnerships')
      .select('*')
      .order('created_at', { ascending: false })
    
    setPartnerships(data || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPartnerships()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    await supabase
      .from('partnerships')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
    
    fetchPartnerships()
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
        <h1 className="text-3xl font-bold text-amber-100">Partnerships</h1>
        <p className="text-stone-400 mt-1">Manage sponsorship and partnership inquiries</p>
      </div>

      <Card className="bg-stone-900/80 border-stone-800">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center gap-2">
            <Handshake className="w-5 h-5" />
            All Inquiries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-stone-500 text-center py-8">Loading...</p>
          ) : partnerships.length > 0 ? (
            <div className="space-y-3">
              {partnerships.map((partnership) => (
                <div 
                  key={partnership.id} 
                  className="flex items-center justify-between p-4 bg-stone-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-amber-100 font-medium">{partnership.company_name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-1">
                      <span className="text-stone-400 text-sm">{partnership.partnership_type}</span>
                      <span className="text-stone-500 text-sm">{partnership.contact_name}</span>
                      <span className="text-stone-600 text-xs">{formatDate(partnership.created_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select 
                      value={partnership.status} 
                      onValueChange={(value) => updateStatus(partnership.id, value)}
                    >
                      <SelectTrigger className="w-32 bg-stone-800 border-stone-700 text-amber-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-stone-800 border-stone-700">
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="declined">Declined</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-stone-400 hover:text-amber-100"
                      onClick={() => setSelectedPartnership(partnership)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-stone-500 text-center py-8">No partnership inquiries yet</p>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedPartnership} onOpenChange={() => setSelectedPartnership(null)}>
        <DialogContent className="bg-stone-900 border-stone-800 text-amber-100 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-amber-100">Partnership Inquiry</DialogTitle>
          </DialogHeader>
          {selectedPartnership && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-stone-400 text-sm">Company</p>
                  <p className="text-amber-100 font-medium text-lg">{selectedPartnership.company_name}</p>
                </div>
                <div>
                  <p className="text-stone-400 text-sm">Partnership Type</p>
                  <p className="text-amber-100">{selectedPartnership.partnership_type}</p>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-4">
                <p className="text-stone-400 text-sm mb-2">Contact Person</p>
                <p className="text-amber-100 font-medium">{selectedPartnership.contact_name}</p>
                <div className="flex gap-4 mt-2">
                  <a 
                    href={`mailto:${selectedPartnership.email}`}
                    className="flex items-center gap-2 text-amber-400 hover:text-amber-300"
                  >
                    <Mail className="w-4 h-4" /> {selectedPartnership.email}
                  </a>
                  {selectedPartnership.phone && (
                    <a 
                      href={`tel:${selectedPartnership.phone}`}
                      className="flex items-center gap-2 text-amber-400 hover:text-amber-300"
                    >
                      <Phone className="w-4 h-4" /> {selectedPartnership.phone}
                    </a>
                  )}
                </div>
              </div>
              
              {selectedPartnership.message && (
                <div className="border-t border-stone-800 pt-4">
                  <p className="text-stone-400 text-sm">Message</p>
                  <p className="text-amber-100 mt-1 bg-stone-800 p-3 rounded">{selectedPartnership.message}</p>
                </div>
              )}

              <div className="flex gap-2 pt-4">
                <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700">
                  <a href={`mailto:${selectedPartnership.email}`}>
                    <Mail className="w-4 h-4 mr-2" /> Send Email
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
