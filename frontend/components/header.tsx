"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { motion, AnimatePresence } from "framer-motion"

export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" },
  ]

  return (
    <header
      className={`w-full bg-purple-600 text-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  className="h-5 w-5 rounded-full bg-white"
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    duration: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
              <span className="font-bold text-xl group-hover:text-white/90 transition-colors">Project</span>
            </Link>

            <nav className="hidden md:flex items-center ml-10 space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white hover:text-white/80 transition-colors relative ${
                    pathname === item.href ? "font-medium" : ""
                  }`}
                >
                  {item.label}
                  {pathname === item.href && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white rounded-full"
                      layoutId="navIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />

            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" className="text-white hover:text-white/80" asChild>
                  <Link href="/profile">Profile</Link>
                </Button>
                <Button variant="ghost" className="text-white hover:text-white/80" onClick={() => logout()}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" className="text-white hover:text-white/80" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </div>
            )}

            <button className="md:hidden text-white" onClick={toggleMenu} aria-label="Toggle menu">
              <div className="w-6 h-5 flex flex-col justify-between relative">
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "absolute top-1/2 -translate-y-1/2 rotate-45" : ""}`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "absolute top-1/2 -translate-y-1/2 -rotate-45" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t border-white/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.nav
                className="flex flex-col space-y-4"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`text-white hover:text-white/80 transition-colors block ${
                        pathname === item.href ? "font-medium" : ""
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {user ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.05 }}
                    >
                      <Link
                        href="/profile"
                        className="text-white hover:text-white/80 transition-colors block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (navItems.length + 1) * 0.05 }}
                    >
                      <button
                        className="text-white hover:text-white/80 transition-colors text-left block w-full"
                        onClick={() => {
                          logout()
                          setIsMenuOpen(false)
                        }}
                      >
                        Logout
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: navItems.length * 0.05 }}
                    >
                      <Link
                        href="/login"
                        className="text-white hover:text-white/80 transition-colors block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log in
                      </Link>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: (navItems.length + 1) * 0.05 }}
                    >
                      <Link
                        href="/register"
                        className="text-white hover:text-white/80 transition-colors block"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                    </motion.div>
                  </>
                )}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

