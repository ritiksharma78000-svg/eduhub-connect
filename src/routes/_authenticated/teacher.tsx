import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardCard, DashboardShell } from "@/components/DashboardShell";
import { notices } from "@/lib/notices";

export const Route = createFileRoute("/_authenticated/teacher")({
  head: () => ({ meta: [{ title: "Teacher Dashboard — [School Name]" }, { name: "robots", content: "noindex" }] }),
  component: TeacherDashboard,
});

function TeacherDashboard() {
  const recent = notices.slice(0, 3);

  return (
    <DashboardShell
      role="teacher"
      title="Teacher Dashboard"
      subtitle="Classes, assessments and staff announcements."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="My classes" description="Class lists and rosters appear here once assigned." />
        <DashboardCard title="Assessments" description="Create and publish assessment schedules for your subjects." />
        <DashboardCard title="Attendance" description="Mark daily attendance for each period." />
        <DashboardCard title="Staff notices" description="Latest school-wide announcements.">
          <ul className="space-y-2 text-sm">
            {recent.map((n) => (
              <li key={n.slug}>
                <Link to="/notices/$slug" params={{ slug: n.slug }} className="text-primary hover:underline">
                  {n.title}
                </Link>
                <span className="block text-xs text-muted-foreground">{n.date}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
        <DashboardCard title="Parent meetings" description="Upcoming PTM slots booked by parents." />
        <DashboardCard title="Resources" description="Shared lesson plans and department material." />
      </div>
    </DashboardShell>
  );
}
