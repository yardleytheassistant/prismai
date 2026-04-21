"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 47, suffix: "", label: "Enterprises Transformed" },
  { value: 2.3, suffix: "B", prefix: "$", label: "In AI-Driven Value Unlocked" },
  { value: 89, suffix: "%", label: "Average Productivity Gain" },
  { value: 6, suffix: " months", label: "Avg. Time to Measurable ROI" },
];

function Counter({ value, prefix = "", suffix = "", label }: typeof stats[0]) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isDecimal = value % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-display font-semibold mb-2">
        <span className="prism-text">
          {prefix}
          {count}
          {suffix}
        </span>
      </div>
      <p className="text-text-muted text-xs uppercase tracking-[0.28em]">{label}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="relative py-24 section-divider" ref={ref}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs text-text-muted uppercase tracking-[0.3em]">
            Numbers that speak louder than promises
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass-card rounded-2xl px-4 py-6 md:px-6 md:py-8"
            >
              <Counter {...stat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
