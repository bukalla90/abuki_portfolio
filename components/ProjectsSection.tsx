"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Buki Talk - Chat Application",
    description:
      "Real-time chat application with WebSocket integration, instant messaging, and modern UI built with React and Node.js.",
    tech: ["React", "Node.js", "WebSocket", "Real-time"],
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop",
    link: "https://buki-talk-1.onrender.com/",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Restaurant Ordering Platform",
    description:
      "Full-featured restaurant app with online ordering, Stripe payments, and admin dashboard built with Next.js and Prisma.",
    tech: ["Next.js", "Prisma", "Tailwind CSS", "Stripe"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    link: "https://my-restuarant-opal.vercel.app/",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    title: "ALIF School Management System",
    description:
      "Comprehensive LMS platform for managing students, courses, and academic operations built with Next.js and Prisma.",
    tech: ["Next.js", "Prisma", "Tailwind CSS", "PostgreSQL"],
  image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
    link: "https://alif-lms.vercel.app/",
    color: "from-purple-500 to-indigo-500",
  },
  {
    id: 4,
    title: "SaaS Analytics Dashboard",
    description:
      "Real-time analytics platform with customizable widgets, data visualization, and export capabilities.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    link: "#",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Social Media API",
    description:
      "Scalable REST API with GraphQL support, real-time notifications, and advanced caching strategies.",
    tech: ["Node.js", "Prisma", "PostgreSQL", "Redis"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    link: "#",
    color: "from-cyan-500 to-emerald-500",
  },
  {
    id: 6,
    title: "Portfolio CMS",
    description:
      "Headless CMS with drag-and-drop page builder, media optimization, and multi-tenant support.",
    tech: ["Next.js", "React", "MongoDB", "AWS S3"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    link: "#",
    color: "from-teal-500 to-cyan-500",
  },
];

export default function ProjectsSection() {
  const handleProjectClick = (link: string) => {
    if (link !== "#") {
      window.open(link, "_blank", "noopener noreferrer");
    }
  };

  return (
    <section id="projects" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work building modern web applications
          </p>
          <div className="mt-4 h-1 w-24 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => handleProjectClick(project.link)}
              className={`group relative bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700 ${
                project.link !== "#" ? "cursor-pointer" : ""
              }`}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold text-sm"
                  >
                    {project.link !== "#" ? "View Live Project" : "Coming Soon"}
                  </motion.span>
                </div>
                <div className={`absolute top-3 right-3 w-3 h-3 rounded-full bg-gradient-to-r ${project.color}`} />
                
                {/* Live badge for real projects */}
                {project.link !== "#" && (
                  <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    Live
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link !== "#" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Visit Site
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}