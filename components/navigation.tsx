"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/partner", label: "Partnership" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg" 
            : "bg-transparent"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="flex items-center justify-between h-14 lg:h-20 relative">
            {/* Desktop Navigation - Left */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    pathname === link.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Center Logo - Desktop */}
            <Link href="/" className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 z-10">
              <Image
                src="/images/logo-dark.png"
                alt="Munhumutapa Heritage Awards"
                width={180}
                height={72}
                className="object-contain"
                style={{ maxHeight: "52px", width: "auto", mixBlendMode: "screen" }}
                priority
              />
            </Link>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-glow">
                <Link href="/nominations">Nominate Now</Link>
              </Button>
            </div>

            {/* Mobile Logo */}
            <Link href="/" className="lg:hidden flex items-center" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/logo-dark.png"
                alt="Munhumutapa Heritage Awards"
                width={120}
                height={48}
                className="object-contain"
                style={{ maxHeight: "38px", width: "auto", mixBlendMode: "screen" }}
                priority
              />
            </Link>
            <div className="flex-1 lg:hidden" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-foreground z-50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center h-full gap-6"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "font-serif text-3xl font-bold transition-colors",
                      pathname === link.href
                        ? "text-primary"
                        : "text-foreground hover:text-primary"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="mt-8"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 h-14"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/nominations">Nominate Now</Link>
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
