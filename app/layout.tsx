import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abubeker Oumer | Full Stack Developer",
  description:
    "Premium portfolio showcasing modern web and mobile applications built by Abubeker Oumer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-white dark:bg-gray-950 transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navigation />

          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>

          <footer className="border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Copyright */}
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} Abubeker Oumer. All rights reserved.
                </p>

                {/* Social Links */}
                <div className="flex space-x-6">

                  {/* GitHub */}
                  <a
                    href="https://github.com/bukalla90"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/abubeker-oumer-hassen-bb61b93b0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/bukalla90"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    <span className="sr-only">X</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2H21l-6.5 7.42L22 22h-6.828l-5.345-6.99L3.5 22H1l6.94-7.92L2 2h6.914l4.828 6.31L18.244 2zM17.2 20h1.5L7.2 4H5.6L17.2 20z"/>
                    </svg>
                  </a>

                  {/* Telegram 🔥 */}
                  <a
                    href="https://t.me/bukalla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                  >
                    <span className="sr-only">Telegram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.993 15.876 9.74 19.5c.364 0 .522-.156.71-.344l1.704-1.62 3.533 2.586c.648.358 1.104.17 1.27-.602l2.305-10.8.001-.001c.196-.92-.332-1.28-.964-1.04L2.07 9.66c-.9.352-.887.852-.153 1.078l4.684 1.462 10.87-6.85c.512-.317.98-.142.598.175"/>
                    </svg>
                  </a>

                </div>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}