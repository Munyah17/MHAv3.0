'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.push('/admin')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Image
              src="/images/logo-light.png"
              alt="Munhumutapa Heritage Awards"
              width={180}
              height={80}
              className="mx-auto mb-4"
            />
          </Link>
          <p className="text-amber-200/60 text-sm">Admin Portal</p>
        </div>
        
        <Card className="bg-stone-900/80 border-amber-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-100">Admin Login</CardTitle>
            <CardDescription className="text-amber-200/60">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-amber-100">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@munhumutapa.co.zw"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-stone-800 border-stone-700 text-amber-100 placeholder:text-stone-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-amber-100">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-stone-800 border-stone-700 text-amber-100"
                  />
                </div>
                {error && (
                  <p className="text-sm text-red-400 bg-red-900/20 p-2 rounded">{error}</p>
                )}
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        <p className="text-center mt-6 text-amber-200/40 text-sm">
          <Link href="/" className="hover:text-amber-400 transition-colors">
            Back to Website
          </Link>
        </p>
      </div>
    </div>
  )
}
