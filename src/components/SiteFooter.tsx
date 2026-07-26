import { Link } from "@tanstack/react-router";
import { GraduationCap, Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
  { icon: Linkedin, label: "LinkedIn" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold text-gold-foreground">
              <GraduationCap className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">[School Name]</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            Nurturing curious minds and confident hearts since 1999. A community where academic
            excellence meets character education.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground/90 transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-gold">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/" className="text-primary-foreground/80 hover:text-gold">Home</a></li>
            <li><a href="/#notices" className="text-primary-foreground/80 hover:text-gold">Notices</a></li>
            <li><a href="/#facilities" className="text-primary-foreground/80 hover:text-gold">Facilities</a></li>
            <li><a href="/#apply" className="text-primary-foreground/80 hover:text-gold">Admissions</a></li>
            <li><Link to="/contact" className="text-primary-foreground/80 hover:text-gold">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-base font-semibold text-gold">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>123 Learning Avenue</li>
            <li>Springfield, ST 45678</li>
            <li>+1 (555) 123-4567</li>
            <li>hello@school.edu</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} [School Name]. All rights reserved.</p>
          <p>Crafted with care for our community.</p>
        </div>
      </div>
    </footer>
  );
}
