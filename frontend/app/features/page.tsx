"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Zap, Shield, Users, Globe, Sparkles, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"

export default function FeaturesPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Powerful Features for Modern Content
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover all the powerful features our platform offers to help you create, share, and engage with content.
        </p>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        className="relative rounded-xl overflow-hidden mb-20 bg-gradient-to-r from-blue-600 to-purple-600"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] bg-fixed"></div>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16 items-center">
          <div className="text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Create, Share, Connect</h2>
            <p className="text-white/80 text-lg">
              Our platform provides everything you need to create compelling content, share it with the world, and
              connect with your audience.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>Rich content creation tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>Powerful engagement features</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-400" />
                <span>Secure authentication system</span>
              </div>
            </div>
            <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
          <div className="relative h-[300px] lg:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-black/20 z-10 rounded-lg"></div>
            <Image src="/placeholder.svg?height=400&width=600" alt="Platform features" fill className="object-cover" />
          </div>
        </div>
      </motion.div>

      {/* Current Features */}
      <div className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Current Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the powerful tools and features already available on our platform
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.div variants={item}>
            <Card className="h-full border-t-4 border-t-blue-600 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                    <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Content Creation</CardTitle>
                </div>
                <CardDescription>Create and publish rich content with our powerful editor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Rich text editor with formatting options</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Draft saving and publishing workflow</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Tag and categorize your content</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full border-t-4 border-t-purple-600 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                    <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Social Engagement</CardTitle>
                </div>
                <CardDescription>Connect with others and build your audience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Like and comment on posts</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Follow other users</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Personalized feed of content</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="h-full border-t-4 border-t-green-600 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
                    <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>User Authentication</CardTitle>
                </div>
                <CardDescription>Secure account management and authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Email and password authentication</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Social login with Google and GitHub</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Password reset and account recovery</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Future Features */}
      <div className="mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-medium mb-4">
            Coming Soon
          </span>
          <h2 className="text-3xl font-bold mb-4">Future Roadmap</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Exciting new features we're working on to make your experience even better
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-dashed h-full hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-blue-50 dark:bg-blue-900/30">
                    <Globe className="h-5 w-5 text-blue-400" />
                  </div>
                  <CardTitle className="text-blue-400">Global Reach</CardTitle>
                </div>
                <CardDescription>Expand your audience worldwide</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Multi-language content support</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Regional content recommendations</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-blue-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Localized user experience</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-dashed h-full hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-purple-50 dark:bg-purple-900/30">
                    <Sparkles className="h-5 w-5 text-purple-400" />
                  </div>
                  <CardTitle className="text-purple-400">AI-Powered Tools</CardTitle>
                </div>
                <CardDescription>Enhance your content with AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">AI-assisted content creation</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Smart content recommendations</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-purple-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Automated content moderation</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-dashed h-full hover:border-green-300 dark:hover:border-green-700 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 rounded-full bg-green-50 dark:bg-green-900/30">
                    <Zap className="h-5 w-5 text-green-400" />
                  </div>
                  <CardTitle className="text-green-400">Advanced Analytics</CardTitle>
                </div>
                <CardDescription>Gain deeper insights into your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Detailed engagement metrics</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Audience demographics</p>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground">Content performance tracking</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
          Join thousands of content creators who trust our platform for their publishing needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
            <Link href="/register">
              Sign up now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
            <Link href="/docs">Explore Documentation</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

