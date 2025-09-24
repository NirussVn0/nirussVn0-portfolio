"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [currentTime, setCurrentTime] = useState("")
  const [hasMounted, setHasMounted] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setHasMounted(true)
    
    // Initialize theme based on system preference or stored preference
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark)
    setIsDark(initialDarkMode)
    
    document.documentElement.classList.toggle("dark", initialDarkMode)
  }, [])

  useEffect(() => {
    if (!hasMounted) return
    document.documentElement.classList.toggle("dark", isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark, hasMounted])

  useEffect(() => {
    if (!hasMounted) return
    
    const updateClock = () => {
      const now = new Date()
      const utc7Time = new Date(now.getTime() + 7 * 60 * 60 * 1000)
      const hours = utc7Time.getUTCHours().toString().padStart(2, "0")
      const minutes = utc7Time.getUTCMinutes().toString().padStart(2, "0")
      const seconds = utc7Time.getUTCSeconds().toString().padStart(2, "0")
      setCurrentTime(`${hours}:${minutes}:${seconds}`)
    }

    updateClock()
    const interval = setInterval(updateClock, 1000)
    return () => clearInterval(interval)
  }, [hasMounted])

  useEffect(() => {
    if (!hasMounted) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [hasMounted])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4 p-4 border-dotted-thick border-border bg-background">
          {["intro", "work", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-3 h-8 border-dotted-thin transition-all duration-500 hover-lift ${
                activeSection === section
                  ? "bg-foreground border-foreground"
                  : "bg-transparent border-border hover:bg-muted"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => { sectionsRef.current[0] = el; }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-3 gap-8 w-full">
            {/* Left column - Main info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-5xl font-bold tracking-tight uppercase">JEREMIAH ETIANG</h1>
                  <div className="text-lg font-medium">Architect</div>
                  <div className="text-sm text-muted-foreground font-mono">Software | Sound | Systems</div>
                  <div className="text-sm text-muted-foreground">Since 1996</div>
                </div>
              </div>

              {/* Portrait placeholder */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  <div className="text-muted-foreground text-sm">Portrait</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4">
                <button className="px-6 py-2 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift">
                  Connect
                </button>
                <button className="px-6 py-2 border-dotted-thick border-border bg-background hover:bg-foreground hover:text-background hover:scale-110 transition-all duration-300 hover-lift">
                  Follow
                </button>
              </div>
            </div>

            {/* Center column - Message and contact */}
            <div className="lg:col-span-1 space-y-8">
              {/* Social icons */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="flex justify-center gap-6">
                  <div className="w-6 h-6 border border-border flex items-center justify-center text-xs hover:bg-foreground hover:text-background transition-all duration-300">
                    f
                  </div>
                  <div className="w-6 h-6 border border-border flex items-center justify-center text-xs hover:bg-foreground hover:text-background transition-all duration-300">
                    @
                  </div>
                  <div className="w-6 h-6 border border-border flex items-center justify-center text-xs hover:bg-foreground hover:text-background transition-all duration-300">
                    t
                  </div>
                </div>
              </div>

              {/* Personal message */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="space-y-4">
                  <div className="font-medium">Dearest friend,</div>
                  <p className="text-sm leading-relaxed">
                    It is such an honour to have you here. Connect with me and let's have a deep conversation, or
                    exchange wisdom over a business idea, and if it is thy faith that hath drawn thee here, follow and
                    stay ahead with the truth. Feel at home
                  </p>
                  <div className="flex gap-2 mt-4">
                    <span className="px-3 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                      Business
                    </span>
                    <span className="px-3 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                      Faith
                    </span>
                    <span className="px-3 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-all duration-300">
                      Family
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact info */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Contact</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Web:</span> jeremiahettiang.com
                    </div>
                    <div>
                      <span className="font-medium">Email:</span> info@jeremiahettiang.com
                    </div>
                    <div>
                      <span className="font-medium">Tel:</span> (256) 7550-55-568
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment info */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Pay</h3>
                  <div className="text-sm">Pay me with LightPay</div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 bg-foreground text-background text-xs">LightPay</div>
                    <div className="w-8 h-8 border border-border flex items-center justify-center">
                      <div className="w-4 h-4 bg-foreground"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right column - Business cards */}
            <div className="lg:col-span-1 space-y-8">
              {/* BlackSquare card */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <div className="space-y-4">
                  <div className="bg-foreground text-background p-4 text-center">
                    <div className="text-sm font-bold">BLACKSQUARE</div>
                    <div className="text-xs">ENTERPRISES</div>
                  </div>
                </div>
              </div>

              {/* Mind Channel card */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl hover:bg-muted transition-all duration-500">
                <div className="space-y-4 text-center">
                  <div className="text-xs tracking-wider">= = = = =</div>
                  <div className="text-2xl font-bold">MIND</div>
                  <div className="text-sm">CHANNEL</div>
                  <div className="text-2xl font-bold font-mono bg-foreground text-background px-2 py-1 inline-block">
                    {currentTime}
                  </div>
                  <div className="text-xs">UTC+7 LIVE</div>
                </div>
              </div>

              {/* Description */}
              <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
                <p className="text-xs leading-relaxed">
                  BlackSquare Enterprises is the heart of <span className="text-foreground font-medium">my</span>{" "}
                  business. We have created some amazing products over the years such as OneFund and Channel 8 News, the
                  latter is a space for the future, giving you ethereal insights into the things shaping the world
                  today. The former is a security protocol that has led to the formation of LightPay; An inclusive
                  payment system.
                </p>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => { sectionsRef.current[1] = el; }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="border-dotted-thick border-border p-6">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono mt-2">2019 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2023",
                  role: "Senior Frontend Engineer",
                  company: "Vercel",
                  description: "Leading frontend architecture for developer tools and AI-powered features.",
                  tech: ["React", "TypeScript", "Next.js"],
                },
                {
                  year: "2022",
                  role: "Frontend Engineer",
                  company: "Linear",
                  description: "Built performant interfaces for project management and team collaboration.",
                  tech: ["React", "GraphQL", "Framer Motion"],
                },
                {
                  year: "2021",
                  role: "Full Stack Developer",
                  company: "Stripe",
                  description: "Developed payment infrastructure and merchant-facing dashboard features.",
                  tech: ["Ruby", "React", "PostgreSQL"],
                },
                {
                  year: "2019",
                  role: "Software Engineer",
                  company: "Airbnb",
                  description: "Created booking flow optimizations and host management tools.",
                  tech: ["React", "Node.js", "MySQL"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group border-dotted-thick border-border p-6 hover-lift hover:bg-muted transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-12 gap-4 sm:gap-8">
                    <div className="lg:col-span-2">
                      <div className="text-xl sm:text-2xl font-bold">{job.year}</div>
                    </div>

                    <div className="lg:col-span-6 space-y-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold">{job.role}</h3>
                        <div className="text-muted-foreground font-medium">{job.company}</div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed max-w-lg">{job.description}</p>
                    </div>

                    <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                      {job.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs border border-border hover:bg-foreground hover:text-background transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thoughts"
          ref={(el) => { sectionsRef.current[2] = el; }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="border-dotted-thick border-border p-6">
              <h2 className="text-3xl sm:text-4xl font-bold uppercase">Recent Thoughts</h2>
            </div>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
              {[
                {
                  title: "The Future of Web Development",
                  excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
                  date: "Dec 2024",
                  readTime: "5 min",
                },
                {
                  title: "Design Systems at Scale",
                  excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                  date: "Nov 2024",
                  readTime: "8 min",
                },
                {
                  title: "Performance-First Development",
                  excerpt: "Why performance should be a first-class citizen in your development workflow.",
                  date: "Oct 2024",
                  readTime: "6 min",
                },
                {
                  title: "The Art of Code Review",
                  excerpt: "Building better software through thoughtful and constructive code reviews.",
                  date: "Sep 2024",
                  readTime: "4 min",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group border-dotted-thick border-border p-6 hover-lift hover:bg-muted transition-all duration-500 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => { sectionsRef.current[3] = el; }} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="border-dotted-thick border-border p-6 hover-lift hover:scale-105 hover:shadow-2xl transition-all duration-500">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl font-bold uppercase">Let's Connect</h2>

                <div className="space-y-6">
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Always interested in new opportunities, collaborations, and conversations about technology and
                    design.
                  </p>

                  <div className="space-y-4">
                    <Link
                      href="mailto:test@example.com"
                      className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    >
                      <span className="text-base sm:text-lg font-mono">test@example.com</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="border-dotted-thick border-border p-4">
                <div className="text-sm text-muted-foreground font-mono uppercase">Elsewhere</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "@felixmacaspac", url: "#" },
                  { name: "v0.dev", handle: "@felixmacaspac", url: "#" },
                  { name: "HubSpot Community", handle: "@felixmacaspac", url: "#" },
                  { name: "LinkedIn", handle: "felixmacaspac", url: "#" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    className="group border-dotted-thick border-border p-4 hover-lift hover:bg-muted transition-all duration-300"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300 font-bold">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground font-mono">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t-2 border-dotted border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono">
                © 2025 Jeremiah Etiang. All rights reserved.
              </div>
              <div className="text-xs text-muted-foreground">Built with v0.dev</div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 border-dotted-thick border-border hover:bg-muted transition-all duration-300 hover-lift"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <button className="group p-3 border-dotted-thick border-border hover:bg-muted transition-all duration-300 hover-lift">
                <svg
                  className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
