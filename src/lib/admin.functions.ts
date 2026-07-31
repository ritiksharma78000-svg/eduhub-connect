import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const roleSchema = z.enum(["student", "teacher", "admin"]);

export const listPortalUsers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: adminRows, error: adminError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin");
    if (adminError) throw new Error(adminError.message);
    if (!adminRows?.length) throw new Error("Forbidden: admin role required");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: userList, error: listError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
    if (listError) throw new Error(listError.message);

    const { data: roleRows, error: rolesError } = await supabaseAdmin.from("user_roles").select("user_id, role");
    if (rolesError) throw new Error(rolesError.message);

    return userList.users.map((u) => ({
      id: u.id,
      email: u.email ?? "",
      createdAt: u.created_at,
      confirmed: !!u.email_confirmed_at,
      roles: (roleRows ?? []).filter((r) => r.user_id === u.id).map((r) => r.role as string),
    }));
  });

export const setPortalUserRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ userId: z.string().uuid(), role: roleSchema }).parse(data))
  .handler(async ({ context, data }) => {
    const { data: adminRows, error: adminError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin");
    if (adminError) throw new Error(adminError.message);
    if (!adminRows?.length) throw new Error("Forbidden: admin role required");

    if (data.userId === context.userId && data.role !== "admin") {
      throw new Error("You cannot remove your own admin access.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: deleteError } = await supabaseAdmin.from("user_roles").delete().eq("user_id", data.userId);
    if (deleteError) throw new Error(deleteError.message);

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: data.userId, role: data.role });
    if (insertError) throw new Error(insertError.message);

    return { ok: true };
  });
