"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  explore: [
    { href: "/about", label: "About Us" },
    { href: "/awards", label: "Award Categories" },
    { href: "/events", label: "Events" },
    { href: "/news", label: "News & Stories" },
  ],
  engage: [
    { href: "/nominations", label: "Nominate" },
    { href: "/partner", label: "Partnership" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
}

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src="/images/logo-dark.png"
                alt="Munhumutapa Heritage Awards"
                width={200}
                height={80}
                className="object-contain"
                style={{ maxHeight: "70px", width: "auto", mixBlendMode: "screen" }}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              A premier cultural institution dedicated to the preservation and celebration of Zimbabwe&apos;s heritage through the Munhumutapa Heritage Awards. Building our nation brick by brick.
            </p>
            <p className="font-serif italic text-primary text-sm">
              Our Heritage, Our Future.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links - Explore */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links - Engage */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Engage</h3>
            <ul className="space-y-2">
              {footerLinks.engage.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center group"
                  >
                    {link.label}
                    <ArrowRight className="w-3 h-3 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  30 Audley Street, Harare, Zimbabwe
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:+263773257449" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  +263 773 257 449
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:info@mha.co.zw" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  info@mha.co.zw
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates on events, winners, and cultural stories.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-muted border-border"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-4">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-primary text-sm font-medium mb-2">
                Zimbabwe is Open for Business
              </p>
              <p className="text-muted-foreground text-xs">
                Partner with us to support cultural preservation and economic growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-xs text-center sm:text-left">
              &copy; {new Date().getFullYear()} Mutapa Heritage Awards. All rights reserved.
            </p>
            <p className="text-muted-foreground text-xs text-center sm:text-right">
              Developed by <a href="#" className="text-primary hover:underline">Global Space Web</a> +263773 909 307
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
