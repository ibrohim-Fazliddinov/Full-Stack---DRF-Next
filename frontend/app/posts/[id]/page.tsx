"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Edit, MessageSquare, Share2, ThumbsUp, Loader2 } from "lucide-react"
import { postsService } from "@/lib/posts"
import { useAuth } from "@/contexts/auth-context"
import CommentSection from "@/components/comment-section"
import { formatDistanceToNow } from "date-fns"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function PostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<any>(null)
  const [tags, setTags] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Fetch post
        const postData = await postsService.getPost(Number.parseInt(params.id))
        setPost(postData)

        // Fetch tags
        const tagsData = await postsService.getTags()
        setTags(tagsData)

        // Check if post is liked by user
        if (postData && postData.get_likes) {
          setLiked(true) // This is a simplification - in a real app you'd check if the current user has liked it
        }
      } catch (error) {
        console.error("Failed to fetch post:", error)
        setError("Failed to load post. It may have been deleted or you don't have permission to view it.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [params.id])

  const handleLike = async () => {
    if (!user) {
      setError("You must be logged in to like posts")
      return
    }

    try {
      await postsService.toggleLike("post", Number.parseInt(params.id))
      // Refresh post data to get updated like count
      const updatedPost = await postsService.getPost(Number.parseInt(params.id))
      setPost(updatedPost)
      setLiked(!liked)
    } catch (err: any) {
      setError(err.message || "Failed to like post")
    }
  }

  // Map tag IDs to tag names for display
  const getTagNames = (tagIds: number[]) => {
    return (
      tagIds?.map((id) => {
        const tag = tags.find((t) => t.id === id)
        return tag ? tag.tag_name : "Unknown"
      }) || []
    )
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container py-8">
        <Alert variant="destructive">
          <AlertDescription>{error || "Post not found"}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const tagNames = getTagNames(post.tag || [])
  const formattedDate = post.pub_date ? formatDistanceToNow(new Date(post.pub_date), { addSuffix: true }) : "Recently"
  const isAuthor = user && user.email === post.author

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to posts
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          {isAuthor && (
            <Button asChild>
              <Link href={`/posts/${post.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Post
              </Link>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {tagNames.map((tag, index) => (
            <Badge key={index} variant="secondary">
              {tag}
            </Badge>
          ))}
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {post.reading_duration} min read
          </div>
        </div>
      </div>

      <div className="relative h-[300px] md:h-[400px] w-full mb-8 rounded-lg overflow-hidden">
        <Image src="/placeholder.svg?height=400&width=800" alt={post.title} fill className="object-cover" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-8">
        <div>
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Separator className="my-8" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant={liked ? "default" : "outline"} size="sm" onClick={handleLike}>
                <ThumbsUp className="mr-2 h-4 w-4" />
                Like ({post.get_likes_count || 0})
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
            <CommentSection postId={Number.parseInt(params.id)} />
          </div>
        </div>

        <div>
          <div className="sticky top-24">
            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3 mb-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt={post.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium">
                    <Link href={`/profile/${post.author}`} className="hover:underline">
                      {post.author}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground">Author</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full" asChild>
                <Link href={`/profile/${post.author}`}>View Profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

