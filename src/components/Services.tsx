"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const services = [
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="svc1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7B5CFF" />
            <stop offset="100%" stopColor="#00D4FF" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="20" stroke="url(#svc1)" strokeWidth="2" />
        <path d="M24 14v10l6 6" stroke="url(#svc1)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="url(#svc1)" />
      </svg>
    ),
    title: "AI Readiness Assessment",
    description:
      "Audit your data, processes, and culture to identify where AI will actually move the needle.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="svc2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#7B5CFF" />
          </linearGradient>
        </defs>
        <path d="M8 36l10-10 8 8 14-20" stroke="url(#svc2)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="38" cy="14" r="4" fill="url(#svc2)" />
      </svg>
    ),
    title: "Transformation Roadmap",
    description:
      "A phased, practical blueprint from pilot to production — with milestones, owners, and KPIs.",
  },
  {
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12">
        <defs>
          <linearGradient id="svc3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="100%" stopColor="#7B5CFF" />
          </linearGradient>
        </defs>
        <rect x="8" y="8" width="32" height="32" rx="6" stroke="url(#svc3)" strokeWidth="2" />
        <path d="M16 24h16M16 32h10" stroke="url(#svc3)" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="16" r="4" fill="url(#svc3)" />
      </svg>
    ),
    title: "Implementation Partner",
    description:
      "Hands-on guidance through vendor selection, integration, change management, and go-live.",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-6 relative" ref={null}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What We <span className="prism-text">Deliver</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            End-to-end AI transformation — from the first assessment to full production deployment.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-surface rounded-2xl p-8 prism-border cursor-default"
              style={{ transformStyle: "preserve-3d" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-text-secondary leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
