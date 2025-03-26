import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Edit, MapPin, MessageSquare, Settings } from "lucide-react"

export default function ProfilePage({ params }: { params: { id: string } }) {
  // Mock user data
  const user = {
    id: params.id,
    name: "John Doe",
    username: "johndoe",
    avatar: "/placeholder.svg?height=120&width=120",
    bio: "Frontend Developer & Technical Writer. Passionate about creating user-friendly interfaces and sharing knowledge with the community.",
    location: "San Francisco, CA",
    joinDate: "January 2023",
    following: 128,
    followers: 256,
    isCurrentUser: params.id === "1",
  }

  // Mock posts data
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      excerpt: "Learn how to build modern web applications with Next.js, the React framework for production.",
      date: "March 15, 2025",
      category: "Development",
      image: "/placeholder.svg?height=200&width=400",
      readTime: "5 min read",
      likes: 42,
      comments: 8,
    },
    {
      id: 2,
      title: "The Power of Server Components",
      excerpt: "Explore how React Server Components can improve performance and user experience in your applications.",
      date: "March 10, 2025",
      category: "React",
      image: "/placeholder.svg?height=200&width=400",
      readTime: "8 min read",
      likes: 36,
      comments: 5,
    },
  ]

  return (
    <div className="container py-8">
      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex-shrink-0">
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
                width={120}
                height={120}
                className="rounded-full"
              />
            </div>

            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">@{user.username}</p>
                </div>

                {user.isCurrentUser ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/profile/edit">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button size="sm">Follow</Button>
                  </div>
                )}
              </div>

              <p className="mb-4">{user.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {user.location && (
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {user.location}
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  Joined {user.joinDate}
                </div>
              </div>

              <div className="flex gap-6">
                <div>
                  <span className="font-bold">{user.following}</span>
                  <span className="text-muted-foreground ml-1">Following</span>
                </div>
                <div>
                  <span className="font-bold">{user.followers}</span>
                  <span className="text-muted-foreground ml-1">Followers</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="mb-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    <Link href={`/posts/${post.id}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">{post.date}</div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M7 10v12"></path>
                          <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path>
                        </svg>
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1"
                        >
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">About {user.name}</h2>
              <p className="mb-6">{user.bio}</p>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>React</Badge>
                    <Badge>Next.js</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Tailwind CSS</Badge>
                    <Badge>UI/UX Design</Badge>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Contact</h3>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                      john.doe@example.com
                    </p>
                    <p className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      +1 (123) 456-7890
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

