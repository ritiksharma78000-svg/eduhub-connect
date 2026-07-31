import { createFileRoute, Link } from "@tanstack/react-router";
import { DashboardCard, DashboardShell } from "@/components/DashboardShell";
import { notices } from "@/lib/notices";

export const Route = createFileRoute("/_authenticated/student")({
  head: () => ({ meta: [{ title: "Student Dashboard — [School Name]" }, { name: "robots", content: "noindex" }] }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const exams = notices.filter((n) => n.category === "Exams").slice(0, 3);

  return (
    <DashboardShell role="student" title="Student Dashboard" subtitle="Your timetable, exams and school updates.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard title="Upcoming exams" description="Latest assessment notices for your grade.">
          <ul className="space-y-2 text-sm">
            {exams.map((n) => (
              <li key={n.slug}>
                <Link to="/notices/$slug" params={{ slug: n.slug }} className="text-primary hover:underline">
                  {n.title}
                </Link>
                <span className="block text-xs text-muted-foreground">{n.date}</span>
              </li>
            ))}
          </ul>
        </DashboardCard>
        <DashboardCard title="Notice board" description="All general, exam and sports announcements.">
          <Link to="/" hash="notices" className="text-sm font-medium text-primary hover:underline">
            Open notice board
          </Link>
        </DashboardCard>
        <DashboardCard title="Attendance" description="Attendance tracking will appear here once records are added." />
        <DashboardCard title="Assignments" description="Homework submissions and deadlines from your teachers." />
        <DashboardCard title="Report card" description="Term results are published after each assessment cycle." />
        <DashboardCard title="Need help?" description="Reach the school office for any portal issue.">
          <Link to="/contact" className="text-sm font-medium text-primary hover:underline">
            Contact the school
          </Link>
        </DashboardCard>
      </div>
    </DashboardShell>
  );
}
