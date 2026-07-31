import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { roleLabels, useRoles, type AppRole } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function DashboardShell({
  role,
  title,
  subtitle,
  children,
}: {
  role: AppRole;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const { user, hasRole, isLoading } = useRoles();

  if (isLoading) {
    return <div className="mx-auto max-w-5xl px-4 py-16 text-muted-foreground">Loading…</div>;
  }

  if (!hasRole(role)) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <ShieldAlert className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-4 font-display text-2xl font-bold text-primary">
          {roleLabels[role]} access required
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account doesn't have the {roleLabels[role].toLowerCase()} role yet. An administrator can grant it.
        </p>
        <Button asChild className="mt-6">
          <Link to="/dashboard">Go to my dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="rounded-full bg-primary/5 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
            {roleLabels[role]}
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold text-primary sm:text-4xl">{title}</h1>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>
        <p className="text-sm text-muted-foreground">Signed in as {user?.email}</p>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}

export function DashboardCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40">
      <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
