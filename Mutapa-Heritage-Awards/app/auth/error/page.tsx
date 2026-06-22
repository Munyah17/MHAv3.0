import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-amber-100 mb-4">Authentication Error</h1>
        <p className="text-amber-200/60 mb-8">
          There was an error during authentication. Please try again.
        </p>
        <Button asChild className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600">
          <Link href="/auth/login">Try Again</Link>
        </Button>
      </div>
    </div>
  )
}
