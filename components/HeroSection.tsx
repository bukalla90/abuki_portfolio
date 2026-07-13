"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasRef.current.appendChild(renderer.domElement);

    // Create wave geometry
    const geometry = new THREE.PlaneGeometry(15, 15, 128, 128);
    geometry.rotateX(-Math.PI / 2.5);
    
    const material = new THREE.MeshPhongMaterial({
      color: 0x00bcd4,
      emissive: 0x00838f,
      shininess: 30,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });

    const wave = new THREE.Mesh(geometry, material);
    scene.add(wave);

    // Add multiple wave layers for depth
    const geometry2 = new THREE.PlaneGeometry(15, 15, 96, 96);
    geometry2.rotateX(-Math.PI / 2.5);
    
    const material2 = new THREE.MeshPhongMaterial({
      color: 0x00e676,
      emissive: 0x009624,
      shininess: 20,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const wave2 = new THREE.Mesh(geometry2, material2);
    scene.add(wave2);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00bcd4, 1);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0x00e676, 0.8);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    // Camera position
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Animate first wave layer
      const positions = geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Complex wave pattern with multiple frequencies
        const wave1 = Math.sin(x * 1.5 + elapsedTime * 1.2) * 0.5;
        const wave2 = Math.cos(y * 1.8 + elapsedTime * 0.8) * 0.4;
        const wave3 = Math.sin((x + y) * 1.2 + elapsedTime * 1.5) * 0.3;
        
        positions.setZ(i, wave1 + wave2 + wave3);
      }
      positions.needsUpdate = true;
      
      // Animate second wave layer with offset
      const positions2 = geometry2.attributes.position;
      for (let i = 0; i < positions2.count; i++) {
        const x = positions2.getX(i);
        const y = positions2.getY(i);
        
        const wave1 = Math.sin(x * 1.3 + elapsedTime * 0.9 + 1) * 0.6;
        const wave2 = Math.cos(y * 1.6 + elapsedTime * 1.1 + 1) * 0.5;
        const wave3 = Math.sin((x - y) * 1.4 + elapsedTime * 1.3) * 0.35;
        
        positions2.setZ(i, wave1 + wave2 + wave3);
      }
      positions2.needsUpdate = true;
      
      // Rotate waves slowly
      wave.rotation.z += 0.0003;
      wave2.rotation.z -= 0.0002;
      
      // Camera follows mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
      camera.position.y += (8 + mouseY * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, -1);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      canvasRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      geometry.dispose();
      geometry2.dispose();
      material.dispose();
      material2.dispose();
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Wave Canvas */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
        style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.95), rgba(236,254,255,0.9), rgba(236,253,245,0.9))' }}
      />
      
      {/* Dark mode overlay */}
      <div className="absolute inset-0 z-10 dark:block hidden" 
        style={{ 
          background: 'linear-gradient(to bottom right, rgba(3,7,18,0.85), rgba(8,51,68,0.8), rgba(2,44,34,0.8))',
          mixBlendMode: 'multiply'
        }} 
      />

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-white/90 dark:to-gray-950/90" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
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
          className="mt-6 text-xl sm:text-2xl text-gray-800 dark:text-gray-100 max-w-3xl mx-auto leading-relaxed font-medium backdrop-blur-sm"
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

        {/* Floating decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-3 h-3 bg-cyan-400/50 rounded-full blur-sm hidden lg:block z-40"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 right-10 w-4 h-4 bg-emerald-400/50 rounded-full blur-sm hidden lg:block z-40"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-40 right-20 w-2 h-2 bg-blue-400/40 rounded-full blur-sm hidden lg:block z-40"
        />
      </motion.div>
    </section>
  );
}