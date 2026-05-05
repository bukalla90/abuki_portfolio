"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
         <motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8 }}
  className="relative flex items-center justify-center"
>
  {/* Ambient background glow */}
  <div className="absolute inset-0 -z-10">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl" />
    <div className="absolute top-1/3 left-1/3 w-48 h-48 rounded-full bg-emerald-400/10 blur-2xl" />
  </div>

  {/* Slow-spinning dashed orbit */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    className="absolute w-[360px] h-[360px] rounded-full border border-dashed border-cyan-400/25"
  />

  {/* Counter-spin solid ring with conic gradient */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
    className="absolute w-[310px] h-[310px] rounded-full"
    style={{
      background: "conic-gradient(from 180deg, #06b6d4 0deg, #10b981 120deg, transparent 160deg, transparent 360deg)",
      mask: "radial-gradient(circle, transparent 148px, black 149px)",
      WebkitMask: "radial-gradient(circle, transparent 148px, black 149px)",
    }}
  />

  {/* Orbiting dot A */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
    className="absolute w-[360px] h-[360px]"
  >
    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-400/20" />
  </motion.div>

  {/* Orbiting dot B */}
  <motion.div
    animate={{ rotate: -360 }}
    transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
    className="absolute w-[310px] h-[310px]"
  >
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" />
  </motion.div>

  {/* Main card */}
  <div className="relative w-64 h-72 rounded-3xl overflow-hidden z-10 bg-gradient-to-br from-cyan-500 via-teal-400 to-emerald-500 p-[2px] shadow-2xl shadow-cyan-500/20">
    <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden flex flex-col items-center justify-center gap-2">

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.15]"
        style={{
          backgroundImage: "linear-gradient(#06b6d4 1px,transparent 1px),linear-gradient(90deg,#06b6d4 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* SVG Developer Avatar */}
      <svg
        viewBox="0 0 160 160"
        className="relative z-10 w-44 h-44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Monitor */}
        <rect x="28" y="88" width="104" height="68" rx="8" fill="#0e7490" />
        <rect x="34" y="94" width="92" height="52" rx="5" fill="#0f172a" />
        {/* Code lines on screen */}
        <rect x="42" y="102" width="28" height="4" rx="2" fill="#22d3ee" opacity="0.9" />
        <rect x="42" y="110" width="48" height="4" rx="2" fill="#34d399" opacity="0.8" />
        <rect x="42" y="118" width="36" height="4" rx="2" fill="#22d3ee" opacity="0.6" />
        <rect x="42" y="126" width="52" height="4" rx="2" fill="#a78bfa" opacity="0.7" />
        <rect x="42" y="134" width="30" height="4" rx="2" fill="#34d399" opacity="0.5" />
        {/* Blinking cursor */}
        <motion.rect
          x="76" y="134" width="3" height="4" rx="1" fill="#22d3ee"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        {/* Monitor stand */}
        <rect x="72" y="156" width="16" height="8" rx="2" fill="#0e7490" />
        <rect x="60" y="162" width="40" height="4" rx="2" fill="#0e7490" />

        {/* Person body */}
        <rect x="52" y="64" width="56" height="32" rx="10" fill="#0e7490" />
        {/* Collar / shirt detail */}
        <path d="M80 68 L72 80 L80 78 L88 80 Z" fill="#164e63" />

        {/* Head */}
        <circle cx="80" cy="48" r="20" fill="#fde68a" />
        {/* Hair */}
        <path d="M62 44 Q64 28 80 26 Q96 28 98 44 Q90 38 80 40 Q70 38 62 44Z" fill="#1c1917" />
        {/* Eyes */}
        <circle cx="74" cy="48" r="2.5" fill="#1c1917" />
        <circle cx="86" cy="48" r="2.5" fill="#1c1917" />
        <circle cx="75" cy="47" r="1" fill="white" />
        <circle cx="87" cy="47" r="1" fill="white" />
        {/* Smile */}
        <path d="M74 54 Q80 59 86 54" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Glasses */}
        <rect x="70" y="44" width="10" height="7" rx="3" stroke="#0e7490" strokeWidth="1.5" fill="none" />
        <rect x="80" y="44" width="10" height="7" rx="3" stroke="#0e7490" strokeWidth="1.5" fill="none" />
        <line x1="80" y1="47.5" x2="80" y2="47.5" stroke="#0e7490" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="68" y1="47.5" x2="70" y2="47.5" stroke="#0e7490" strokeWidth="1.5" />
        <line x1="90" y1="47.5" x2="92" y2="47.5" stroke="#0e7490" strokeWidth="1.5" />
        {/* Arms */}
        <rect x="34" y="66" width="20" height="12" rx="6" fill="#fde68a" transform="rotate(-15 34 66)" />
        <rect x="106" y="64" width="20" height="12" rx="6" fill="#fde68a" transform="rotate(15 106 64)" />
        {/* Mug in hand */}
        <rect x="30" y="74" width="14" height="12" rx="3" fill="#7c3aed" />
        <path d="M44 78 Q50 78 50 82 Q50 86 44 86" stroke="#7c3aed" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="33" y="72" width="8" height="3" rx="1" fill="#a78bfa" opacity="0.7" />
      </svg>

      {/* Status bar */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur border border-cyan-200/60 dark:border-cyan-800/40">
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-emerald-500"
        />
        <span className="text-[11px] font-mono font-semibold text-emerald-700 dark:text-emerald-400 tracking-wider uppercase">
          Open to work
        </span>
      </div>

      {/* Scan line */}
      <motion.div
        animate={{ y: ["-100%", "300%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
        className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none z-20"
      />
    </div>
  </div>

  {/* Floating badge — top right */}
  <motion.div
    animate={{ y: [0, -7, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    className="absolute top-2 -right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-black/10 border border-cyan-100 dark:border-cyan-900"
  >
    <span className="text-xs font-bold text-cyan-600 dark:text-cyan-300">⚛ React</span>
  </motion.div>

  {/* Floating badge — bottom left */}
  <motion.div
    animate={{ y: [0, 7, 0] }}
    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
    className="absolute bottom-2 -left-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-black/10 border border-emerald-100 dark:border-emerald-900"
  >
    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300">▲ Next.js</span>
  </motion.div>

  {/* Floating badge — left mid */}
  <motion.div
    animate={{ x: [0, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-black/10 border border-violet-100 dark:border-violet-900"
  >
    <span className="text-xs font-bold text-violet-600 dark:text-violet-300">TS</span>
  </motion.div>
</motion.div>

         <motion.div
  initial={{ opacity: 0, x: 50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="space-y-6"
>
  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
    I&apos;m a full-stack developer focused on building fast, scalable, and user-centered web applications. I enjoy turning complex problems into simple, efficient solutions with clean and maintainable code.
  </p>

  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
    I work across the full stack — from designing responsive interfaces to building robust backend systems and APIs. My goal is to create products that are not only functional but also intuitive and reliable.
  </p>

  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
    Outside of development, I constantly explore new technologies, improve my skills, and contribute to real-world projects. I value continuous learning and building things that make an impact.
  </p>

  <div className="flex gap-4 pt-4">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="px-6 py-3 rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300 font-medium"
    >
      Problem Solver
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="px-6 py-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-medium"
    >
      Clean Coder
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="px-6 py-3 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 font-medium"
    >
      Innovator
    </motion.div>
  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
}