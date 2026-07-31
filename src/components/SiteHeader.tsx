import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { GraduationCap, LayoutDashboard, LogOut, Menu, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/useAuth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/#notices", label: "Notices" },
  { to: "/#facilities", label: "Facilities" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold text-primary">[School Name]</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Excellence in Education</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a
              key={n.to}
              href={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
            >
              {n.label}
            </a>
          ))}
          {user ? (
            <>
              <Button asChild variant="outline" size="sm" className="ml-2">
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-1.5 h-4 w-4" /> Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <Button asChild variant="outline" size="sm" className="ml-2">
              <Link to="/auth">Sign in</Link>
            </Button>
          )}
          <Button asChild variant="gold" size="sm" className="ml-1">
            <a href="/#apply">Apply Now</a>
          </Button>

        </nav>
        <button
          className="rounded-md p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <a
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/90 hover:bg-accent"
              >
                {n.label}
              </a>
            ))}
            <Button asChild variant="gold" className="mt-2">
              <a href="/#apply" onClick={() => setOpen(false)}>Apply Now</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
