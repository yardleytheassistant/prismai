"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-mesh"
    >
      {/* Floating prism shapes */}
      <motion.div
        className="absolute top-20 left-[10%] w-32 h-32 opacity-20"
        animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="prism1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B5CFF" />
              <stop offset="100%" stopColor="#00D4FF" />
            </linearGradient>
          </defs>
          <polygon points="50,5 95,80 5,80" fill="none" stroke="url(#prism1)" strokeWidth="1.5" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-40 right-[15%] w-24 h-24 opacity-15"
        animate={{ y: [5, -15, 5], rotate: [5, -5, 5] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,80 5,80" fill="rgba(0,212,255,0.3)" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[20%] w-20 h-20 opacity-10"
        animate={{ y: [-5, 15, -5], rotate: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,80 5,80" fill="none" stroke="#FF6B6B" strokeWidth="1" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-60 left-[60%] w-16 h-16 opacity-10"
        animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }}
        transition={{ duration: 9, repeat: Infinity, delay: 0.5 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon points="50,5 95,80 5,80" fill="rgba(123,92,255,0.5)" />
        </svg>
      </motion.div>

      {/* Mouse-follow gradient orb */}
      <MouseOrb />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium border border-primary/30 text-primary bg-primary/10">
            AI Adoption Consulting
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          From AI Potential to{" "}
          <span className="prism-text">AI Reality.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          PrismAI helps enterprise teams cut through the noise — building the strategy,
          infrastructure, and culture to make AI actually work.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="btn-primary px-8 py-4 rounded-xl font-semibold text-white w-full sm:w-auto text-center"
          >
            Book a Strategy Call
          </a>
          <a
            href="#services"
            className="btn-secondary px-8 py-4 rounded-xl font-semibold text-white w-full sm:w-auto text-center"
          >
            See Our Work
          </a>
        </motion.div>

        {/* Social proof ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/5"
        >
          <p className="text-xs text-text-secondary uppercase tracking-widest mb-6">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-40">
            {["Meridian Corp", "Axiom Systems", "Nexus Group", "Vertex Labs", "Cascade Health"].map(
              (company) => (
                <span key={company} className="text-sm font-medium text-text-secondary">
                  {company}
                </span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
}

function MouseOrb() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(123,92,255,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: ["0%", "100%"], y: ["0%", "100%"] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
