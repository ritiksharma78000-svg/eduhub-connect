import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Trophy, BookOpen, Megaphone, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { notices, type NoticeCategory } from "@/lib/notices";

const tabs: { key: NoticeCategory | "All"; icon: typeof Megaphone }[] = [
  { key: "All", icon: Megaphone },
  { key: "General", icon: Megaphone },
  { key: "Exams", icon: BookOpen },
  { key: "Sports", icon: Trophy },
];

export function NoticeBoard() {
  const [active, setActive] = useState<NoticeCategory | "All">("All");
  const filtered = active === "All" ? notices : notices.filter((n) => n.category === active);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center sm:justify-between">
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Stay Informed</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">Notice Board</h2>
        </div>
        <span className="shrink-0 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary">
          {filtered.length} active
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              active === t.key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-foreground/70 hover:bg-accent hover:text-primary"
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.key}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-border">
        {filtered.map((n) => (
          <li key={n.slug}>
            <Link
              to="/notices/$slug"
              params={{ slug: n.slug }}
              className="group grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 py-5 transition-colors hover:bg-muted/40 sm:flex sm:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    <Calendar className="h-3 w-3" /> {n.date}
                  </span>
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                    {n.category}
                  </span>
                  {n.tag && (
                    <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-semibold text-gold-foreground">
                      {n.tag}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-foreground group-hover:text-primary">
                  {n.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{n.body}</p>
              </div>
              <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-primary/60 transition-transform group-hover:translate-x-1 group-hover:text-primary sm:mt-0" />
            </Link>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="py-10 text-center text-sm text-muted-foreground">No notices in this category yet.</li>
        )}
      </ul>
    </div>
  );
}
