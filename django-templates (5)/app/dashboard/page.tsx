"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { postsService } from "@/lib/posts"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, BarChart2, TrendingUp, Users, ThumbsUp } from "lucide-react"
import { motion } from "framer-motion"

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalComments: 0,
    totalUsers: 0,
    recentPosts: [],
    popularPosts: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch posts
        const posts = await postsService.getPosts()

        // Calculate stats
        const totalPosts = posts.length
        const totalLikes = posts.reduce((sum, post) => sum + (post.get_likes || 0), 0)

        // Get recent posts (last 5)
        const recentPosts = [...posts]
          .sort(
            (a, b) => new Date(b.pub_date || b.updated_at).getTime() - new Date(a.pub_date || a.updated_at).getTime(),
          )
          .slice(0, 5)

        // Get popular posts (top 5 by likes)
        const popularPosts = [...posts].sort((a, b) => (b.get_likes || 0) - (a.get_likes || 0)).slice(0, 5)

        setStats({
          totalPosts,
          totalLikes,
          totalComments: 0, // We don't have this data yet
          totalUsers: 0, // We don't have this data yet
          recentPosts,
          popularPosts,
        })
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // API endpoints data
  const endpoints = [
    { id: 1, name: "Users", path: "/api/users/", method: "GET", description: "List all users" },
    { id: 2, name: "User Detail", path: "/api/users/:id/", method: "GET", description: "Get user details" },
    { id: 3, name: "Create User", path: "/api/users/", method: "POST", description: "Create a new user" },
    { id: 4, name: "Update User", path: "/api/users/:id/", method: "PUT", description: "Update user details" },
    { id: 5, name: "Delete User", path: "/api/users/:id/", method: "DELETE", description: "Delete a user" },
    { id: 6, name: "Posts", path: "/api/posts/", method: "GET", description: "List all posts" },
  ]

  // Animation variants
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
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.h1
        className="text-3xl font-bold mb-8 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dashboard
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
                <div className="text-2xl font-bold dark:text-white">{stats.totalPosts}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.totalPosts > 10 ? "+10% from last month" : "Just getting started"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Total Likes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <ThumbsUp className="h-5 w-5 text-green-500 mr-2" />
                <div className="text-2xl font-bold dark:text-white">{stats.totalLikes}</div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.totalLikes > 20 ? "+15% from last month" : "Keep creating great content"}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Engagement Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
                <div className="text-2xl font-bold dark:text-white">
                  {stats.totalPosts ? Math.round((stats.totalLikes / stats.totalPosts) * 10) / 10 : 0}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Avg. likes per post</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="dark:bg-gray-800 transition-all duration-300 hover:shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium dark:text-white">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-orange-500 mr-2" />
                <div className="text-2xl font-bold dark:text-white">
                  {/* Placeholder value */}
                  {Math.max(5, Math.floor(stats.totalPosts / 2))}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Users with recent activity</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="recent" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Posts</TabsTrigger>
            <TabsTrigger value="popular">Popular Posts</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Latest Activity</CardTitle>
                <CardDescription>The most recent posts on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.recentPosts.length > 0 ? (
                    stats.recentPosts.map((post: any, index: number) => (
                      <motion.div
                        key={post.id}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-1">
                          <h3 className="font-medium dark:text-white">
                            <a href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                              {post.title}
                            </a>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            By {post.author} • {new Date(post.pub_date || post.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.get_likes || 0}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">No posts yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="popular">
            <Card>
              <CardHeader>
                <CardTitle>Most Popular</CardTitle>
                <CardDescription>Posts with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats.popularPosts.length > 0 ? (
                    stats.popularPosts.map((post: any, index: number) => (
                      <motion.div
                        key={post.id}
                        className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex-1">
                          <h3 className="font-medium dark:text-white">
                            <a href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                              {post.title}
                            </a>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            By {post.author} • {new Date(post.pub_date || post.updated_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center text-sm font-medium text-green-600 dark:text-green-400">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {post.get_likes || 0}
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-center py-4 text-muted-foreground">No posts yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-white">API Endpoints</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Name</th>
                <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Path</th>
                <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Method</th>
                <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody>
              {endpoints.map((endpoint) => (
                <tr
                  key={endpoint.id}
                  className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3 border dark:border-gray-600 dark:text-white">{endpoint.name}</td>
                  <td className="p-3 border font-mono text-sm dark:border-gray-600 dark:text-white">{endpoint.path}</td>
                  <td className="p-3 border dark:border-gray-600">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium transition-colors
                      ${
                        endpoint.method === "GET"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : endpoint.method === "POST"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : endpoint.method === "PUT"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : endpoint.method === "DELETE"
                                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="p-3 border dark:border-gray-600 dark:text-white">{endpoint.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

