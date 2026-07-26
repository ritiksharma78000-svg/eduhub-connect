import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — [School Name]" },
      { name: "description", content: "Get in touch with our admissions and administration teams. Phone, email, address, and a direct message form." },
      { property: "og:title", content: "Contact — [School Name]" },
      { property: "og:description", content: "Reach out to our admissions team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message should be at least 10 characters").max(1000),
});

const info = [
  { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", sub: "Mon–Fri, 8am – 5pm" },
  { icon: Mail, label: "Email", value: "hello@school.edu", sub: "We reply within 1 business day" },
  { icon: MapPin, label: "Campus", value: "123 Learning Avenue", sub: "Springfield, ST 45678" },
  { icon: Clock, label: "Office Hours", value: "Mon – Fri", sub: "8:00 AM to 5:00 PM" },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent! We'll get back to you shortly.");
    }, 700);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-gold">Get in Touch</span>
        <h1 className="mt-2 font-display text-4xl font-bold text-primary sm:text-5xl">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">
          Questions about admissions, curriculum, or campus visits? Our team is here to help.
        </p>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Info */}
        <div className="grid content-start gap-4">
          {info.map((i) => (
            <div key={i.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <i.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{i.label}</div>
                <div className="mt-0.5 truncate font-semibold text-foreground">{i.value}</div>
                <div className="text-sm text-muted-foreground">{i.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-2xl font-bold text-primary">Send us a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">We'll respond within one business day.</p>
          <div className="mt-6 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} placeholder="Your full name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} placeholder="How can we help?" />
              <div className="text-right text-xs text-muted-foreground">{form.message.length}/1000</div>
            </div>
            <Button type="submit" variant="gold" size="lg" className="h-12" disabled={submitting}>
              {submitting ? "Sending..." : (<>Send Message <Send className="h-4 w-4" /></>)}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
