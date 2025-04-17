"use client"

import Link from "next/link"
import { Twitter, Github, Linkedin, Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  const footerAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const footerItem = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto py-12 px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={footerAnimation}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div className="md:col-span-1" variants={footerItem}>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-white"></div>
              </div>
              <span className="font-bold text-xl dark:text-white">Project</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              A powerful REST API platform built with Django. Simplify your backend development with our intuitive
              tools.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com"
                className="text-gray-600 hover:text-blue-500 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://github.com"
                className="text-gray-600 hover:text-gray-900 transition-colors dark:text-gray-400 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-gray-600 hover:text-blue-700 transition-colors dark:text-gray-400 dark:hover:text-blue-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </motion.div>

          <motion.div variants={footerItem}>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-lg">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/features"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={footerItem}>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={footerItem}>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4 text-lg">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-600 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t dark:border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {currentYear} Project. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@example.com</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (123) 456-7890</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

