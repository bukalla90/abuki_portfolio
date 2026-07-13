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
    
    // Array to store multiple propagating waves
    const waves: Array<{
      startTime: number;
      x: number;
      y: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.fillStyle = document.documentElement.classList.contains('dark')
        ? 'rgba(3, 7, 18, 0.15)'
        : 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      
      // Heartbeat timing
      const heartbeatInterval = 1.2; // Time between beats
      const currentBeatCycle = Math.floor(time / heartbeatInterval);
      const beatProgress = (time % heartbeatInterval) / heartbeatInterval;
      
      // Create new wave at each heartbeat
      if (beatProgress < 0.05 && waves.length === 0 || 
          (waves.length > 0 && currentBeatCycle > Math.floor(waves[waves.length - 1].startTime / heartbeatInterval))) {
        // Add multiple origin points for each beat
        const origins = [
          { x: width * 0.3, y: height * 0.4 },
          { x: width * 0.7, y: height * 0.6 },
          { x: width * 0.5, y: height * 0.3 },
          { x: width * 0.5, y: height * 0.7 },
          { x: width * 0.2, y: height * 0.5 },
          { x: width * 0.8, y: height * 0.5 },
        ];
        
        origins.forEach(origin => {
          waves.push({
            startTime: time,
            x: origin.x,
            y: origin.y,
          });
        });
      }
      
      // Remove old waves (after they've expanded beyond screen)
      for (let i = waves.length - 1; i >= 0; i--) {
        const waveAge = time - waves[i].startTime;
        if (waveAge > 3) { // Remove after 3 seconds
          waves.splice(i, 1);
        }
      }
      
      // Draw all propagating waves
      waves.forEach(wave => {
        const waveAge = time - wave.startTime;
        
        // Heartbeat-style propagation: fast expansion with decay
        const expansionCurve = (t: number) => {
          // Rapid expansion at first, then slows down
          return t * 800 * Math.exp(-t * 0.5);
        };
        
        const radius = expansionCurve(waveAge);
        const maxRadius = Math.max(width, height) * 1.5;
        
        // Only draw if within visible range
        if (radius < maxRadius) {
          // Opacity decays over time
          const baseAlpha = Math.max(0, 1 - (waveAge / 3));
          
          // Draw dots in concentric circles
          const dotCount = Math.floor(radius * 0.8);
          const spacing = (Math.PI * 2) / dotCount;
          
          for (let i = 0; i < dotCount; i++) {
            const angle = i * spacing + waveAge * 0.5; // Slight rotation over time
            const dotRadius = radius;
            
            const x = wave.x + Math.cos(angle) * dotRadius;
            const y = wave.y + Math.sin(angle) * dotRadius;
            
            // Vary dot size based on position in circle
            const dotSize = 2 + Math.sin(i * 0.5 + waveAge) * 1;
            const alpha = baseAlpha * (0.5 + Math.sin(i * 0.3) * 0.5);
            
            // Color gradient from cyan to emerald based on angle
            const colorMix = (Math.sin(angle + waveAge) + 1) / 2;
            
            if (document.documentElement.classList.contains('dark')) {
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
            ctx.arc(x, y, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
          
          // Draw multiple rings for each wave
          const ringCount = 3;
          for (let ring = 1; ring <= ringCount; ring++) {
            const ringRadius = radius - ring * 30;
            if (ringRadius > 0 && ringRadius < maxRadius) {
              const ringAlpha = baseAlpha * (1 - ring * 0.2);
              const ringDotCount = Math.floor(ringRadius * 0.6);
              const ringSpacing = (Math.PI * 2) / ringDotCount;
              
              for (let i = 0; i < ringDotCount; i++) {
                const angle = i * ringSpacing - waveAge * 0.3;
                const x = wave.x + Math.cos(angle) * ringRadius;
                const y = wave.y + Math.sin(angle) * ringRadius;
                
                const dotSize = 1.5 + Math.cos(i * 0.7) * 0.5;
                const alpha = ringAlpha * (0.4 + Math.cos(i * 0.4 + ring) * 0.6);
                
                if (document.documentElement.classList.contains('dark')) {
                  ctx.fillStyle = `rgba(6, 182, 212, ${alpha})`;
                } else {
                  ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.7})`;
                }
                
                ctx.beginPath();
                ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                ctx.fill();
              }
            }
          }
        }
      });
      
      // Add central pulse glow
      const heartbeatIntensity = Math.abs(Math.sin(time * Math.PI / heartbeatInterval));
      if (heartbeatIntensity > 0.8) {
        const pulseAlpha = (heartbeatIntensity - 0.8) * 5;
        
        waves.forEach(wave => {
          const waveAge = time - wave.startTime;
          if (waveAge < 0.1) {
            ctx.beginPath();
            ctx.arc(wave.x, wave.y, 20, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(wave.x, wave.y, 0, wave.x, wave.y, 20);
            gradient.addColorStop(0, document.documentElement.classList.contains('dark') 
              ? `rgba(6, 182, 212, ${pulseAlpha})` 
              : `rgba(6, 182, 212, ${pulseAlpha * 0.7})`);
            gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        });
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
      {/* Propagating Dots Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/30 via-transparent to-white/30 dark:from-gray-950/30 dark:via-transparent dark:to-gray-950/30 pointer-events-none" />

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