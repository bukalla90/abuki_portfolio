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
            className="relative"
          >
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-1">
              <div className="w-full h-full rounded-3xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <div className="text-8xl">👨‍💻</div>
              </div>
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-2xl blur-xl opacity-50"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I&apos;m a passionate full-stack developer with a deep love for creating
              elegant, scalable solutions that solve real-world problems. My
              journey in software development is driven by a relentless curiosity
              and a commitment to clean, maintainable code.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              With expertise across the entire development stack, I specialize in
              building modern web and mobile applications that deliver exceptional
              user experiences. I believe in writing code that not only works but
              is also a joy to maintain and extend.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              When I&apos;m not coding, I&apos;m exploring new technologies, contributing to
              open-source projects, or sharing knowledge with the developer
              community. Let&apos;s build something amazing together.
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