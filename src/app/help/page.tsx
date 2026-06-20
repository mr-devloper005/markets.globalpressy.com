import Link from "next/link";
import { CircleHelp, FileText, Megaphone, ShieldCheck, Timer } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { SITE_CONFIG } from "@/lib/site-config";

const helpTopics = [
  {
    title: "Getting Started",
    description: "Create your account, complete your organization profile, and start your first release workflow.",
    icon: FileText,
  },
  {
    title: "Distribution Workflow",
    description: "Draft, review, and publish announcements with a structured flow built for media visibility.",
    icon: Megaphone,
  },
  {
    title: "Quality & Compliance",
    description: "Follow publishing quality practices for cleaner headlines, credible summaries, and trusted updates.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    q: "How do I publish my first press release?",
    a: "Sign in, prepare your headline and summary, add category details, and submit your release through the publishing flow.",
  },
  {
    q: "Can I update a release after it is published?",
    a: "Yes. You can update your release content from your workspace and republish the latest approved version.",
  },
  {
    q: "How long does distribution usually take?",
    a: "Turnaround depends on content readiness, but most standard releases are processed quickly once final details are submitted.",
  },
  {
    q: "Where can I get support for account or campaign issues?",
    a: "For account, publishing, or campaign support, contact our team directly and we will guide you through the next steps.",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f8fd_0%,#ecf3fa_44%,#f8fbff_100%)] text-[#10253f]">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#c8daec] bg-[#0f4b86] text-white shadow-[0_26px_70px_rgba(8,43,77,0.25)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_52%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4e8fb]">
              <CircleHelp className="h-3.5 w-3.5" />
              Help Center
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              Support For Your Distribution Workflow
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-[#d5e8fa]">
              Find practical guidance for publishing, campaign handling, and release-quality best practices on {SITE_CONFIG.name}.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-md bg-[#2a84d8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a93e6]"
              >
                Contact Support
              </Link>
              <Link
                href="/press-release"
                className="inline-flex items-center rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Browse Releases
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {helpTopics.map((topic) => (
            <article key={topic.title} className="rounded-2xl border border-[#d4e2f0] bg-white p-6 shadow-[0_10px_28px_rgba(10,32,59,0.06)]">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#1f5f9f] text-white">
                <topic.icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-[#123f6c]">{topic.title}</h2>
              <p className="mt-2 text-sm leading-7 text-[#48617e]">{topic.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-[#d4e2f0] bg-white p-6 shadow-[0_10px_28px_rgba(10,32,59,0.06)] sm:p-7">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#123f6c]">Frequently Asked Questions</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <article key={faq.q} className="rounded-xl border border-[#e2ecf6] bg-[#f8fbff] p-4">
                <p className="text-base font-semibold text-[#1f5f9f]">{faq.q}</p>
                <p className="mt-2 text-sm leading-7 text-[#48617e]">{faq.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d4e2f0] bg-white p-6 shadow-[0_10px_28px_rgba(10,32,59,0.06)] sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-[#5f83a8]">
                <Timer className="h-4 w-4" />
                Need quick support?
              </p>
              <p className="mt-2 text-sm leading-7 text-[#48617e]">
                If you need help with release publishing or account setup, our support team can assist you directly.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex h-11 items-center rounded-md bg-[#1f6db8] px-5 text-sm font-semibold text-white transition hover:bg-[#2a7dca]"
            >
              Go to Contact Page
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
