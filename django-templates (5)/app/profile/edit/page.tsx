"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Loader2, ImagePlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { authService } from "@/lib/auth"

export default function EditProfilePage() {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    role: "CUS",
    profile: {
      bio: "",
      skills: [],
      date_of_birth: "",
      location: "",
      linkedin: "",
      twitter: "",
      website: "",
      signature: "",
    },
  })

  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null)
  const [backgroundImage, setBackgroundImage] = useState<File | null>(null)
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user && typeof window !== "undefined") {
      router.push("/login")
      return
    }

    // Fetch user data
    const fetchUserData = async () => {
      if (!user) return

      setIsFetching(true)
      try {
        const data = await authService.getCurrentUser()
        setUserData(data)

        // Set image previews if available
        if (data.profile?.photo) {
          setProfileImagePreview(data.profile.photo)
        }
        if (data.profile?.background_image) {
          setBackgroundImagePreview(data.profile.background_image)
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err)
        setError("Failed to load your profile data. Please try again.")
      } finally {
        setIsFetching(false)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user, loading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    if (name.includes(".")) {
      // Handle nested properties (profile fields)
      const [parent, child] = name.split(".")
      setUserData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      // Handle top-level properties
      setUserData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setProfileImage(file)
      setProfileImagePreview(URL.createObjectURL(file))
    }
  }

  const handleBackgroundImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setBackgroundImage(file)
      setBackgroundImagePreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Create FormData for file uploads
      const formData = new FormData()

      // Add user data
      Object.entries(userData).forEach(([key, value]) => {
        if (key !== "profile") {
          formData.append(key, value as string)
        }
      })

      // Add profile data
      Object.entries(userData.profile).forEach(([key, value]) => {
        if (value) {
          formData.append(`profile.${key}`, value as string)
        }
      })

      // Add images if changed
      if (profileImage) {
        formData.append("profile.photo", profileImage)
      }

      if (backgroundImage) {
        formData.append("profile.background_image", backgroundImage)
      }

      // Update profile
      await authService.updateProfile(formData)
      setSuccess(true)

      // Scroll to top to show success message
      window.scrollTo(0, 0)
    } catch (err: any) {
      setError(err.message || "Failed to update profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="container py-12 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href="/profile">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to profile
        </Link>
      </Button>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Update your personal information and profile settings</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800">
              <AlertDescription className="text-green-800 dark:text-green-200">
                Profile updated successfully!
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={userData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={userData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={userData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    value={userData.phone_number}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Profile Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="profile_image">Profile Image</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("profile_image")?.click()}
                      className="w-32 h-32 rounded-full flex items-center justify-center border-dashed overflow-hidden"
                    >
                      {profileImagePreview ? (
                        <img
                          src={profileImagePreview || "/placeholder.svg"}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImagePlus className="h-8 w-8" />
                      )}
                    </Button>
                    <input
                      id="profile_image"
                      type="file"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                      className="hidden"
                    />
                    <div className="text-sm text-muted-foreground">
                      <p>Upload a profile picture</p>
                      <p>Recommended: Square image, at least 200x200px</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background_image">Background Image</Label>
                  <div className="flex items-center gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("background_image")?.click()}
                      className="w-full h-32 flex flex-col items-center justify-center border-dashed"
                    >
                      {backgroundImagePreview ? (
                        <img
                          src={backgroundImagePreview || "/placeholder.svg"}
                          alt="Background"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <>
                          <ImagePlus className="h-8 w-8 mb-2" />
                          <span>Upload background image</span>
                        </>
                      )}
                    </Button>
                    <input
                      id="background_image"
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile.bio">Bio</Label>
                  <Textarea
                    id="profile.bio"
                    name="profile.bio"
                    value={userData.profile.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile.location">Location</Label>
                  <Input
                    id="profile.location"
                    name="profile.location"
                    value={userData.profile.location || ""}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile.date_of_birth">Date of Birth</Label>
                  <Input
                    id="profile.date_of_birth"
                    name="profile.date_of_birth"
                    type="date"
                    value={userData.profile.date_of_birth || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Social Links</h3>

                <div className="space-y-2">
                  <Label htmlFor="profile.website">Website</Label>
                  <Input
                    id="profile.website"
                    name="profile.website"
                    type="url"
                    value={userData.profile.website || ""}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile.linkedin">LinkedIn</Label>
                  <Input
                    id="profile.linkedin"
                    name="profile.linkedin"
                    type="url"
                    value={userData.profile.linkedin || ""}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="profile.twitter">Twitter</Label>
                  <Input
                    id="profile.twitter"
                    name="profile.twitter"
                    type="url"
                    value={userData.profile.twitter || ""}
                    onChange={handleChange}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile.signature">Signature</Label>
                <Textarea
                  id="profile.signature"
                  name="profile.signature"
                  value={userData.profile.signature || ""}
                  onChange={handleChange}
                  placeholder="Your signature for comments and posts"
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <Button type="button" variant="outline" asChild>
                <Link href="/profile">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

