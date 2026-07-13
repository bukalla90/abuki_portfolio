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
      
      // Trail effect - clear with opacity for smooth movement
      ctx.fillStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(3, 7, 18, 0.05)'
        : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const isDark = document.documentElement.classList.contains('dark');
      
      // Multiple diagonal lines at different angles
      const diagonalLines = [
        { angle: 35, spacing: 80 },
        { angle: -35, spacing: 80 },
        { angle: 55, spacing: 100 },
        { angle: -55, spacing: 100 },
      ];
      
      diagonalLines.forEach(({ angle, spacing }) => {
        const angleRad = (angle * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);
        
        // Calculate how many lines we need
        const diagonalLength = Math.sqrt(width * width + height * height);
        const lineCount = Math.floor(diagonalLength / spacing) + 2;
        
        for (let line = 0; line < lineCount; line++) {
          // Starting point offset for each line
          const offset = line * spacing - diagonalLength / 2;
          
          // Draw dots along this diagonal line
          const dotSpacing = 4;
          const dotCount = Math.floor(diagonalLength / dotSpacing);
          
          for (let i = 0; i < dotCount; i++) {
            const distance = i * dotSpacing - diagonalLength / 2;
            
            // Calculate position on the line
            let x, y;
            
            if (angle > 0) {
              x = width / 2 + (distance * cos - offset * sin);
              y = height / 2 + (distance * sin + offset * cos);
            } else {
              x = width / 2 + (distance * cos - offset * sin);
              y = height / 2 + (distance * sin + offset * cos);
            }
            
            // Only draw if on screen
            if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
              // Propagation wave traveling along the line
              const wavePosition = (distance / diagonalLength) * Math.PI * 3 - time * 0.6 + line * 0.3;
              
              // Heartbeat pulse shape
              const cycle = (wavePosition % (Math.PI * 2)) / (Math.PI * 2);
              let intensity = 0;
              
              if (cycle < 0.06) {
                // Sharp pulse
                intensity = Math.sin((cycle / 0.06) * Math.PI) * 0.7;
              } else if (cycle < 0.08) {
                // Quick dip
                intensity = -Math.sin(((cycle - 0.06) / 0.02) * Math.PI) * 0.15;
              } else {
                // Gentle rest
                intensity = Math.sin(cycle * 6) * 0.04;
              }
              
              // Wave wobble perpendicular to the line
              const wobble = Math.sin(distance * 0.01 + time * 0.4 + line) * 3 * intensity;
              
              // Adjust position with wobble
              const finalX = x + wobble * Math.cos(angleRad + Math.PI / 2);
              const finalY = y + wobble * Math.sin(angleRad + Math.PI / 2);
              
              const dotSize = 1.5 + intensity * 2.5;
              const alpha = 0.15 + intensity * 0.5;
              
              if (alpha > 0.1) {
                // Color varies based on line angle and position
                const colorMix = (Math.sin(distance * 0.005 + line) + 1) / 2;
                
                if (isDark) {
                  const r = Math.floor(6 + colorMix * 10);
                  const g = Math.floor(182 - colorMix * 166);
                  const b = Math.floor(212 - colorMix * 83);
                  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                } else {
                  const r = Math.floor(6 + colorMix * 10);
                  const g = Math.floor(182 - colorMix * 166);
                  const b = Math.floor(212 - colorMix * 83);
                  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.8})`;
                }
                
                ctx.beginPath();
                ctx.arc(finalX, finalY, dotSize, 0, Math.PI * 2);
                ctx.fill();
              }
              
              // Brighter dots at the peak of the pulse
              if (intensity > 0.5) {
                const glowAlpha = (intensity - 0.5) * 0.6;
                if (isDark) {
                  ctx.fillStyle = `rgba(6, 182, 212, ${glowAlpha})`;
                } else {
                  ctx.fillStyle = `rgba(6, 182, 212, ${glowAlpha * 0.7})`;
                }
                
                ctx.beginPath();
                ctx.arc(finalX, finalY, dotSize * 1.5, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      });
      
      time += 0.008;
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