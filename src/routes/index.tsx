import { createFileRoute } from "@tanstack/react-router";
import { Users, GraduationCap, Award, Trophy, ArrowRight, Quote, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdmissionDialog } from "@/components/AdmissionDialog";
import { CounterCard } from "@/components/CounterCard";
import { NoticeBoard } from "@/components/NoticeBoard";
import campusHero from "@/assets/campus-hero.jpg";
import principalImg from "@/assets/principal.jpg";
import classroomImg from "@/assets/classroom.jpg";
import labImg from "@/assets/science-lab.jpg";
import libraryImg from "@/assets/library.jpg";
import sportsImg from "@/assets/sports.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "[School Name] — Excellence in Education" },
      { name: "description", content: "A trusted community school nurturing curious minds through smart classrooms, modern labs, and a legacy of academic excellence." },
      { property: "og:title", content: "[School Name] — Excellence in Education" },
      { property: "og:description", content: "Discover our campus: admissions, notices, facilities and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const facilities = [
  { title: "Smart Classrooms", img: classroomImg, desc: "Interactive digital boards and blended learning in every room." },
  { title: "Science Labs", img: labImg, desc: "Physics, chemistry and biology labs with modern equipment." },
  { title: "Library", img: libraryImg, desc: "Over 20,000 titles, quiet reading zones and research corners." },
  { title: "Sports Complex", img: sportsImg, desc: "Track, courts, and indoor arena for a full athletics program." },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section id="apply" className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={campusHero}
            alt="School campus at golden hour"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/50" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Admissions Open 2026-27
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight text-primary-foreground sm:text-5xl md:text-6xl">
              Where curious minds <span className="text-gold">become confident</span> leaders.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
              A trusted community school combining rigorous academics, arts and athletics with values
              that stay with our students for life.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <AdmissionDialog
                trigger={
                  <Button variant="gold" size="lg" className="h-12 px-6 text-base">
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
              <Button asChild variant="outline" size="lg" className="h-12 border-white/60 bg-white/10 px-6 text-base text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
                <a href="#facilities">Explore Campus</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section className="mx-auto -mt-14 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <CounterCard icon={Users} value={1500} label="Students" />
          <CounterCard icon={GraduationCap} value={80} label="Expert Staff" />
          <CounterCard icon={Award} value={25} label="Years of Legacy" />
          <CounterCard icon={Trophy} value={100} suffix="%" label="Success Rate" />
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-10 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)] md:gap-14">
          <div className="relative mx-auto w-full max-w-xs">
            <div className="absolute -inset-3 rounded-3xl bg-gold/25" />
            <div className="absolute -inset-1.5 rounded-2xl bg-primary" />
            <img
              src={principalImg}
              alt="Principal portrait"
              width={800}
              height={1000}
              loading="lazy"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-xl"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">Principal's Corner</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">A Message from our Principal</h2>
            <Quote className="mt-6 h-8 w-8 text-gold" />
            <p className="mt-3 text-base leading-relaxed text-foreground/85 sm:text-lg">
              Education, to us, is not a race — it is a rhythm. At [School Name], we build spaces where
              children are seen, heard and challenged; where teachers are mentors, and where every family
              is a partner. Come visit us, and I promise you will feel the difference the moment you step in.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-12 bg-gold" />
              <div>
                <div className="font-display text-lg font-semibold text-primary">Dr. Ananya Sharma</div>
                <div className="text-sm text-muted-foreground">Principal, [School Name]</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICES */}
      <section id="notices" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <NoticeBoard />
      </section>

      {/* FACILITIES */}
      <section id="facilities" className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Campus Life</span>
          <h2 className="mt-2 font-display text-3xl font-bold text-primary sm:text-4xl">World-class Facilities</h2>
          <p className="mt-3 text-muted-foreground">
            Purpose-built spaces designed to spark curiosity and support every kind of learner.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f) => (
            <article
              key={f.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-primary">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-gold/25 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to join our community?</h2>
            <p className="mt-3 text-primary-foreground/80">
              Applications for the next academic year are now open. Book a campus visit or start your
              online application today.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <AdmissionDialog
                trigger={
                  <Button variant="gold" size="lg" className="h-12 px-6">
                    Start Application <ArrowRight className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
