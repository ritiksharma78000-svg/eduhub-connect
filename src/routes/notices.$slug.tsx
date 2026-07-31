import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { getNoticeBySlug, notices } from "@/lib/notices";

function toIsoDate(date: string): string | null {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().slice(0, 10);
}

export const Route = createFileRoute("/notices/$slug")({
  loader: ({ params }) => {
    const notice = getNoticeBySlug(params.slug);
    if (!notice) throw notFound();
    return { notice };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Notice not found — [School Name]" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { notice } = loaderData;
    const title = `${notice.title} — [School Name]`;
    const description = notice.body;
    const published = toIsoDate(notice.date);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/notices/${notice.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/notices/${notice.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: notice.title,
            description,
            articleSection: notice.category,
            ...(published ? { datePublished: published, dateModified: published } : {}),
            inLanguage: "en",
            author: { "@type": "Organization", name: "[School Name]" },
            publisher: { "@type": "EducationalOrganization", name: "[School Name]" },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `/notices/${notice.slug}`,
            },
            articleBody: notice.content.join("\n\n"),
          }),
        },
      ],
    };
  },
  component: NoticeDetailPage,
});

function NoticeDetailPage() {
  const { notice } = Route.useLoaderData();
  const related = notices.filter((n) => n.category === notice.category && n.slug !== notice.slug).slice(0, 3);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        to="/"
        hash="notices"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" /> Back to notices
      </Link>

      <article className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
            <Calendar className="h-3 w-3" /> {notice.date}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
            <Tag className="h-3 w-3" /> {notice.category}
          </span>
          {notice.tag && (
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground">
              {notice.tag}
            </span>
          )}
        </div>

        <h1 className="mt-4 font-display text-3xl font-bold text-primary sm:text-4xl">{notice.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{notice.body}</p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground">
          {notice.content.map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-primary">More in {notice.category}</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  to="/notices/$slug"
                  params={{ slug: r.slug }}
                  className="block rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-muted/40"
                >
                  <span className="text-xs font-semibold text-muted-foreground">{r.date}</span>
                  <h3 className="mt-1 font-display text-lg font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
