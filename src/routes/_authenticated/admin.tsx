import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/DashboardShell";
import { listPortalUsers, setPortalUserRole } from "@/lib/admin.functions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — [School Name]" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  return (
    <DashboardShell
      role="admin"
      title="Admin Dashboard"
      subtitle="Approve accounts and assign student, teacher or admin roles."
    >
      <UserRoleTable />
    </DashboardShell>
  );
}

function UserRoleTable() {
  const queryClient = useQueryClient();
  const fetchUsers = useServerFn(listPortalUsers);
  const updateRole = useServerFn(setPortalUserRole);

  const { data, isLoading, error } = useQuery({
    queryKey: ["portal-users"],
    queryFn: () => fetchUsers(),
  });

  const mutation = useMutation({
    mutationFn: (vars: { userId: string; role: "student" | "teacher" | "admin" }) => updateRole({ data: vars }),
    onSuccess: () => {
      toast.success("Role updated");
      queryClient.invalidateQueries({ queryKey: ["portal-users"] });
      queryClient.invalidateQueries({ queryKey: ["user-roles"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" /> Loading accounts…
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">Could not load accounts: {(error as Error).message}</p>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Current role</TableHead>
            <TableHead className="text-right">Assign role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data ?? []).map((u) => {
            const current = u.roles[0] ?? "student";
            return (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.email}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {u.confirmed ? "Confirmed" : "Pending confirmation"}
                </TableCell>
                <TableCell className="text-sm capitalize">{current}</TableCell>
                <TableCell className="text-right">
                  <Select
                    value={current}
                    onValueChange={(role) =>
                      mutation.mutate({ userId: u.id, role: role as "student" | "teacher" | "admin" })
                    }
                  >
                    <SelectTrigger className="ml-auto w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
