"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Shield, Zap, Users, Boxes, BarChart4, Code, Layers, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function FeaturesPage() {
  const mainFeatures = [
    {
      title: "RESTful API Endpoints",
      description: "Build powerful applications with our fully featured RESTful API endpoints",
      icon: <Code className="h-12 w-12 text-blue-600" />,
    },
    {
      title: "Authentication & Authorization",
      description: "Secure your application with our robust authentication and authorization system",
      icon: <Shield className="h-12 w-12 text-green-600" />,
    },
    {
      title: "Blazing Fast Performance",
      description: "Enjoy lightning-fast response times with our optimized backend infrastructure",
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
    },
    {
      title: "User Management",
      description: "Complete user management system with profiles, verification, and more",
      icon: <Users className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Content Management",
      description: "Flexible content management with support for various media types",
      icon: <Boxes className="h-12 w-12 text-red-600" />,
    },
    {
      title: "Detailed Analytics",
      description: "Gain insights into your application with comprehensive analytics",
      icon: <BarChart4 className="h-12 w-12 text-indigo-600" />,
    },
  ]

  const additionalFeatures = [
    "Multiple authentication methods",
    "Role-based access control",
    "Social login integration",
    "Webhooks for real-time events",
    "Customizable email templates",
    "Comprehensive logging",
    "Rate limiting and throttling",
    "Versioned API endpoints",
    "Automatic backups",
    "Caching mechanisms",
    "Data export and import",
    "Extensive documentation",
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features for Modern Applications</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Our platform provides everything you need to build, deploy, and scale your applications with ease.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ staggerChildren: 0.1 }}
      >
        {mainFeatures.map((feature, index) => (
          <motion.div key={index} variants={item} className="h-full">
            <Card
              className="h-full transition-all duration-300 hover:shadow-lg border-t-4"
              style={{ borderTopColor: feature.icon.props.className.split(" ").pop() }}
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row gap-16 mb-24 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Comprehensive API Platform</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Our platform provides a complete solution for your API needs. With powerful endpoints, robust security, and
            comprehensive documentation, you can build incredible applications with ease.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {additionalFeatures.slice(0, 6).map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="h-5 w-5 text-green-600 mr-2 mt-1" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="aspect-square max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-xl">
              <Layers className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">API Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Our layered architecture ensures your application is both scalable and maintainable.
              </p>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 font-mono text-sm overflow-hidden">
                <pre className="text-gray-800 dark:text-gray-200">
                  {`GET /api/users
Authorization: Bearer {token}

{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    ...
  ],
  "pagination": {
    "total": 42,
    "pages": 3,
    "page": 1
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col-reverse md:flex-row gap-16 mb-24 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-1/2 relative">
          <div className="aspect-video max-w-md mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-8 rounded-xl shadow-xl">
              <Globe className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Scaling</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Scale your application globally with our distributed infrastructure.
              </p>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=240&width=400"
                  alt="Global infrastructure"
                  width={400}
                  height={240}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Enterprise-Grade Security</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Your data is safe with us. Our platform employs industry-leading security practices to ensure your
            information is protected at all times.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {additionalFeatures.slice(6, 12).map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Check className="h-5 w-5 text-green-600 mr-2 mt-1" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="bg-blue-600 text-white rounded-xl p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of developers who trust our platform for their application needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            <Link href="/pricing">View Pricing</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-blue-500">
            <Link href="/docs">Explore API Docs</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

