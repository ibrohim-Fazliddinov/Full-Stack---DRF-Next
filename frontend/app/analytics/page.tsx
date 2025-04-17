"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { postsService } from "@/lib/posts"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, BarChart2, Eye, MessageSquare, ThumbsUp, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import AnalyticsCard from "@/components/analytics-card"

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalLikes: 0,
    totalViews: 0,
    totalComments: 0,
    postsPerDay: [],
    likesPerDay: [],
    viewsPerDay: [],
    topPosts: [],
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
        const totalViews = posts.reduce((sum, post) => sum + (post.viewers?.length || 0), 0)

        // Get top posts (by likes)
        const topPosts = [...posts].sort((a, b) => (b.get_likes || 0) - (a.get_likes || 0)).slice(0, 5)

        // Generate mock time series data
        const today = new Date()
        const postsPerDay = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today)
          date.setDate(date.getDate() - (6 - i))
          return {
            date: date.toISOString().split("T")[0],
            count: Math.floor(Math.random() * 5),
          }
        })

        const likesPerDay = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today)
          date.setDate(date.getDate() - (6 - i))
          return {
            date: date.toISOString().split("T")[0],
            count: Math.floor(Math.random() * 20),
          }
        })

        const viewsPerDay = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today)
          date.setDate(date.getDate() - (6 - i))
          return {
            date: date.toISOString().split("T")[0],
            count: Math.floor(Math.random() * 50),
          }
        })

        setStats({
          totalPosts,
          totalLikes,
          totalViews,
          totalComments: Math.floor(totalPosts * 1.5), // Mock data
          postsPerDay,
          likesPerDay,
          viewsPerDay,
          topPosts,
        })
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

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
        className="text-3xl font-bold mb-2 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Analytics
      </motion.h1>

      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Track your content performance and user engagement
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <AnalyticsCard
            title="Total Posts"
            value={stats.totalPosts}
            description="All time published content"
            icon={<BarChart2 className="h-5 w-5" />}
            color="#3b82f6"
            trend={12}
          />
        </motion.div>

        <motion.div variants={item}>
          <AnalyticsCard
            title="Total Likes"
            value={stats.totalLikes}
            description="Engagement from users"
            icon={<ThumbsUp className="h-5 w-5" />}
            color="#10b981"
            trend={8}
          />
        </motion.div>

        <motion.div variants={item}>
          <AnalyticsCard
            title="Total Views"
            value={stats.totalViews}
            description="Content impressions"
            icon={<Eye className="h-5 w-5" />}
            color="#8b5cf6"
            trend={15}
          />
        </motion.div>

        <motion.div variants={item}>
          <AnalyticsCard
            title="Comments"
            value={stats.totalComments}
            description="User discussions"
            icon={<MessageSquare className="h-5 w-5" />}
            color="#f59e0b"
            trend={-3}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="views">Views</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle>Posts Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {stats.postsPerDay.map((day, index) => (
                    <div key={day.date} className="flex flex-col items-center">
                      <div className="flex-1 w-full flex items-end">
                        <motion.div
                          className="w-12 bg-blue-500 rounded-t-md"
                          style={{ height: `${(day.count / 5) * 200}px` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.count / 5) * 200}px` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                      </div>
                      <div className="text-xs font-medium">{day.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="engagement">
            <Card>
              <CardHeader>
                <CardTitle>Likes Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {stats.likesPerDay.map((day, index) => (
                    <div key={day.date} className="flex flex-col items-center">
                      <div className="flex-1 w-full flex items-end">
                        <motion.div
                          className="w-12 bg-green-500 rounded-t-md"
                          style={{ height: `${(day.count / 20) * 200}px` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.count / 20) * 200}px` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                      </div>
                      <div className="text-xs font-medium">{day.count}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="views">
            <Card>
              <CardHeader>
                <CardTitle>Views Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {stats.viewsPerDay.map((day, index) => (
                    <div key={day.date} className="flex flex-col items-center">
                      <div className="flex-1 w-full flex items-end">
                        <motion.div
                          className="w-12 bg-purple-500 rounded-t-md"
                          style={{ height: `${(day.count / 50) * 200}px` }}
                          initial={{ height: 0 }}
                          animate={{ height: `${(day.count / 50) * 200}px` }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {new Date(day.date).toLocaleDateString(undefined, { weekday: "short" })}
                      </div>
                      <div className="text-xs font-medium">{day.count}</div>
                    </div>
                  ))}
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
        <h2 className="text-2xl font-bold mt-12 mb-6 dark:text-white">Top Performing Content</h2>

        <Card>
          <CardContent className="p-0">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="text-left p-4 border-b dark:border-gray-600 dark:text-white">Post Title</th>
                  <th className="text-center p-4 border-b dark:border-gray-600 dark:text-white">Views</th>
                  <th className="text-center p-4 border-b dark:border-gray-600 dark:text-white">Likes</th>
                  <th className="text-center p-4 border-b dark:border-gray-600 dark:text-white">Comments</th>
                  <th className="text-center p-4 border-b dark:border-gray-600 dark:text-white">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.topPosts.map((post: any, index: number) => (
                  <motion.tr
                    key={post.id}
                    className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="p-4 dark:text-white">
                      <a href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors font-medium">
                        {post.title}
                      </a>
                    </td>
                    <td className="p-4 text-center dark:text-white">
                      <div className="flex items-center justify-center">
                        <Eye className="h-4 w-4 text-purple-500 mr-2" />
                        {post.viewers?.length || Math.floor(Math.random() * 100)}
                      </div>
                    </td>
                    <td className="p-4 text-center dark:text-white">
                      <div className="flex items-center justify-center">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                        {post.get_likes || 0}
                      </div>
                    </td>
                    <td className="p-4 text-center dark:text-white">
                      <div className="flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-orange-500 mr-2" />
                        {Math.floor(Math.random() * 10)}
                      </div>
                    </td>
                    <td className="p-4 text-center dark:text-white">
                      <div className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                        {new Date(post.pub_date || post.updated_at).toLocaleDateString()}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

