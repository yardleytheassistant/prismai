"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const testimonials = [
  {
    quote:
      "PrismAI didn't just give us a report — they sat in the trenches with us through every integration. Our AI adoption rate went from 12% to 68% in eight months.",
    name: "Marcus Webb",
    title: "Chief Digital Officer",
    company: "Meridian Corp",
    initials: "MW",
  },
  {
    quote:
      "We'd been burning through consultant budgets for two years with nothing to show. PrismAI's roadmap actually got executed. That's the difference — they measure outcomes.",
    name: "Sarah Chen",
    title: "VP of Operations",
    company: "Nexus Group",
    initials: "SC",
  },
  {
    quote:
      "The assessment alone was worth it. They identified three AI opportunities we'd completely missed — one of them saved us $4M in the first year.",
    name: "James Okonkwo",
    title: "CEO",
    company: "Vertex Labs",
    initials: "JO",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [active, setActive] = useState(0);

  return (
    <section className="py-24 px-6 relative bg-surface/50" ref={null}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Leaders <span className="prism-text">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`bg-background rounded-2xl p-8 border transition-all duration-300 cursor-pointer ${
                active === i ? "border-primary/50 shadow-lg shadow-primary/10" : "border-white/5"
              }`}
              onClick={() => setActive(i)}
            >
              <p className="text-text-secondary leading-relaxed mb-6 text-sm">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">
                    {t.title}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots for mobile */}
        <div className="flex justify-center gap-2 md:hidden">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                active === i ? "bg-primary w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}