"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    privacyAgreed: false,
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, privacyAgreed: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.privacyAgreed) {
      toast.error("You must agree to our Privacy Policy")
      return
    }

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.")
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        privacyAgreed: false,
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Have a question or need assistance? Our team is here to help you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">info@example.com</p>
                  <p className="text-gray-600 dark:text-gray-400">support@example.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+1 (123) 456-7890</p>
                  <p className="text-gray-600 dark:text-gray-400">+1 (987) 654-3210</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Office</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Tech Street
                    <br />
                    San Francisco, CA 94107
                    <br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="font-medium">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Monday - Friday: 9:00 AM - 5:00 PM
                    <br />
                    Saturday - Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-4">Need immediate help?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Check our comprehensive documentation or visit our community forums.
              </p>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/docs">View Documentation</a>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://community.example.com">Visit Forums</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={handleSelectChange} required>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[150px]"
                    required
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="privacy" checked={formData.privacyAgreed} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="privacy" className="text-sm">
                    I agree to the processing of my personal data in accordance with the{" "}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Our Location</h2>
          <p className="text-gray-600 dark:text-gray-400">Visit our headquarters</p>
        </div>
        <div className="aspect-video w-full max-w-5xl mx-auto rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0992357649123!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1661794874201!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </motion.div>
    </div>
  )
}

