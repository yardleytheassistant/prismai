"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive workshops to understand your business, data, and AI goals.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <circle cx="20" cy="20" r="16" stroke="#7B5CFF" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="8" stroke="#4CC9F0" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="#7B5CFF" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Assessment",
    description: "Rigorous analysis of readiness, gaps, and highest-value AI opportunities.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <rect x="8" y="8" width="24" height="24" rx="4" stroke="#4CC9F0" strokeWidth="1.5" />
        <path d="M14 20h12M14 26h8" stroke="#7B5CFF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Roadmap",
    description: "Custom transformation plan with clear phases, timelines, and success metrics.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M8 32l8-8 6 6 10-16" stroke="#7B5CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="14" r="3" fill="#4CC9F0" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Execution",
    description: "Embedded partnership through implementation — not just advice.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <path d="M12 28l6-6 8 4 6-12" stroke="#7B5CFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M32 8l4 4-4 4" stroke="#4CC9F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="process" className="py-28 px-6 relative section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-text-muted mb-4">
            Our Process
          </p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            How We <span className="prism-text">Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A proven four-step methodology that turns AI ambition into AI execution.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:flex items-start justify-between relative">
          <div className="absolute top-12 left-[8%] right-[8%] h-px bg-gradient-to-r from-primary/60 via-secondary/60 to-tertiary/60" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center w-56"
            >
              <div className="relative z-10 mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-surface-2 border border-white/10">
                {step.icon}
              </div>
              <span className="text-xs font-mono text-primary mb-2 tracking-[0.2em]">{step.number}</span>
              <h3 className="text-lg font-display font-semibold mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-8 relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-primary/50 via-secondary/40 to-tertiary/40" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4 items-start relative"
            >
              <div className="flex-shrink-0 relative z-10 w-12 h-12 rounded-xl bg-surface-2 border border-white/10 flex items-center justify-center">
                {step.icon}
              </div>
              <div className="glass-card rounded-2xl px-5 py-4 w-full">
                <span className="text-xs font-mono text-primary mb-1 block tracking-[0.2em]">{step.number}</span>
                <h3 className="text-lg font-display font-semibold mb-1">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
