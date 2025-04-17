"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { ArrowLeft, ImagePlus, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { postsService } from "@/lib/posts"
import { useAuth } from "@/contexts/auth-context"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MultiSelect } from "@/components/multi-select"

export default function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"PUB" | "DRF" | "MOD">("DRF")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [availableTags, setAvailableTags] = useState<any[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingTags, setIsFetchingTags] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    // Redirect if not logged in
    if (!user && typeof window !== "undefined") {
      router.push("/login")
    }

    // Fetch available tags
    const fetchTags = async () => {
      setIsFetchingTags(true)
      try {
        const tags = await postsService.getTags()
        setAvailableTags(tags)
      } catch (err) {
        console.error("Failed to fetch tags:", err)
        setError("Failed to load tags. Please try again.")
      } finally {
        setIsFetchingTags(false)
      }
    }

    fetchTags()
  }, [user, router])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const postData = {
        title,
        content,
        tag: selectedTags,
        status,
      }

      const response = await postsService.createPost(postData)

      // Handle image upload if needed
      // This would require additional backend support

      router.push(`/posts/${response.id}`)
    } catch (err: any) {
      setError(err.message || "Failed to create post. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to posts
        </Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Post</CardTitle>
          <CardDescription>Share your thoughts, ideas, and knowledge with the community.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                {isFetchingTags ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading tags...</span>
                  </div>
                ) : (
                  <MultiSelect
                    options={availableTags.map((tag) => ({
                      label: tag.tag_name,
                      value: tag.id.toString(),
                    }))}
                    selected={selectedTags.map((id) => id.toString())}
                    onChange={(values) => setSelectedTags(values.map((v) => Number.parseInt(v)))}
                    placeholder="Select tags"
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={(value: "PUB" | "DRF" | "MOD") => setStatus(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PUB">Published</SelectItem>
                    <SelectItem value="DRF">Draft</SelectItem>
                    <SelectItem value="MOD">For Moderation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                    className="w-full h-32 flex flex-col items-center justify-center border-dashed"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <ImagePlus className="h-8 w-8 mb-2" />
                        <span>Upload image</span>
                      </>
                    )}
                  </Button>
                  <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </div>
                <p className="text-xs text-muted-foreground">Recommended size: 1200x630 pixels. Max size: 2MB.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px]"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : status === "PUB" ? (
                  "Publish Post"
                ) : status === "DRF" ? (
                  "Save Draft"
                ) : (
                  "Submit for Review"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

