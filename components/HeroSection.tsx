"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      
      // Heartbeat pulse effect - sharp peak followed by decay
      const heartbeat = (t: number) => {
        const cycle = t % 1.5; // 1.5 second cycle
        if (cycle < 0.1) {
          // Sharp spike
          return Math.sin((cycle / 0.1) * Math.PI) * 0.8;
        } else if (cycle < 0.2) {
          // Quick dip
          return -Math.sin(((cycle - 0.1) / 0.1) * Math.PI) * 0.3;
        } else {
          // Rest period
          return 0;
        }
      };

      const pulse = heartbeat(time);
      
      // Draw vertical lines across the entire width
      const lineCount = 80;
      const spacing = width / lineCount;
      
      for (let i = 0; i <= lineCount; i++) {
        const x = i * spacing;
        const distanceFromCenter = Math.abs(x - centerX) / centerX;
        
        // Multiple wave layers that respond to the heartbeat
        const wave1 = Math.sin(time * 2 + i * 0.3) * 50;
        const wave2 = Math.cos(time * 1.5 + i * 0.2) * 40;
        const wave3 = Math.sin(time * 2.5 + i * 0.15 + distanceFromCenter * 10) * 30;
        
        // Base amplitude increases with pulse
        const baseAmplitude = 60 + pulse * 120;
        const amplitude = baseAmplitude * (1 - distanceFromCenter * 0.5);
        
        const yOffset = wave1 + wave2 + wave3;
        
        // Create gradient for each line
        const gradient = ctx.createLinearGradient(x, 0, x, height);
        
        if (document.documentElement.classList.contains('dark')) {
          // Dark mode colors
          const alpha = 0.15 + pulse * 0.3;
          gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.3})`);   // cyan-500
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha})`);        // cyan-500
          gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.3})`);   // emerald-500
        } else {
          // Light mode colors
          const alpha = 0.1 + pulse * 0.2;
          gradient.addColorStop(0, `rgba(6, 182, 212, ${alpha * 0.3})`);   // cyan-500
          gradient.addColorStop(0.5, `rgba(6, 182, 212, ${alpha})`);        // cyan-500
          gradient.addColorStop(1, `rgba(16, 185, 129, ${alpha * 0.3})`);   // emerald-500
        }
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + pulse * 2; // Lines get thicker with pulse
        
        ctx.beginPath();
        
        // Draw vertical wave line
        for (let y = 0; y <= height; y += 5) {
          const progress = y / height;
          const waveOffset = Math.sin(progress * Math.PI * 4 + time * 3 + i * 0.5) * amplitude * progress;
          const finalX = x + waveOffset + yOffset * progress;
          
          if (y === 0) {
            ctx.moveTo(finalX, y);
          } else {
            ctx.lineTo(finalX, y);
          }
        }
        
        ctx.stroke();
      }
      
      // Add central pulse ring
      if (pulse > 0.1) {
        const ringRadius = 100 + pulse * 200;
        const ringAlpha = pulse * 0.3;
        
        ctx.beginPath();
        ctx.arc(centerX, height / 2, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = document.documentElement.classList.contains('dark')
          ? `rgba(6, 182, 212, ${ringAlpha})`
          : `rgba(6, 182, 212, ${ringAlpha * 0.7})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Second ring
        ctx.beginPath();
        ctx.arc(centerX, height / 2, ringRadius * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = document.documentElement.classList.contains('dark')
          ? `rgba(16, 185, 129, ${ringAlpha * 0.5})`
          : `rgba(16, 185, 129, ${ringAlpha * 0.35})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      
      time += 0.016; // ~60fps
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/30 to-emerald-50/30 dark:from-gray-950 dark:via-cyan-950/20 dark:to-emerald-950/20"
    >
      {/* Heartbeat Wave Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/50 via-transparent to-white/50 dark:from-gray-950/50 dark:via-transparent dark:to-gray-950/50 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span
            className="inline-block px-6 py-3 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md text-cyan-700 dark:text-cyan-300 text-lg sm:text-xl font-semibold border-2 border-cyan-300/50 dark:border-cyan-600/50 shadow-lg shadow-cyan-200/50 dark:shadow-cyan-900/30 tracking-wide"
            whileHover={{ scale: 1.05 }}
          >
            ✦ Full Stack Developer ✦
          </motion.span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg">
            Abubeker Oumer
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-xl sm:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium backdrop-blur-sm"
        >
          Building scalable and modern web & mobile applications
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all backdrop-blur-sm"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full border-2 border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400 font-semibold hover:bg-white/80 dark:hover:bg-gray-900/80 backdrop-blur-md transition-all"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}