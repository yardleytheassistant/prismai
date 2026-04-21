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
        <circle cx="20" cy="20" r="8" stroke="#00D4FF" strokeWidth="1.5" />
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
        <rect x="8" y="8" width="24" height="24" rx="4" stroke="#00D4FF" strokeWidth="1.5" />
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
        <circle cx="32" cy="14" r="3" fill="#00D4FF" />
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
        <path d="M32 8l4 4-4 4" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="process" className="py-24 px-6 relative" ref={null}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How We <span className="prism-text">Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A proven four-step methodology that turns AI ambition into AI execution.
          </p>
        </motion.div>

        {/* Desktop timeline */}
        <div className="hidden md:flex items-start justify-between relative">
          <div className="absolute top-10 left-[10%] right-[10%] h-px bg-gradient-to-r from-primary/50 via-secondary/50 to-tertiary/50" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center w-56"
            >
              <div className="relative z-10 mb-6">{step.icon}</div>
              <span className="text-xs font-mono text-primary mb-2">{step.number}</span>
              <h3 className="text-lg font-bold mb-2">{step.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className="flex-shrink-0">{step.icon}</div>
              <div>
                <span className="text-xs font-mono text-primary mb-1 block">{step.number}</span>
                <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                <p className="text-text-secondary text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}