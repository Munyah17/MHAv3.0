'use client'

import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Trophy, 
  Users, 
  Handshake,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/events', label: 'Events', icon: Calendar },
  { href: '/admin/posts', label: 'News & Blog', icon: FileText },
  { href: '/admin/nominations', label: 'Nominations', icon: Trophy },
  { href: '/admin/winners', label: 'Winners', icon: Users },
  { href: '/admin/partnerships', label: 'Partnerships', icon: Handshake },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-stone-800 rounded-lg text-amber-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-stone-900 border-r border-stone-800
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-stone-800">
            <Link href="/admin" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/logo-light.png"
                alt="Munhumutapa Heritage Awards"
                width={150}
                height={60}
                className="mx-auto"
              />
            </Link>
            <p className="text-center text-amber-200/50 text-xs mt-2">Admin Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                    ${isActive 
                      ? 'bg-amber-600/20 text-amber-100 border-l-2 border-amber-500' 
                      : 'text-stone-400 hover:text-amber-100 hover:bg-stone-800'
                    }
                  `}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User info & Logout */}
          <div className="p-4 border-t border-stone-800">
            <div className="mb-4 px-4">
              <p className="text-amber-100 text-sm font-medium truncate">{user.email}</p>
              <p className="text-stone-500 text-xs">Administrator</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-stone-400 hover:text-red-400 hover:bg-red-900/20"
            >
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
