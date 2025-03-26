"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { postsService } from "@/lib/posts"
import { Calendar, Search, Clock, User } from "lucide-react"
import { motion } from "framer-motion"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch all posts
        const postsData = await postsService.getPosts()
        setPosts(postsData)

        // Fetch tags
        const tagsData = await postsService.getTags()
        setTags(tagsData)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Map tag IDs to tag names for display
  const getTagNames = (tagIds: number[]) => {
    return (
      tagIds?.map((id) => {
        const tag = tags.find((t) => t.id === id)
        return tag ? tag.tag_name : "Unknown"
      }) || []
    )
  }

  // Filter posts based on search query and active category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeCategory === "all") {
      return matchesSearch
    } else {
      const postTags = getTagNames(post.tag || [])
      return matchesSearch && postTags.includes(activeCategory)
    }
  })

  // Get unique categories from all posts
  const categories = ["all", ...new Set(posts.flatMap((post) => getTagNames(post.tag || [])))]

  // Featured posts (first 3 posts with most likes)
  const featuredPosts = [...posts].sort((a, b) => (b.get_likes || 0) - (a.get_likes || 0)).slice(0, 3)

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
    show: { opacity: 1, y: 0 },
  }

  // Mock data for recent posts if API doesn't return enough
  const mockPosts = [
    {
      id: 101,
      title: "Getting Started with Django REST Framework",
      content: "Learn how to build powerful APIs with Django REST Framework...",
      author: "Jane Smith",
      pub_date: new Date().toISOString(),
      get_likes: 42,
      tag: [1, 2],
      reading_duration: 5,
    },
    {
      id: 102,
      title: "Authentication Best Practices for APIs",
      content: "Secure your API with these authentication best practices...",
      author: "John Doe",
      pub_date: new Date().toISOString(),
      get_likes: 38,
      tag: [2, 3],
      reading_duration: 7,
    },
    {
      id: 103,
      title: "Building Scalable Microservices",
      content: "Learn how to design and implement scalable microservices architecture...",
      author: "Alex Johnson",
      pub_date: new Date().toISOString(),
      get_likes: 35,
      tag: [3, 4],
      reading_duration: 8,
    },
  ]

  // Use mock data if no posts are available
  const allPosts = posts.length > 0 ? posts : mockPosts
  const displayedFeaturedPosts = featuredPosts.length > 0 ? featuredPosts : mockPosts
  const displayedPosts = filteredPosts.length > 0 ? filteredPosts : mockPosts

  return (
    <div className="container py-12 px-4">
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Our Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
          Insights, tutorials, and updates from our team of experts
        </p>
      </motion.div>

      {/* Featured Posts */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedFeaturedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image src="/placeholder.svg?height=200&width=400" alt={post.title} fill className="object-cover" />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-blue-600 text-white">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.pub_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{post.reading_duration || 5} min read</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {post.content.replace(/<[^>]*>?/gm, "").substring(0, 150)}...
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {post.author}</span>
                    </div>

                    <Link
                      href={`/posts/${post.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                    >
                      Read more
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <TabsList className="overflow-x-auto flex-nowrap">
              {categories.slice(0, 6).map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      {/* All Posts */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
      >
        {isLoading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden">
                <div className="h-48 w-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 animate-pulse mb-4"></div>
                  <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse mb-2"></div>
                  <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 animate-pulse mb-4"></div>
                  <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse mt-auto"></div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : displayedPosts.length > 0 ? (
          displayedPosts.map((post, index) => (
            <motion.div key={post.id} variants={item} className="h-full">
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image src="/placeholder.svg?height=200&width=400" alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6 flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getTagNames(post.tag || []).map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold mb-2 line-clamp-2">
                    <Link href={`/posts/${post.id}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow">
                    {post.content.replace(/<[^>]*>?/gm, "").substring(0, 120)}...
                  </p>

                  <div className="flex justify-between items-center mt-auto text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      <span>By {post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(post.pub_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No posts found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery ? "Try a different search term or category" : "Check back soon for new content!"}
            </p>
            {searchQuery && <Button onClick={() => setSearchQuery("")}>Clear Search</Button>}
          </div>
        )}
      </motion.div>

      {/* Newsletter */}
      <motion.div
        className="bg-blue-600 text-white rounded-xl p-8 md:p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Get the latest articles, tutorials, and updates delivered straight to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email" className="bg-white text-gray-900 border-0" />
          <Button className="bg-white text-blue-600 hover:bg-gray-100">Subscribe</Button>
        </div>
      </motion.div>
    </div>
  )
}

