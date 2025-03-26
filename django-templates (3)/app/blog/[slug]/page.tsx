"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { postsService } from "@/lib/posts"
import { ArrowLeft, Calendar, Clock, Share2, ThumbsUp, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import CommentSection from "@/components/comment-section"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // In a real app, you would fetch by slug
        // For now, we'll use the slug as the ID
        const postId = Number.parseInt(params.slug)
        if (isNaN(postId)) {
          throw new Error("Invalid post ID")
        }

        // Fetch post
        const postData = await postsService.getPost(postId)
        setPost(postData)

        // Fetch all posts to find related ones
        const allPosts = await postsService.getPosts()

        // Find posts with similar tags
        const related = allPosts
          .filter((p) => p.id !== postId && p.tag?.some((t: number) => postData.tag?.includes(t)))
          .slice(0, 3)

        setRelatedPosts(related)
      } catch (error) {
        console.error("Failed to fetch post:", error)
        setError("Failed to load post. It may have been deleted or you don't have permission to view it.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.slug])

  // Mock data for when API doesn't return a post
  const mockPost = {
    id: Number.parseInt(params.slug),
    title: "Understanding RESTful API Design Principles",
    content: `
      <p>RESTful API design is a crucial aspect of modern web development. When designing APIs, it's important to follow established principles to ensure your API is intuitive, efficient, and maintainable.</p>
      
      <h2>Key Principles of RESTful API Design</h2>
      
      <p>REST (Representational State Transfer) is an architectural style that defines a set of constraints for creating web services. Here are the key principles:</p>
      
      <h3>1. Statelessness</h3>
      <p>Each request from a client to the server must contain all the information needed to understand and process the request. The server should not store any client context between requests.</p>
      
      <h3>2. Client-Server Architecture</h3>
      <p>The client and server should be separate entities that communicate over a network. This separation allows each to evolve independently.</p>
      
      <h3>3. Cacheable</h3>
      <p>Responses must define themselves as cacheable or non-cacheable to prevent clients from reusing stale or inappropriate data.</p>
      
      <h3>4. Uniform Interface</h3>
      <p>The interface between clients and servers should be uniform, which simplifies the architecture and makes interactions more visible. This includes using standard HTTP methods like GET, POST, PUT, and DELETE.</p>
      
      <h3>5. Layered System</h3>
      <p>A client cannot ordinarily tell whether it is connected directly to the end server or to an intermediary along the way, allowing for load balancing and shared caches.</p>
      
      <h2>Best Practices for API Endpoints</h2>
      
      <p>When designing your API endpoints, consider the following best practices:</p>
      
      <ul>
        <li>Use nouns, not verbs, in endpoint paths</li>
        <li>Use logical nesting for related resources</li>
        <li>Handle errors gracefully with appropriate status codes</li>
        <li>Version your API to maintain backward compatibility</li>
        <li>Use pagination for large resource collections</li>
        <li>Implement proper authentication and authorization</li>
      </ul>
      
      <p>By following these principles and best practices, you can create APIs that are intuitive, efficient, and easy to maintain.</p>
    `,
    author: "Jane Smith",
    pub_date: new Date().toISOString(),
    get_likes: 42,
    tag: [1, 2, 3],
    reading_duration: 8,
    viewers: Array(156),
  }

  // Use mock data if no post is available
  const displayedPost = post || mockPost

  // Mock related posts if none are available
  const mockRelatedPosts = [
    {
      id: 201,
      title: "API Security Best Practices",
      content: "Learn how to secure your APIs with these best practices...",
      author: "John Doe",
      pub_date: new Date().toISOString(),
      get_likes: 35,
      tag: [2, 4],
    },
    {
      id: 202,
      title: "Building GraphQL APIs with Django",
      content: "Explore how to create GraphQL APIs using Django...",
      author: "Sarah Johnson",
      pub_date: new Date().toISOString(),
      get_likes: 28,
      tag: [1, 3],
    },
    {
      id: 203,
      title: "Microservices vs Monoliths",
      content: "Compare the pros and cons of microservices and monolithic architectures...",
      author: "Michael Brown",
      pub_date: new Date().toISOString(),
      get_likes: 31,
      tag: [3, 5],
    },
  ]

  const displayedRelatedPosts = relatedPosts.length > 0 ? relatedPosts : mockRelatedPosts

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-red-800 dark:text-red-300 mb-2">Error</h2>
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-8 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {displayedPost.tag?.map((tagId: number, index: number) => (
                <Badge key={index} variant="outline">
                  {`Tag ${tagId}`}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{displayedPost.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(displayedPost.pub_date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {displayedPost.reading_duration} min read
              </div>
              <div className="flex items-center">
                <ThumbsUp className="mr-1 h-4 w-4" />
                {displayedPost.get_likes} likes
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                {displayedPost.viewers?.length || 156} views
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt={displayedPost.author} />
                <AvatarFallback>{displayedPost.author?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{displayedPost.author}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Author</div>
              </div>
            </div>
          </div>

          <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=400&width=800"
              alt={displayedPost.title}
              fill
              className="object-cover"
            />
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: displayedPost.content }}
          />

          <Separator className="my-8" />

          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <Button variant={false ? "default" : "outline"} size="sm" onClick={() => {}}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like ({displayedPost.get_likes})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById("comments")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Comment
              </Button>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                alert("Link copied to clipboard!")
              }}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>

          <div id="comments">
            <CommentSection postId={displayedPost.id} />
          </div>
        </div>

        <div className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedRelatedPosts.map((relatedPost, index) => (
              <motion.div
                key={relatedPost.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      <Link href={`/blog/${relatedPost.id}`} className="hover:text-blue-600 transition-colors">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {relatedPost.content.replace(/<[^>]*>?/gm, "").substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{relatedPost.author}</span>
                      <span>{new Date(relatedPost.pub_date).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

