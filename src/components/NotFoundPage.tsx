import { Link } from "@tanstack/react-router";
import { Home, Mail, Search, BookOpen } from "lucide-react";

export function NotFoundPage() {
  return (
    <section className="flex w-full flex-col items-center justify-center px-4 py-24 sm:py-32">
      <div className="relative w-full max-w-2xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
            <Search className="h-9 w-9" />
          </div>
        </div>

        <div className="mt-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">404 Error</span>
          <h1 className="mt-2 font-display text-5xl font-bold text-primary sm:text-6xl">Page not found</h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground sm:text-lg">
            We couldn't find the page you're looking for. It may have been moved, renamed, or is temporarily unavailable.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gold/50 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold-foreground transition-colors hover:bg-gold/20 sm:w-auto"
          >
            <Mail className="h-4 w-4" />
            Contact Us
          </Link>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Looking for something specific? Try these helpful links:
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
            <Link to="/" hash="apply" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-secondary/80">
              <BookOpen className="h-3.5 w-3.5" /> Admissions
            </Link>
            <Link to="/" hash="notices" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-secondary/80">
              Notices
            </Link>
            <Link to="/" hash="facilities" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-secondary/80">
              Facilities
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground transition-colors hover:bg-secondary/80">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
