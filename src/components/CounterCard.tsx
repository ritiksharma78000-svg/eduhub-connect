import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

export function CounterCard({
  icon: Icon,
  value,
  suffix = "+",
  label,
}: {
  icon: LucideIcon;
  value: number;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.floor(value * eased));
            if (p < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  const display = suffix === "%" ? `${count}%` : `${count.toLocaleString()}${suffix}`;

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 transition-transform group-hover:scale-125" />
      <div className="relative">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <div className="mt-5 font-display text-4xl font-bold text-primary">{display}</div>
        <div className="mt-1 text-sm font-medium text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
