import Link from "next/link";
import { Building2, Globe2, Megaphone, ShieldCheck, Users } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const stats = [
  { label: "Journalists reached", value: "5,000+" },
  { label: "Publications network", value: "3,000+" },
  { label: "Industry categories", value: "100+" },
];

const principles = [
  {
    title: "Clarity First",
    description:
      "Every page is designed for high readability and fast scanning, so announcements are easy to consume.",
    icon: ShieldCheck,
  },
  {
    title: "Distribution Focus",
    description:
      "We optimize for visibility and media reach, helping organizations publish updates with stronger impact.",
    icon: Megaphone,
  },
  {
    title: "Trust And Structure",
    description:
      "Consistent formatting, category organization, and clean metadata create a reliable newsroom experience.",
    icon: Building2,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f8fd_0%,#ecf3fa_44%,#f8fbff_100%)] text-[#10253f]">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#c8daec] bg-[#0f4b86] text-white shadow-[0_26px_70px_rgba(8,43,77,0.25)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_52%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4e8fb]">
              <Globe2 className="h-3.5 w-3.5" />
              About {SITE_CONFIG.name}
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              Built For Modern Press Releases And Reliable News Distribution
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-[#d5e8fa]">
              {SITE_CONFIG.name} is a dedicated media-distribution platform for organizations that need
              clean publishing workflows, stronger media visibility, and a professional newsroom presence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/press-release"
                className="inline-flex items-center rounded-md bg-[#2a84d8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a93e6]"
              >
                Explore Latest Releases
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-2xl border border-[#d4e2f0] bg-white p-5 shadow-[0_12px_30px_rgba(15,46,79,0.08)] sm:grid-cols-3">
          {stats.map((item) => (
            <article key={item.label} className="rounded-xl border border-[#e2ecf6] bg-[#f8fbff] p-5 text-center">
              <p className="text-4xl font-bold text-[#1f5f9f]">{item.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5f7d9f]">
                {item.label}
              </p>
            </article>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-[#d4e2f0] bg-white p-6 shadow-[0_12px_30px_rgba(15,46,79,0.06)] sm:p-7">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#113c67]">Our Mission</h2>
            <p className="mt-4 text-sm leading-8 text-[#47617e]">
              We help brands, institutions, and public organizations communicate important updates through
              a platform that balances editorial clarity with distribution strength.
            </p>
            <p className="mt-4 text-sm leading-8 text-[#47617e]">
              From product launches and business announcements to thought leadership and industry commentary,
              our goal is to make every release easier to publish, easier to discover, and easier to trust.
            </p>
          </article>

          <article className="rounded-2xl border border-[#d4e2f0] bg-white p-6 shadow-[0_12px_30px_rgba(15,46,79,0.06)] sm:p-7">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#113c67]">Who We Serve</h2>
            <div className="mt-5 space-y-3">
              {[
                "Corporate communication and PR teams",
                "Startups and growth-stage businesses",
                "Media agencies and investor relations groups",
                "Institutions and policy communication teams",
              ].map((item) => (
                <div key={item} className="inline-flex w-full items-center gap-3 rounded-xl border border-[#e2ecf6] bg-[#f8fbff] px-4 py-3 text-sm text-[#2a4f76]">
                  <Users className="h-4 w-4 text-[#2a84d8]" />
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#d4e2f0] bg-white p-6 shadow-[0_12px_30px_rgba(15,46,79,0.06)] transition hover:shadow-[0_18px_44px_rgba(15,46,79,0.12)]"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1f5f9f] text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-[#123f6c]">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[#48617e]">{item.description}</p>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
