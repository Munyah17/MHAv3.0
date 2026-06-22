import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Settings, Database, Shield } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-amber-100">Settings</h1>
        <p className="text-stone-400 mt-1">Manage your admin preferences</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              General Settings
            </CardTitle>
            <CardDescription className="text-stone-400">
              Configure general application settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-stone-500">Settings coming soon...</p>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Database
            </CardTitle>
            <CardDescription className="text-stone-400">
              Database connection status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-green-400">Connected to Supabase</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-stone-900/80 border-stone-800">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription className="text-stone-400">
              Authentication and access control
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-stone-400 text-sm">
              This admin panel is protected with Supabase Auth. Only authenticated users can access it.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
