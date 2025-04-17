"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { postsService } from "@/lib/posts"
import { useAuth } from "@/contexts/auth-context"
import PostCard from "@/components/post-card"
import { Loader2, Search, PenSquare, TrendingUp, Clock } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [feedPosts, setFeedPosts] = useState<any[]>([])
  const [tags, setTags] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("latest")
  const { user } = useAuth()

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

        // Fetch user feed if logged in
        if (user) {
          try {
            const feedData = await postsService.getUserFeed()
            setFeedPosts(feedData)
          } catch (error) {
            console.error("Failed to fetch feed:", error)
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  // Map tag IDs to tag names for display
  const getTagNames = (tagIds: number[]) => {
    return (
      tagIds?.map((id) => {
        const tag = tags.find((t) => t.id === id)
        return tag ? tag.tag_name : "Unknown"
      }) || []
    )
  }

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort posts
  const sortPosts = (postsToSort: any[]) => {
    if (sortBy === "latest") {
      return [...postsToSort].sort(
        (a, b) => new Date(b.pub_date || b.updated_at).getTime() - new Date(a.pub_date || a.updated_at).getTime(),
      )
    } else if (sortBy === "popular") {
      return [...postsToSort].sort((a, b) => (b.get_likes_count || 0) - (a.get_likes_count || 0))
    }
    return postsToSort
  }

  // Prepare posts with tag names
  const postsWithTags = sortPosts(filteredPosts).map((post) => ({
    ...post,
    tagNames: getTagNames(post.tag || []),
  }))

  // Prepare feed posts with tag names
  const feedWithTags = sortPosts(feedPosts).map((post) => ({
    ...post,
    tagNames: getTagNames(post.tag || []),
  }))

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

  return (
    <div className="container py-8 px-4 md:px-6">
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Discover the latest articles and insights</p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button asChild>
            <Link href="/posts/create">
              <PenSquare className="mr-2 h-4 w-4" />
              New Post
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all" className="transition-all duration-200">
              All Posts
            </TabsTrigger>
            {user && (
              <TabsTrigger value="feed" className="transition-all duration-200">
                My Feed
              </TabsTrigger>
            )}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Button
            variant={sortBy === "latest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("latest")}
            className="gap-1"
          >
            <Clock className="h-4 w-4" />
            Latest
          </Button>
          <Button
            variant={sortBy === "popular" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("popular")}
            className="gap-1"
          >
            <TrendingUp className="h-4 w-4" />
            Popular
          </Button>
        </div>
      </div>

      {activeTab === "all" ? (
        isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : postsWithTags.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {postsWithTags.map((post) => (
              <motion.div key={post.id || Math.random()} variants={item}>
                <PostCard post={post} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No posts found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery ? "Try a different search term" : "Be the first to create a post!"}
            </p>
            <Button asChild>
              <Link href="/posts/create">Create Post</Link>
            </Button>
          </div>
        )
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : feedWithTags.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {feedWithTags.map((post) => (
            <motion.div key={post.id || Math.random()} variants={item}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Your feed is empty</h3>
          <p className="text-muted-foreground mb-4">Follow other users to see their posts in your feed</p>
          <Button asChild>
            <Link href="/explore">Explore Users</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

