"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for personal projects and trying out the platform",
      price: "$0",
      period: "forever",
      features: [
        { name: "100 API requests per day", included: true },
        { name: "Basic authentication", included: true },
        { name: "Community support", included: true },
        { name: "Rate limiting", included: true },
        { name: "API documentation", included: true },
        { name: "Role-based access control", included: false },
        { name: "Custom domains", included: false },
        { name: "Priority support", included: false },
        { name: "Analytics dashboard", included: false },
        { name: "SLA guarantees", included: false },
      ],
      button: {
        text: "Get Started",
        link: "/register",
      },
      highlight: false,
    },
    {
      name: "Pro",
      description: "For startups and growing businesses",
      price: "$39",
      period: "per month",
      features: [
        { name: "10,000 API requests per day", included: true },
        { name: "Advanced authentication", included: true },
        { name: "Email support", included: true },
        { name: "Rate limiting", included: true },
        { name: "API documentation", included: true },
        { name: "Role-based access control", included: true },
        { name: "Custom domain", included: true },
        { name: "Priority support", included: false },
        { name: "Analytics dashboard", included: true },
        { name: "SLA guarantees", included: false },
      ],
      button: {
        text: "Subscribe Now",
        link: "/register?plan=pro",
      },
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: "Custom",
      period: "tailored to your needs",
      features: [
        { name: "Unlimited API requests", included: true },
        { name: "Enterprise authentication", included: true },
        { name: "Dedicated support", included: true },
        { name: "Custom rate limiting", included: true },
        { name: "API documentation", included: true },
        { name: "Role-based access control", included: true },
        { name: "Multiple custom domains", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Advanced analytics", included: true },
        { name: "Custom SLA guarantees", included: true },
      ],
      button: {
        text: "Contact Sales",
        link: "/contact",
      },
      highlight: false,
    },
  ]

  const faqItems = [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer:
        "Yes, you can upgrade your plan at any time. For downgrades, changes will take effect at the start of your next billing cycle.",
    },
    {
      question: "How do you count API requests?",
      answer:
        "An API request is counted every time our servers process a request to one of our API endpoints. Multiple operations in a single request count as one request.",
    },
    {
      question: "Do I need a credit card to sign up for the free plan?",
      answer:
        "No, you don't need a credit card to sign up for our free plan. You can get started immediately without any payment information.",
    },
    {
      question: "What happens if I exceed my API request limit?",
      answer:
        "If you exceed your daily API request limit, additional requests will be declined until your limit resets at midnight UTC. You'll receive email notifications when you're approaching your limit.",
    },
    {
      question: "Do you offer discounts for yearly subscriptions?",
      answer:
        "Yes, we offer a 20% discount when you pay annually for our Pro plan. This option is available during checkout.",
    },
    {
      question: "Is there a trial period for paid plans?",
      answer:
        "Yes, we offer a 14-day trial for our Pro plan, which includes all features and higher API request limits.",
    },
  ]

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
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Choose a plan that works for your needs, from individual projects to enterprise solutions.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {plans.map((plan, index) => (
          <motion.div key={plan.name} variants={item} className="h-full">
            <Card
              className={`h-full flex flex-col ${plan.highlight ? "border-blue-500 shadow-lg relative overflow-hidden" : ""}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0">
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-[30%] translate-y-[-30%] w-[150px] text-center">
                    MOST POPULAR
                  </div>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      )}
                      <span className={feature.included ? "" : "text-gray-500 dark:text-gray-500"}>{feature.name}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={`w-full ${plan.highlight ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  <Link href={plan.button.link}>{plan.button.text}</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find the perfect plan for your needs with our detailed comparison.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="text-left p-4 border-b dark:border-gray-700">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="text-center p-4 border-b dark:border-gray-700">
                    <span className={plan.highlight ? "text-blue-600 font-bold" : ""}>{plan.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b dark:border-gray-700 font-medium">API Requests</td>
                <td className="text-center p-4 border-b dark:border-gray-700">100 per day</td>
                <td className="text-center p-4 border-b dark:border-gray-700">10,000 per day</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Unlimited</td>
              </tr>
              <tr>
                <td className="p-4 border-b dark:border-gray-700 font-medium">Authentication</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Basic</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Advanced</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Enterprise</td>
              </tr>
              <tr>
                <td className="p-4 border-b dark:border-gray-700 font-medium">Support</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Community</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Email</td>
                <td className="text-center p-4 border-b dark:border-gray-700">Dedicated 24/7</td>
              </tr>
              <tr>
                <td className="p-4 border-b dark:border-gray-700 font-medium">Custom Domains</td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                </td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b dark:border-gray-700 font-medium">Analytics Dashboard</td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                </td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="p-4 border-b dark:border-gray-700 font-medium">SLA Guarantees</td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                </td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <X className="h-5 w-5 text-gray-400 mx-auto" />
                </td>
                <td className="text-center p-4 border-b dark:border-gray-700">
                  <Check className="h-5 w-5 text-green-600 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div
        className="mb-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our pricing and plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-xl font-medium mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-blue-600 text-white rounded-xl p-12 text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Need a Custom Solution?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          We offer customized plans for organizations with specific requirements. Contact our sales team to discuss your
          needs.
        </p>
        <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
          <Link href="/contact">Contact Sales</Link>
        </Button>
      </motion.div>
    </div>
  )
}

