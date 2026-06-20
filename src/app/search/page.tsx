import Link from "next/link";
import { CalendarDays, ChevronRight, Search } from "lucide-react";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { fetchSiteFeed } from "@/lib/site-connector";
import { buildPostUrl, getPostTaskKey } from "@/lib/task-data";
import { getMockPostsForTask } from "@/lib/mock-posts";
import { SITE_CONFIG } from "@/lib/site-config";

export const revalidate = 3;

const matchText = (value: string, query: string) => value.toLowerCase().includes(query);
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, " ");
const compactText = (value: unknown) => {
  if (typeof value !== "string") return "";
  return stripHtml(value).replace(/\s+/g, " ").trim().toLowerCase();
};

const excerpt = (text?: string | null, len = 170) => {
  const value = (text || "").trim();
  if (!value) return "Open this result to view the full published content.";
  return value.length > len ? value.slice(0, len - 3).trimEnd() + "..." : value;
};

const getPostImage = (post: any) => {
  const media = Array.isArray(post?.media) ? post.media : [];
  const mediaImage = media.find((item: any) => typeof item?.url === "string" && item.url)?.url;
  const content = post?.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};
  const logo = typeof content.logo === "string" ? content.logo : "";
  const imageArray = Array.isArray(content.images) ? content.images : [];
  const contentImage = imageArray.find((item) => typeof item === "string" && item) as string | undefined;
  return mediaImage || contentImage || logo || "/placeholder.jpg";
};

const getCategory = (post: any) => {
  const content = post?.content && typeof post.content === "object" ? (post.content as Record<string, unknown>) : {};
  const raw = typeof content.category === "string" ? content.category.trim() : "";
  return raw || "General";
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }>;
}) {
  const resolved = (await searchParams) || {};
  const query = (resolved.q || "").trim();
  const normalized = query.toLowerCase();
  const category = (resolved.category || "").trim().toLowerCase();
  const task = (resolved.task || "").trim().toLowerCase();
  const useMaster = resolved.master !== "0";

  const feed = await fetchSiteFeed(
    useMaster ? 1000 : 300,
    useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined
  );

  const posts =
    feed?.posts?.length
      ? feed.posts
      : useMaster
        ? []
        : SITE_CONFIG.tasks.flatMap((item) => getMockPostsForTask(item.key));

  const filtered = posts.filter((post) => {
    const content = post.content && typeof post.content === "object" ? post.content : {};
    const typeText = compactText((content as any).type);
    if (typeText === "comment") return false;
    const description = compactText((content as any).description);
    const body = compactText((content as any).body);
    const excerptField = compactText((content as any).excerpt);
    const categoryText = compactText((content as any).category);
    const tags = Array.isArray(post.tags) ? post.tags.join(" ") : "";
    const tagsText = compactText(tags);
    const derivedCategory = categoryText || tagsText;
    if (category && !derivedCategory.includes(category)) return false;
    if (task && typeText && typeText !== task) return false;
    if (!normalized.length) return true;
    return (
      matchText(compactText(post.title || ""), normalized) ||
      matchText(compactText(post.summary || ""), normalized) ||
      matchText(description, normalized) ||
      matchText(body, normalized) ||
      matchText(excerptField, normalized) ||
      matchText(tagsText, normalized)
    );
  });

  const results = normalized.length > 0 ? filtered : filtered.slice(0, 24);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f8fd_0%,#ecf3fa_42%,#f8fbff_100%)] text-[#10253f]">
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-[#c8daec] bg-[#0f4b86] text-white shadow-[0_26px_70px_rgba(8,43,77,0.25)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_55%)]" />
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9ec9f1]">Content Search</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-[-0.03em] sm:text-5xl">
              Search Across Published Distribution Content
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-8 text-[#d5e8fa]">
              Find releases, announcements, and category-specific updates quickly through a unified search feed.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d4e2f0] bg-white p-4 shadow-[0_12px_30px_rgba(15,46,79,0.08)] sm:p-5">
          <form action="/search" className="flex flex-wrap items-center gap-3">
            <input type="hidden" name="master" value="1" />
            {category ? <input type="hidden" name="category" value={category} /> : null}
            {task ? <input type="hidden" name="task" value={task} /> : null}
            <div className="relative min-w-[260px] flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6d839d]" />
              <input
                name="q"
                defaultValue={query}
                placeholder="Search newsroom updates..."
                className="h-11 w-full rounded-lg border border-[#c9d8e8] bg-[#f7fbff] pl-9 pr-3 text-sm text-[#234d78] outline-none focus:border-[#1f6db8] focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-11 items-center rounded-lg bg-[#1f6db8] px-5 text-sm font-semibold text-white transition hover:bg-[#2a7dca]"
            >
              Search
            </button>
          </form>
        </section>

        <section className="mt-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[#3f9a63]">
              {query ? `Results for "${query}"` : "Latest Search Results"}
            </h2>
            <Link href="/press-release" className="inline-flex items-center gap-2 rounded-md bg-[#1f5f9f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2a6fb4]">
              View all releases
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="space-y-4">
              {results.map((post) => {
                const taskKey = getPostTaskKey(post);
                const href = taskKey ? buildPostUrl(taskKey, post.slug) : `/press-release/${post.slug}`;
                return (
                  <article key={post.id} className="rounded-2xl border border-[#d6e2ef] bg-white p-5 shadow-[0_10px_28px_rgba(10,32,59,0.06)]">
                    <div className="flex gap-4">
                      <img src={getPostImage(post)} alt={post.title} className="h-16 w-16 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#5782b2]">{getCategory(post)}</p>
                        <Link href={href} className="mt-1 block text-2xl font-semibold leading-tight text-[#12406f] hover:text-[#1f5f9f]">
                          {post.title}
                        </Link>
                        <p className="mt-2 text-sm leading-7 text-[#48617e]">{excerpt(post.summary)}</p>
                        <p className="mt-2 inline-flex items-center gap-2 text-xs text-[#6d839d]">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {new Date(post.publishedAt || Date.now()).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#c3d5e8] bg-white p-10 text-center text-[#5c7897]">
              No matching posts yet.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
