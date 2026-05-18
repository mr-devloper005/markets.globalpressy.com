'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CalendarDays } from 'lucide-react'

type LatestPostItem = {
  id: string
  slug: string
  title: string
  summary?: string | null
  publishedAt?: string | null
  image: string
  category: string
}

function excerpt(text?: string | null, len = 180) {
  const value = (text || '').trim()
  if (!value) return 'Read the full story for complete details.'
  return value.length > len ? value.slice(0, len - 3).trimEnd() + '...' : value
}

export function LatestPostsLoadMore({ posts }: { posts: LatestPostItem[] }) {
  const [visibleCount, setVisibleCount] = useState(2)
  const visiblePosts = useMemo(() => posts.slice(0, visibleCount), [posts, visibleCount])
  const canLoadMore = visibleCount < posts.length

  return (
    <div className="space-y-4">
      {visiblePosts.map((post) => (
        <article key={post.id} className="rounded-2xl border border-[#d6e2ef] bg-white p-5 shadow-[0_10px_28px_rgba(10,32,59,0.06)]">
          <div className="flex gap-4">
            <img src={post.image} alt={post.title} className="h-16 w-16 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5782b2]">{post.category}</p>
              <Link href={`/press-release/${post.slug}`} className="mt-1 block text-2xl font-semibold leading-tight text-[#12406f] hover:text-[#1f5f9f]">
                {post.title}
              </Link>
              <p className="mt-2 text-sm leading-7 text-[#48617e]">{excerpt(post.summary)}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-xs text-[#6d839d]">
                <CalendarDays className="h-3.5 w-3.5" />
                {new Date(post.publishedAt || Date.now()).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </article>
      ))}

      {canLoadMore ? (
        <div className="pt-3">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + 2, posts.length))}
            className="inline-flex items-center rounded-md bg-[#1f5f9f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2a6fb4]"
          >
            Load more
          </button>
        </div>
      ) : null}
    </div>
  )
}
