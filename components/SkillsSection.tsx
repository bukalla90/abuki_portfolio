"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500" },
  { name: "Next.js", icon: "▲", color: "from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400" },
  { name: "Node.js", icon: "🟢", color: "from-green-400 to-green-600" },
  { name: "MongoDB", icon: "🍃", color: "from-green-500 to-emerald-600" },
  { name: "PostgreSQL", icon: "🐘", color: "from-blue-400 to-cyan-500" },
  { name: "Prisma", icon: "🔷", color: "from-cyan-400 to-emerald-500" },
  { name: "React Native", icon: "📱", color: "from-blue-500 to-cyan-500" },
  { name: "Docker", icon: "🐳", color: "from-blue-400 to-sky-500" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10 flex flex-col items-center gap-4">
                <span className="text-4xl">{skill.icon}</span>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {skill.name}
                </h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}