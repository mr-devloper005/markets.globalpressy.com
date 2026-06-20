import Link from "next/link";
import { BellRing, BriefcaseBusiness } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f8fd_0%,#ecf3fa_44%,#f8fbff_100%)] text-[#10253f]">
      <NavbarShell />

      <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-[#c8daec] bg-white p-8 shadow-[0_20px_55px_rgba(8,43,77,0.12)] sm:p-10">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1f6db8] text-white">
            <BriefcaseBusiness className="h-6 w-6" />
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[#123f6c]">Careers at {SITE_CONFIG.name}</h1>
          <p className="mt-4 text-base leading-8 text-[#48617e]">
            We are not hiring for open positions at the moment.
          </p>
          <p className="mt-2 text-base leading-8 text-[#48617e]">
            When new opportunities are available, we will notify interested candidates.
          </p>

          <div className="mt-7 rounded-xl border border-[#d6e2ef] bg-[#f4f9ff] p-4 text-sm text-[#2b5a88]">
            <p className="inline-flex items-center gap-2 font-semibold">
              <BellRing className="h-4 w-4" />
              Want to be notified?
            </p>
            <p className="mt-2">
              Share your interest with us and we will contact you when relevant openings are posted.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-[#1f6db8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a7dca]"
            >
              Contact us for details
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border border-[#c9d8e7] bg-white px-5 py-2.5 text-sm font-semibold text-[#1f5f9f] transition hover:bg-[#f2f8ff]"
            >
              Back to homepage
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
