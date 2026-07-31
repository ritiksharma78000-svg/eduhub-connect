import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { roleHome, useRoles } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — [School Name]" }, { name: "robots", content: "noindex" }] }),
  component: DashboardRedirect,
});

function DashboardRedirect() {
  const navigate = useNavigate();
  const { primaryRole, isLoading } = useRoles();

  useEffect(() => {
    if (!isLoading) navigate({ to: roleHome[primaryRole], replace: true });
  }, [isLoading, primaryRole, navigate]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Loading your dashboard…
    </div>
  );
}
