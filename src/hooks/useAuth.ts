import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "student" | "teacher" | "admin";

export const roleLabels: Record<AppRole, string> = {
  student: "Student",
  teacher: "Teacher",
  admin: "Administrator",
};

export const roleHome: Record<AppRole, string> = {
  student: "/student",
  teacher: "/teacher",
  admin: "/admin",
};

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user: session?.user ?? null, loading };
}

export function useRoles() {
  const { user, loading } = useSession();

  const query = useQuery({
    queryKey: ["user-roles", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role as AppRole);
    },
  });

  const roles = query.data ?? [];
  return {
    user,
    roles,
    isLoading: loading || (!!user && query.isLoading),
    hasRole: (role: AppRole) => roles.includes(role),
    primaryRole: (roles.includes("admin")
      ? "admin"
      : roles.includes("teacher")
        ? "teacher"
        : roles[0] ?? "student") as AppRole,
  };
}
