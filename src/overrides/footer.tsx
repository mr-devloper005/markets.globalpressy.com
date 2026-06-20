import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'

export const FOOTER_OVERRIDE_ENABLED = true

export function FooterOverride() {
  return (
    <footer className="bg-[#0f3a63] text-[#d3e6f9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-2xl font-semibold text-white">{SITE_CONFIG.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-[#aac9e6]">{SITE_CONFIG.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Company</p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/about" className="block hover:text-white">About Us</Link>
            <Link href="/contact" className="block hover:text-white">Contact Us</Link>
            <Link href="/careers" className="block hover:text-white">Careers</Link>
            <Link href="/press-release" className="block hover:text-white">Latest Releases</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Legal</p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/privacy" className="block hover:text-white">Privacy</Link>
            <Link href="/terms" className="block hover:text-white">Terms</Link>
            <Link href="/cookies" className="block hover:text-white">Cookies</Link>
            <Link href="/licenses" className="block hover:text-white">Licenses</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-white">Account & Support</p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="/login" className="block hover:text-white">Login</Link>
            <Link href="/register" className="block hover:text-white">Sign Up</Link>
            <Link href="/search" className="block hover:text-white">Search</Link>
            <Link href="/help" className="block hover:text-white">Help</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-[#2a5a86] bg-[#0b2f51] px-4 py-4 text-center text-sm text-[#aac9e6] sm:px-6 lg:px-8">
        &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
