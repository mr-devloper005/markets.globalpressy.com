 'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { useAuth } from '@/lib/auth-context'

export const NAVBAR_OVERRIDE_ENABLED = true

const utilityLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Help', href: '/help' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Search', href: '/search' },
  // { label: 'Login', href: '/login' },
  // { label: 'Sign Up', href: '/register' },
]

export function NavbarOverride() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#b8cce0] bg-white/96 text-[#123760] backdrop-blur">
      <div className="bg-[#16558f] text-[#d5eaff]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-end gap-x-5 gap-y-1 px-4 py-2 text-[12px] font-semibold sm:px-6 lg:px-8">
          {utilityLinks.map((item) => (
            <Link key={item.label} href={item.href} className="transition hover:text-white">{item.label}</Link>
          ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <img src="/favicon.png?v=20260401" alt={`${SITE_CONFIG.name} logo`} className="h-12 w-12 rounded-xl border border-[#c9d8e7] bg-white p-1 object-contain" />
          <div>
            <p className="text-3xl font-bold tracking-[-0.03em] text-[#114273]">{SITE_CONFIG.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#6a86a3]">{SITE_CONFIG.tagline}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center rounded-lg bg-[#1f6db8] px-5 text-sm font-semibold text-white transition hover:bg-[#2a7dca]"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="inline-flex h-11 items-center rounded-lg border border-[#c9d8e7] bg-white px-5 text-sm font-semibold text-[#1f5f9f] transition hover:bg-[#f2f8ff]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-flex h-11 items-center rounded-lg bg-[#1f6db8] px-5 text-sm font-semibold text-white transition hover:bg-[#2a7dca]"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="border-t border-[#d7e3ef] bg-[#f4f9ff]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 text-sm font-semibold uppercase tracking-[0.07em] sm:px-6 lg:px-8">
          <Link href="/" className="text-[#1f6db8]">Home</Link>
          <Link href="/press-release" className="text-[#335d86] transition hover:text-[#1f6db8]">Latest News</Link>
          <Link href="/about" className="text-[#335d86] transition hover:text-[#1f6db8]">How It Works</Link>
          <Link href="/contact" className="text-[#335d86] transition hover:text-[#1f6db8]">Contact</Link>
        </div>
      </div>
    </header>
  )
}
