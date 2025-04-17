"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { postsService, type Comment } from "@/lib/posts"
import { useAuth } from "@/contexts/auth-context"
import { formatDistanceToNow } from "date-fns"
import { ThumbsUp, Reply, Edit, Trash2, Send } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type CommentSectionProps = {
  postId: number
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [replyTo, setReplyTo] = useState<number | null>(null)
  const [editingComment, setEditingComment] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    loadComments()
  }, [postId])

  const loadComments = async () => {
    try {
      const data = await postsService.getComments(postId)
      setComments(Array.isArray(data) ? data : [])
    } catch (err: any) {
      setError("Failed to load comments")
      console.error(err)
    }
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return
    if (!user) {
      setError("You must be logged in to comment")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const commentData: Comment = {
        post: postId,
        content: newComment,
        parent: replyTo,
      }

      await postsService.createComment(postId, commentData)
      setNewComment("")
      setReplyTo(null)
      loadComments()
    } catch (err: any) {
      setError(err.message || "Failed to post comment")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditComment = async (commentId: number) => {
    if (!editContent.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      await postsService.patchComment(postId, commentId, {
        post: postId,
        content: editContent,
      })
      setEditingComment(null)
      loadComments()
    } catch (err: any) {
      setError(err.message || "Failed to edit comment")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm("Are you sure you want to delete this comment?")) return

    setIsLoading(true)
    setError(null)

    try {
      await postsService.deleteComment(postId, commentId)
      loadComments()
    } catch (err: any) {
      setError(err.message || "Failed to delete comment")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLikeComment = async (commentId: number) => {
    if (!user) {
      setError("You must be logged in to like comments")
      return
    }

    try {
      await postsService.toggleLike("comment", commentId)
      loadComments()
    } catch (err: any) {
      setError(err.message || "Failed to like comment")
    }
  }

  const startEditing = (comment: Comment) => {
    setEditingComment(comment.id || null)
    setEditContent(comment.content)
  }

  const cancelEditing = () => {
    setEditingComment(null)
    setEditContent("")
  }

  const startReplying = (commentId: number | undefined) => {
    setReplyTo(commentId || null)
    setNewComment("")
  }

  const cancelReplying = () => {
    setReplyTo(null)
  }

  // Function to render a single comment
  const renderComment = (comment: Comment) => {
    const isEditing = editingComment === comment.id
    const isAuthor = user && user.email === comment.author
    const formattedDate = comment.created_at
      ? formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })
      : "Recently"

    return (
      <Card key={comment.id} className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt={comment.author} />
              <AvatarFallback>{comment.author?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{comment.author}</h4>
                  <p className="text-xs text-muted-foreground">{formattedDate}</p>
                </div>

                {isAuthor && !isEditing && (
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => startEditing(comment)} className="h-8 px-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id!)}
                      className="h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {isEditing ? (
                <div className="mt-2">
                  <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="mb-2" />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={cancelEditing}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => handleEditComment(comment.id!)}>
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="mt-2">{comment.content}</p>

                  <div className="flex gap-4 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment.id!)}
                      className="h-8 px-2 text-xs"
                    >
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Like
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startReplying(comment.id)}
                      className="h-8 px-2 text-xs"
                    >
                      <Reply className="h-3 w-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </>
              )}

              {/* Render replies if any */}
              {comment.replies && (
                <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700">
                  {typeof comment.replies === "string"
                    ? // Try to parse JSON string
                      (() => {
                        try {
                          const parsedReplies = JSON.parse(comment.replies)
                          return Array.isArray(parsedReplies)
                            ? parsedReplies.map((reply: Comment) => renderComment(reply))
                            : null
                        } catch (e) {
                          console.error("Failed to parse replies:", e)
                          return null
                        }
                      })()
                    : Array.isArray(comment.replies)
                      ? comment.replies.map((reply: Comment) => renderComment(reply))
                      : null}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Comment form */}
      <div className="mb-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>{user?.first_name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {replyTo !== null && (
              <div className="mb-2 text-sm text-muted-foreground flex justify-between">
                <span>Replying to comment</span>
                <Button variant="ghost" size="sm" onClick={cancelReplying} className="h-5 p-0">
                  Cancel
                </Button>
              </div>
            )}
            <Textarea
              placeholder={user ? "Write a comment..." : "Please login to comment"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!user || isLoading}
              className="mb-2"
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment} disabled={!user || !newComment.trim() || isLoading}>
                {isLoading ? "Posting..." : "Post Comment"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div>
        {comments.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </div>
  )
}

