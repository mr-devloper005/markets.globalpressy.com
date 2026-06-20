import Link from 'next/link'
import { CalendarDays, ChevronRight, Filter, Sparkles } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts } from '@/lib/task-data'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import type { TaskKey } from '@/lib/site-config'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

function excerpt(text?: string | null, len = 170) {
  const value = (text || '').trim()
  if (!value) return 'Read the complete press release for full details.'
  return value.length > len ? value.slice(0, len - 3).trimEnd() + '...' : value
}

function getPostImage(post: any) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaImage = media.find((item: any) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const logo = typeof content.logo === 'string' ? content.logo : ''
  const imageArray = Array.isArray(content.images) ? content.images : []
  const contentImage = imageArray.find((item) => typeof item === 'string' && item) as string | undefined
  return mediaImage || contentImage || logo || '/placeholder.jpg'
}

function getCategory(post: any) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw = typeof content.category === 'string' ? content.category.trim() : ''
  if (!raw) return 'General'
  const normalized = normalizeCategory(raw)
  return CATEGORY_OPTIONS.find((item) => item.slug === normalized)?.name || raw
}

export async function TaskListPageOverride({ task, category }: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 36, { fresh: true })
  const normalizedCategory = category ? normalizeCategory(category) : 'all'

  const filteredPosts =
    normalizedCategory === 'all'
      ? posts
      : posts.filter((post) => {
          const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
          const raw = typeof content.category === 'string' ? content.category : ''
          return normalizeCategory(raw) === normalizedCategory
        })

  const featured = filteredPosts[0] || posts[0]
  const list = filteredPosts.length <= 3 ? filteredPosts : filteredPosts.slice(1, 13)
  const latest = filteredPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f8fd_0%,#ecf3fa_42%,#f8fbff_100%)] text-[#10253f]">
      <NavbarShell />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#c8daec] bg-[#0f4b86] text-white shadow-[0_26px_70px_rgba(8,43,77,0.25)]">
          <div className="absolute inset-0">
            <img src={featured ? getPostImage(featured) : '/placeholder.jpg'} alt={featured?.title || 'Press release'} className="h-full w-full object-cover opacity-45" />
            <div className="absolute inset-0 bg-[linear-gradient(125deg,rgba(6,32,63,0.95)_18%,rgba(12,70,124,0.78)_56%,rgba(13,72,128,0.42)_100%)]" />
          </div>
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            {/* <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4e8fb]"> */}
              {/* <Newspaper className="h-3.5 w-3.5" /> */}
            {/* </div> */}
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">Latest Press Releases</h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-[#d5e8fa]">
              Discover announcements, launches, partnerships, and official media statements in a cleaner, faster newsroom interface.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-[#2a84d8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a93e6]">
                Distribute Your News
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="inline-flex items-center gap-2 rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10">
                How It Works
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d4e2f0] bg-white p-4 shadow-[0_12px_30px_rgba(15,46,79,0.08)] sm:p-5">
          <form className="flex flex-wrap items-center gap-3" action="/press-release" method="get">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf3fd] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#2a5f92]">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </span>
            <label htmlFor="category-filter" className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5c7ea4]">
              Category
            </label>
            <select
              id="category-filter"
              name="category"
              defaultValue={normalizedCategory}
              className="h-10 min-w-[220px] rounded-lg border border-[#c7d8ea] bg-[#f7fbff] px-3 text-sm font-medium text-[#2a5f92] outline-none transition focus:border-[#1f6db8] focus:bg-white"
            >
              <option value="all">All Categories</option>
              {CATEGORY_OPTIONS.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-lg bg-[#1f6db8] px-4 text-sm font-semibold text-white transition hover:bg-[#2a7dca]"
            >
              Apply
            </button>
          </form>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            {list.map((post) => (
              <article key={post.id} className="rounded-2xl border border-[#d4e2f0] bg-white p-5 shadow-[0_12px_30px_rgba(15,46,79,0.06)] transition hover:shadow-[0_18px_44px_rgba(15,46,79,0.11)]">
                <div className="flex gap-4">
                  <img src={getPostImage(post)} alt={post.title} className="h-16 w-16 rounded-lg object-cover ring-1 ring-[#c7d8ea]" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5782b2]">{getCategory(post)}</p>
                    <Link href={`/press-release/${post.slug}`} className="mt-1 block text-2xl font-semibold leading-tight text-[#12406f] hover:text-[#1f6db8]">
                      {post.title}
                    </Link>
                    <p className="mt-2 text-sm leading-7 text-[#47617e]">{excerpt(post.summary)}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-xs text-[#68829d]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-2xl border border-[#d4e2f0] bg-white p-5 h-fit">
            <p className="inline-flex items-center gap-2 text-lg font-semibold text-[#2f955f]">
              <Sparkles className="h-4 w-4" />
              Latest
            </p>
            <div className="mt-4 space-y-3">
              {latest.map((post) => (
                <Link key={post.id} href={`/press-release/${post.slug}`} className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#f3f8ff]">
                  <img src={getPostImage(post)} alt={post.title} className="h-11 w-11 rounded-md object-cover" />
                  <p className="text-sm leading-6 text-[#234d78]">{excerpt(post.title, 78)}</p>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  )
}
