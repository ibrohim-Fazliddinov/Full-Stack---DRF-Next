import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApiDocsPage() {
  // API endpoints organized by tags
  const apiEndpoints = {
    Auth: [
      {
        method: "POST",
        path: "/api/auth/login/",
        description: "User Login - Authenticates a user using email and password.",
      },
      {
        method: "POST",
        path: "/api/auth/registration/",
        description: "User Registration - Registers a new user in the system.",
      },
      { method: "POST", path: "/api/auth/logout/", description: "User Logout - Logs out the authenticated user." },
      {
        method: "POST",
        path: "/api/auth/change-password",
        description: "Password Change - Allows users to change their password.",
      },
      {
        method: "POST",
        path: "/api/auth/reset-password/",
        description: "Password Reset - Sends a password reset link to the user's email.",
      },
      {
        method: "POST",
        path: "/api/auth/confirm-reset-password/",
        description: "Password Reset Confirmation - Confirms the password reset process.",
      },
      {
        method: "POST",
        path: "/api/resend-email/",
        description: "Resend Email Verification - Resends the email verification link.",
      },
      {
        method: "POST",
        path: "/api/account-confirm-email/{key}/",
        description: "Email Verification - Verifies the user's email address.",
      },
    ],
    "Social Auth": [
      {
        method: "POST",
        path: "/api/auth/login-google/",
        description: "Google Social Login - Allows users to login via Google OAuth2.",
      },
      {
        method: "POST",
        path: "/api/auth/login-github/",
        description: "GitHub Social Login - Allows users to login via GitHub OAuth2.",
      },
    ],
    Users: [
      {
        method: "GET",
        path: "/api/auth/user/",
        description: "Get Current User - Retrieves information about the current user.",
      },
      { method: "PUT", path: "/api/auth/user/", description: "Update User - Updates the current user's information." },
      {
        method: "PATCH",
        path: "/api/auth/user/",
        description: "Partial Update User - Partially updates the current user's information.",
      },
      { method: "DELETE", path: "/api/auth/user/", description: "Delete User - Deletes the current user's account." },
    ],
    Posts: [
      { method: "GET", path: "/api/posts/", description: "Get Posts - Retrieves all posts in the system." },
      { method: "POST", path: "/api/posts/", description: "Create Post - Creates a new post." },
      { method: "GET", path: "/api/posts/{id}/", description: "Get Post - Retrieves a specific post by ID." },
      { method: "PUT", path: "/api/posts/{id}/", description: "Update Post - Updates a specific post." },
      {
        method: "PATCH",
        path: "/api/posts/{id}/",
        description: "Partial Update Post - Partially updates a specific post.",
      },
      { method: "DELETE", path: "/api/posts/{id}/", description: "Delete Post - Deletes a specific post." },
      {
        method: "GET",
        path: "/api/posts/user/feed/",
        description: "Get User Feed - Retrieves posts from users the current user follows.",
      },
    ],
    Comments: [
      {
        method: "GET",
        path: "/api/posts/{post_id}/comment/",
        description: "Get Comments - Retrieves all comments for a post.",
      },
      {
        method: "POST",
        path: "/api/posts/{post_id}/comment/",
        description: "Create Comment - Creates a new comment on a post.",
      },
      {
        method: "GET",
        path: "/api/post/{post_id}/comment/{comment_id}/",
        description: "Get Comment - Retrieves a specific comment.",
      },
      {
        method: "PUT",
        path: "/api/post/{post_id}/comment/{comment_id}/",
        description: "Update Comment - Updates a specific comment.",
      },
      {
        method: "PATCH",
        path: "/api/post/{post_id}/comment/{comment_id}/",
        description: "Partial Update Comment - Partially updates a comment.",
      },
      {
        method: "DELETE",
        path: "/api/post/{post_id}/comment/{comment_id}/",
        description: "Delete Comment - Deletes a specific comment.",
      },
    ],
    Tags: [
      { method: "GET", path: "/api/post/tags/", description: "Get Tags - Retrieves all available tags." },
      { method: "POST", path: "/api/post/tags/", description: "Create Tag - Creates a new tag." },
      { method: "GET", path: "/api/post/tags/{id}/", description: "Get Tag - Retrieves a specific tag." },
      { method: "PUT", path: "/api/post/tags/{id}/", description: "Update Tag - Updates a specific tag." },
      {
        method: "PATCH",
        path: "/api/post/tags/{id}/",
        description: "Partial Update Tag - Partially updates a tag.",
      },
      { method: "DELETE", path: "/api/post/tags/{id}/", description: "Delete Tag - Deletes a specific tag." },
    ],
    Like: [
      {
        method: "POST",
        path: "/api/like/",
        description: "Toggle Like - Creates or removes a like for a post or comment.",
      },
    ],
  }

  return (
    <div className="container py-8 px-4 md:px-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 dark:text-white">API Documentation</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Complete reference for the Django REST Project API endpoints.
        </p>
      </div>

      <Tabs defaultValue="Auth" className="w-full">
        <TabsList className="mb-6 flex flex-wrap">
          {Object.keys(apiEndpoints).map((tag) => (
            <TabsTrigger key={tag} value={tag} className="transition-all duration-200">
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(apiEndpoints).map(([tag, endpoints]) => (
          <TabsContent key={tag} value={tag} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{tag} Endpoints</CardTitle>
                <CardDescription>
                  {tag === "Auth" && "Authentication endpoints for user management"}
                  {tag === "Social Auth" && "Social media authentication endpoints"}
                  {tag === "Users" && "User profile management endpoints"}
                  {tag === "Posts" && "Blog post management endpoints"}
                  {tag === "Comments" && "Comment management endpoints"}
                  {tag === "Tags" && "Tag management endpoints"}
                  {tag === "Like" && "Like functionality endpoints"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-700">
                        <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Method</th>
                        <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Path</th>
                        <th className="text-left p-3 border dark:border-gray-600 dark:text-white">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoints.map((endpoint, index) => (
                        <tr
                          key={index}
                          className="border-b hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
                        >
                          <td className="p-3 border dark:border-gray-600">
                            <Badge
                              className={`
                                ${endpoint.method === "GET" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" : ""}
                                ${endpoint.method === "POST" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : ""}
                                ${endpoint.method === "PUT" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : ""}
                                ${endpoint.method === "PATCH" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" : ""}
                                ${endpoint.method === "DELETE" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : ""}
                              `}
                            >
                              {endpoint.method}
                            </Badge>
                          </td>
                          <td className="p-3 border font-mono text-sm dark:border-gray-600 dark:text-white">
                            {endpoint.path}
                          </td>
                          <td className="p-3 border dark:border-gray-600 dark:text-white">{endpoint.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">API Usage</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 dark:text-white">Authentication</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Most endpoints require authentication. Use the JWT token received after login.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
              Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2 dark:text-white">Response Format</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">All responses are returned in JSON format.</p>
          </div>

          <div>
            <h3 className="font-medium mb-2 dark:text-white">Error Handling</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Errors are returned with appropriate HTTP status codes and error messages.
            </p>
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded font-mono text-sm">
              {`{
  "detail": "Authentication credentials were not provided."
}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

