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
      const isDark = document.documentElement.classList.contains('dark');
      
      // Slow propagation speed
      const propagationSpeed = 0.5;
      
      // Horizontal dotted lines
      const horizontalLineSpacing = 50;
      const horizontalLineCount = Math.floor(height / horizontalLineSpacing) + 2;
      
      for (let lineIndex = 0; lineIndex < horizontalLineCount; lineIndex++) {
        const y = lineIndex * horizontalLineSpacing;
        const phaseOffset = lineIndex * 0.2;
        
        const dotSpacing = 12;
        const dotCount = Math.floor(width / dotSpacing);
        
        for (let i = 0; i < dotCount; i++) {
          const x = i * dotSpacing;
          
          // Slow gentle wave propagation
          const wavePhase = (x / width) * Math.PI * 2 - time * propagationSpeed + phaseOffset;
          
          // Soft heartbeat pattern
          const heartbeatCycle = (wavePhase % (Math.PI * 2)) / (Math.PI * 2);
          let intensity = 0;
          
          if (heartbeatCycle < 0.08) {
            // Gentle pulse
            intensity = Math.sin((heartbeatCycle / 0.08) * Math.PI) * 0.6;
          } else if (heartbeatCycle < 0.12) {
            // Tiny dip
            intensity = -Math.sin(((heartbeatCycle - 0.08) / 0.04) * Math.PI) * 0.15;
          } else {
            // Very subtle baseline
            intensity = Math.sin(heartbeatCycle * 10) * 0.05;
          }
          
          // Subtle vertical wave
          const verticalWave = Math.sin(x * 0.01 + time * 0.8 + phaseOffset) * 10;
          const modulatedY = y + verticalWave * intensity;
          
          // Small dots
          const dotSize = 1 + intensity * 2;
          const alpha = 0.08 + intensity * 0.25;
          
          if (alpha > 0.06) {
            if (isDark) {
              ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.6})`;
            }
            
            ctx.beginPath();
            ctx.arc(x, modulatedY, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      // Vertical dotted lines
      const verticalLineSpacing = 70;
      const verticalLineCount = Math.floor(width / verticalLineSpacing) + 2;
      
      for (let lineIndex = 0; lineIndex < verticalLineCount; lineIndex++) {
        const x = lineIndex * verticalLineSpacing;
        const phaseOffset = lineIndex * 0.25;
        
        const dotSpacing = 12;
        const dotCount = Math.floor(height / dotSpacing);
        
        for (let i = 0; i < dotCount; i++) {
          const y = i * dotSpacing;
          
          // Slow gentle wave from top to bottom
          const wavePhase = (y / height) * Math.PI * 2 - time * propagationSpeed * 0.8 + phaseOffset;
          const heartbeatCycle = (wavePhase % (Math.PI * 2)) / (Math.PI * 2);
          let intensity = 0;
          
          if (heartbeatCycle < 0.08) {
            intensity = Math.sin((heartbeatCycle / 0.08) * Math.PI) * 0.5;
          } else if (heartbeatCycle < 0.12) {
            intensity = -Math.sin(((heartbeatCycle - 0.08) / 0.04) * Math.PI) * 0.12;
          } else {
            intensity = Math.sin(heartbeatCycle * 10) * 0.04;
          }
          
          const horizontalWave = Math.sin(y * 0.01 + time * 0.7 + phaseOffset) * 8;
          const modulatedX = x + horizontalWave * intensity;
          
          const dotSize = 1 + intensity * 1.5;
          const alpha = 0.06 + intensity * 0.2;
          
          if (alpha > 0.05) {
            if (isDark) {
              ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.5})`;
            }
            
            ctx.beginPath();
            ctx.arc(modulatedX, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      
      time += 0.01; // Slower animation
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-cyan-50/20 to-emerald-50/20 dark:from-gray-950 dark:via-cyan-950/10 dark:to-emerald-950/10"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 z-10 pointer-events-none" />

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
          className="mt-6 text-xl sm:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium"
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