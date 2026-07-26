export type NoticeCategory = "General" | "Exams" | "Sports";

export type Notice = {
  slug: string;
  category: NoticeCategory;
  date: string;
  title: string;
  body: string;
  content: string[];
  tag?: string;
};

export const notices: Notice[] = [
  {
    slug: "annual-day-celebration",
    category: "General",
    date: "Aug 12, 2026",
    title: "Annual Day Celebration",
    body: "Join us on August 30 for our annual cultural showcase featuring performances from every grade.",
    tag: "New",
    content: [
      "We are delighted to invite all parents, students, and well-wishers to our Annual Day Celebration on Saturday, August 30, 2026, at the school auditorium from 5:00 PM onwards.",
      "This year's theme, 'Roots & Wings', celebrates the traditions that ground us and the dreams that lift us. Every grade has been rehearsing for months to bring you an evening of music, dance, and drama.",
      "Gates open at 4:15 PM. Please carry your invitation card for entry. Refreshments will be served post the performances in the courtyard.",
    ],
  },
  {
    slug: "parent-teacher-meeting",
    category: "General",
    date: "Aug 05, 2026",
    title: "Parent-Teacher Meeting",
    body: "Term 1 PTMs are scheduled for the last week of August. Booking opens Monday.",
    content: [
      "Term 1 Parent-Teacher Meetings will be held from August 25 to August 29, 2026. Slot booking opens on the parent portal at 9:00 AM on Monday, August 18.",
      "Each meeting is a 10-minute slot. Please arrive 5 minutes early and carry your child's diary and latest assessment report.",
      "Homeroom teachers will share individual progress notes, followed by subject teacher rotations for grades 6 and above.",
    ],
  },
  {
    slug: "mid-term-schedule-released",
    category: "Exams",
    date: "Aug 10, 2026",
    title: "Mid-Term Schedule Released",
    body: "Grade 6-12 mid-term timetables are now available on the parent portal.",
    content: [
      "The mid-term examination timetable for grades 6 through 12 has been published on the parent portal under Academics → Assessments.",
      "Exams begin on September 8 and conclude on September 20, 2026. Reporting time is 8:30 AM for morning sessions and 12:30 PM for afternoon sessions.",
      "Students are encouraged to review the revised syllabus outline shared by respective subject teachers earlier this week.",
    ],
  },
  {
    slug: "practical-exam-guidelines",
    category: "Exams",
    date: "Aug 03, 2026",
    title: "Practical Exam Guidelines",
    body: "Revised guidelines for science practical assessments will be shared this week.",
    content: [
      "Updated guidelines for Physics, Chemistry, and Biology practical assessments will be circulated by respective HODs by Friday.",
      "Students must carry lab coats, safety goggles, and their practical record books to every session. Digital submissions of observation notes will be accepted alongside physical copies.",
      "Makeup sessions for genuine absences will be scheduled within one week of the original date on prior written request.",
    ],
  },
  {
    slug: "inter-house-basketball-finals",
    category: "Sports",
    date: "Aug 15, 2026",
    title: "Inter-House Basketball Finals",
    body: "Come cheer for the finals on Saturday at 4 PM in the Sports Complex.",
    tag: "Live",
    content: [
      "The Inter-House Basketball Championship reaches its grand finale this Saturday at 4:00 PM in the Sports Complex arena.",
      "Emerald House takes on Crimson House in what promises to be a thrilling contest. Doors open at 3:30 PM; seating is on a first-come basis.",
      "The prize distribution and closing ceremony will follow immediately after the final whistle.",
    ],
  },
  {
    slug: "swim-team-trials",
    category: "Sports",
    date: "Aug 07, 2026",
    title: "Swim Team Trials",
    body: "Trials for the school swim team are open to grades 7-12 through August 20.",
    content: [
      "Trials for the 2026-27 school swim team are open to students in grades 7 through 12 and will run daily from 3:45 PM to 5:30 PM until August 20.",
      "Participants must submit a signed parental consent form and a recent fitness certificate at the pool office before their first trial.",
      "Selected swimmers will be announced on August 25 and are expected to commit to the regular training schedule through the season.",
    ],
  },
];

export function getNoticeBySlug(slug: string): Notice | undefined {
  return notices.find((n) => n.slug === slug);
}
