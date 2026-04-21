"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", company: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 relative" ref={null}>
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Stop Experimenting and{" "}
              <span className="prism-text">Start Executing?</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Most enterprises have AI pilots going nowhere. Let's change that. Book a free strategy
              call and leave with a concrete action plan — no pitch deck, no fluff.
            </p>
            <div className="space-y-4 text-sm">
              <a
                href="mailto:hello@prismai.co"
                className="flex items-center gap-3 text-text-secondary hover:text-primary transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@prismai.co
              </a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-8 border border-white/5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-secondary/50"
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-secondary/50"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-secondary/50"
                />
                <textarea
                  placeholder="Tell us about your AI challenge"
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-text-secondary/50 resize-none"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="w-full btn-primary py-4 rounded-xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading"
                    ? "Sending..."
                    : status === "success"
                    ? "Message Sent!"
                    : "Book a Strategy Call"}
                </button>
                {status === "success" && (
                  <p className="text-center text-sm text-green-400">
                    We'll be in touch within 24 hours.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}