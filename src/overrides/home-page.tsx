import Link from 'next/link'
import { ArrowRight, ChevronRight, Globe, Megaphone, Newspaper, Radio, TrendingUp, Users } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LatestPostsLoadMore } from '@/components/home/latest-posts-load-more'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { SitePost } from '@/lib/site-connector'

export const HOME_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null) {
  const value = (text || '').trim()
  if (!value) return 'Read the full story for the complete update.'
  return value.length > 180 ? value.slice(0, 177).trimEnd() + '...' : value
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaImage = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const imageArray = Array.isArray(content.images) ? content.images : []
  const firstContentImage = imageArray.find((item) => typeof item === 'string' && item) as string | undefined
  return mediaImage || firstContentImage || logo || '/placeholder.jpg'
}

function getCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = typeof content.category === 'string' ? content.category.trim() : ''
  if (!raw) return 'General'
  const normalized = normalizeCategory(raw)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || raw
}

export async function HomePageOverride() {
  const posts = await fetchTaskPosts('mediaDistribution', 24, { fresh: true })
  const featured = posts[0]
  const benefits = [
    { title: 'Multi-Channel Reach', text: 'Distribute each release across digital, print, and high-authority media networks.', icon: Globe },
    { title: 'Rapid Publishing', text: 'Move from approved draft to live distribution in minutes.', icon: TrendingUp },
    { title: 'Precision Targeting', text: 'Send announcements by category and audience relevance.', icon: Users },
    { title: 'PR-Ready Workflow', text: 'Run repeatable campaigns through a clean distribution pipeline.', icon: Megaphone },
  ]
  const network = [
    { title: 'Business Media', text: 'Finance, startup, and industry publication partners', icon: Newspaper },
    { title: 'Digital Newsrooms', text: 'High-visibility online media and editorial channels', icon: Globe },
    { title: 'Social Amplification', text: 'Distribution-ready formats for broader social engagement', icon: Radio },
    { title: 'Wire-Style Coverage', text: 'Agency-oriented patterns for high-volume releases', icon: Megaphone },
  ]
  const latest = posts.slice(0, 15)
  const trending = posts.slice(7, 11)
  const testimonials = posts.slice(11, 14)
  const topicFields = [
    { topic: 'Funding Announcements', industry: 'Startup & Venture', region: 'India & APAC', releaseVolume: 'High' },
    { topic: 'Partnership Updates', industry: 'Enterprise SaaS', region: 'Global', releaseVolume: 'Medium' },
    { topic: 'Product Launches', industry: 'Consumer Tech', region: 'North America', releaseVolume: 'High' },
    { topic: 'Leadership Moves', industry: 'Financial Services', region: 'EMEA', releaseVolume: 'Medium' },
  ]
  const successFields = [
    { client: 'Enterprise Brand A', objective: 'Launch announcement visibility', pickup: 'Top-tier + niche media', turnaround: 'Same day', result: 'Multi-region coverage' },
    { client: 'Growth Startup B', objective: 'Funding round narrative', pickup: 'Business + startup press', turnaround: '< 24 hours', result: 'Investor interest uplift' },
    { client: 'Consumer Company C', objective: 'National product release', pickup: 'Digital + regional channels', turnaround: '24-48 hours', result: 'Strong launch awareness' },
  ]

  return (
    <div className="min-h-screen bg-[#eef2f5] text-[#10253f]">
      <NavbarShell />
      <main>
        <section className="relative isolate overflow-hidden bg-[#0f4b86] text-white">
          <div className="absolute inset-0">
            <img src={getPostImage(featured)} alt={featured?.title || 'Hero'} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(8,34,66,0.92)_15%,rgba(14,74,131,0.74)_52%,rgba(14,74,131,0.32)_100%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9ec9f1]">Distribution Platform</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Distribute Press Releases Faster And Reach The Right Media Instantly
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[#d5e8fa]">
              Publish product launches, company updates, funding news, and leadership announcements through a modern distribution workflow.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-[#1f78d1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#2f8ae5]">
                Start Distribution
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/press-release" className="inline-flex items-center gap-2 rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View Newsroom
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="text-center text-4xl font-semibold tracking-[-0.03em] text-[#2d6aab]">Why Teams Choose Our Distribution Network</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((item, idx) => (
              <article
                key={item.title}
                className="group rounded-2xl border border-[#d5e1ee] bg-white p-6 shadow-[0_20px_50px_rgba(15,46,79,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,46,79,0.16)]"
                style={{ animation: `factory-fade-up .45s ease ${idx * 0.08}s both` }}
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1e61a8] text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[#133a65]">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-[#4d6582]">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-[#f8fbff] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-semibold tracking-[-0.03em] text-[#3f9a63]">Built For End-To-End News Distribution</h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base text-[#48617e]">
              {SITE_CONFIG.name} helps communication teams execute campaigns from publishing to pickup with better consistency.
            </p>
            <div className="mt-10 grid overflow-hidden rounded-2xl border border-[#cadaec] sm:grid-cols-2 lg:grid-cols-4">
              {network.map((item, idx) => (
                <article key={item.title} className={`${idx % 2 === 0 ? 'bg-[#1f5f9f] text-white' : 'bg-[#e8f0f8] text-[#123860]'} p-8`}>
                  <item.icon className="h-7 w-7" />
                  <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                  <p className={`mt-3 text-sm leading-7 ${idx % 2 === 0 ? 'text-[#d6e8fa]' : 'text-[#3f5f82]'}`}>{item.text}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-5 rounded-2xl border border-[#cadaec] bg-white p-6 text-center sm:grid-cols-3">
              <div><p className="text-4xl font-bold text-[#1f5f9f]">5,000+</p><p className="mt-1 text-sm uppercase tracking-[0.15em] text-[#587191]">Media Contacts</p></div>
              <div><p className="text-4xl font-bold text-[#1f5f9f]">3,000+</p><p className="mt-1 text-sm uppercase tracking-[0.15em] text-[#587191]">Distribution Endpoints</p></div>
              <div><p className="text-4xl font-bold text-[#1f5f9f]">100+</p><p className="mt-1 text-sm uppercase tracking-[0.15em] text-[#587191]">Coverage Verticals</p></div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-[#3f9a63]">Latest Distributed Releases</h2>
            <Link href="/press-release" className="inline-flex items-center gap-2 rounded-md bg-[#1f5f9f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2a6fb4]">
              See all releases
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6">
            <LatestPostsLoadMore
              posts={latest.map((post) => ({
                id: String(post.id),
                slug: post.slug,
                title: post.title,
                summary: post.summary || '',
                publishedAt: post.publishedAt || '',
                image: getPostImage(post),
                category: getCategory(post),
              }))}
            />
          </div>
        </section>

        <section className="bg-[#f2f7fc] py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-semibold tracking-[-0.03em] text-[#3f9a63]">Trending Distribution Topics</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trending.map((post) => (
                <Link key={post.id} href={`/press-release/${post.slug}`} className="group overflow-hidden rounded-2xl border border-[#d6e2ef] bg-white shadow-[0_12px_30px_rgba(15,46,79,0.08)]">
                  <img src={getPostImage(post)} alt={post.title} className="h-44 w-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6383a8]">{getCategory(post)}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#133b66]">{excerpt(post.title)}</h3>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {topicFields.map((item) => (
                <article key={item.topic} className="rounded-xl border border-[#d6e2ef] bg-white p-4 shadow-[0_8px_24px_rgba(10,32,59,0.06)]">
                  <p className="text-lg font-semibold text-[#123f6c]">{item.topic}</p>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="rounded-md bg-[#f4f9ff] px-3 py-2"><span className="font-semibold text-[#2a5f92]">Industry:</span> {item.industry}</div>
                    <div className="rounded-md bg-[#f4f9ff] px-3 py-2"><span className="font-semibold text-[#2a5f92]">Region:</span> {item.region}</div>
                    <div className="rounded-md bg-[#f4f9ff] px-3 py-2 col-span-2"><span className="font-semibold text-[#2a5f92]">Release Volume:</span> {item.releaseVolume}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1d5b98] py-16 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.18),transparent_70%)]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-semibold tracking-[-0.03em]">Distribution Success Stories</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((post) => (
                <article key={post.id} className="rounded-2xl border border-white/25 bg-white/10 p-6 backdrop-blur-sm">
                  <img src={getPostImage(post)} alt={post.title} className="h-24 w-24 rounded-full border-4 border-white/40 object-cover" />
                  <h3 className="mt-4 text-2xl font-semibold">{excerpt(post.title)}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#d4e8fb]">{excerpt(post.summary)}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {successFields.map((item) => (
                <article key={item.client} className="rounded-xl border border-white/25 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-lg font-semibold">{item.client}</p>
                  <div className="mt-3 space-y-2 text-sm text-[#d4e8fb]">
                    <p><span className="font-semibold text-white">Objective:</span> {item.objective}</p>
                    <p><span className="font-semibold text-white">Pickup:</span> {item.pickup}</p>
                    <p><span className="font-semibold text-white">Turnaround:</span> {item.turnaround}</p>
                    <p><span className="font-semibold text-white">Result:</span> {item.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
