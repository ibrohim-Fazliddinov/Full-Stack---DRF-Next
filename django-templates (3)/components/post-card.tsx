"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { ThumbsUp, Clock, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

type PostCardProps = {
  post: {
    id: number
    title: string
    content: string
    author: string
    pub_date: string
    get_likes: number
    tag?: number[]
    tagNames?: string[]
  }
}

export default function PostCard({ post }: PostCardProps) {
  // Get a preview of the content (first 150 characters)
  const contentPreview = post.content.length > 150 ? post.content.substring(0, 150) + "..." : post.content

  // Format the date
  const formattedDate = post.pub_date ? formatDistanceToNow(new Date(post.pub_date), { addSuffix: true }) : "Recently"

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src="/placeholder.svg?height=200&width=400"
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-blue-600 text-white hover:bg-blue-700">
              <ThumbsUp className="h-3 w-3 mr-1" />
              {post.get_likes}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-2">
            {post.tagNames && post.tagNames.length > 0 && (
              <Badge
                variant="outline"
                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800"
              >
                {post.tagNames[0]}
              </Badge>
            )}
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
          </div>

          <h2 className="text-xl font-bold mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            <Link href={`/posts/${post.id}`} className="hover:underline">
              {post.title}
            </Link>
          </h2>

          <p className="text-sm mb-4 line-clamp-3 flex-grow text-gray-600 dark:text-gray-300">{contentPreview}</p>

          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="text-sm text-muted-foreground flex items-center">
              <User className="h-3 w-3 mr-1" />
              {post.author}
            </div>
            <Link
              href={`/posts/${post.id}`}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Read more →
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

