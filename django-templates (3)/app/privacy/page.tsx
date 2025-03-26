"use client"

import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  const currentDate = new Date()
  const formattedDate = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: {formattedDate}</p>
      </motion.div>

      <motion.div
        className="prose prose-lg dark:prose-invert max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <section className="mb-12">
          <h2>1. Introduction</h2>
          <p>
            At Project, we respect your privacy and are committed to protecting your personal data. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our website and
            services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access our website or use our services.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>2. Information We Collect</h2>
          <p>We collect several types of information from and about users of our website and services, including:</p>
          <h3>2.1 Personal Data</h3>
          <p>
            Personal Data refers to information that can be used to identify you. We may collect the following Personal
            Data:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing address</li>
            <li>Payment information</li>
            <li>Company information (if applicable)</li>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device information</li>
          </ul>

          <h3>2.2 Usage Data</h3>
          <p>We may also collect information about how you access and use our website and services, including:</p>
          <ul>
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Links clicked</li>
            <li>API usage metrics</li>
            <li>Features utilized</li>
            <li>Error logs</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>3. How We Collect Your Information</h2>
          <p>We collect information through various methods:</p>
          <ul>
            <li>
              <strong>Direct Interactions</strong>: Information you provide when you register for an account, subscribe
              to our services, fill out forms, or correspond with us.
            </li>
            <li>
              <strong>Automated Technologies</strong>: As you navigate through our website, we may use cookies, web
              beacons, and other tracking technologies to collect data about your browsing actions and patterns.
            </li>
            <li>
              <strong>Third Parties</strong>: We may receive information about you from various third parties, such as
              business partners, analytics providers, and service providers.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>4. How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>Providing and maintaining our services</li>
            <li>Processing and completing transactions</li>
            <li>Personalizing your experience</li>
            <li>Improving our website and services</li>
            <li>Communicating with you about our services, updates, and promotions</li>
            <li>Monitoring the usage of our services</li>
            <li>Detecting, preventing, and addressing technical issues</li>
            <li>Complying with legal obligations</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>5. How We Share Your Information</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>
              <strong>Service Providers</strong>: Third-party vendors who provide services on our behalf, such as
              payment processing, data analysis, email delivery, hosting services, and customer service.
            </li>
            <li>
              <strong>Business Partners</strong>: Companies we partner with to offer products or services.
            </li>
            <li>
              <strong>Legal Requirements</strong>: To comply with applicable laws, regulations, legal processes, or
              governmental requests.
            </li>
            <li>
              <strong>Business Transfers</strong>: In connection with any merger, sale of company assets, financing, or
              acquisition of all or a portion of our business.
            </li>
            <li>
              <strong>With Your Consent</strong>: In any other circumstances where we have your consent.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>6. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our website and store certain
            information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our website or services.
          </p>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>
              <strong>Essential Cookies</strong>: Necessary for the website to function properly.
            </li>
            <li>
              <strong>Functional Cookies</strong>: Help to perform certain functionalities like sharing content on
              social media platforms or collecting feedback.
            </li>
            <li>
              <strong>Analytical Cookies</strong>: Allow us to analyze how visitors use our website to improve
              performance and user experience.
            </li>
            <li>
              <strong>Targeting Cookies</strong>: Track your browsing habits to display targeted advertising.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>7. Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed to protect the
            security of any personal information we process. However, please also remember that we cannot guarantee that
            the internet itself is 100% secure.
          </p>
          <p>We take several steps to protect your information:</p>
          <ul>
            <li>Use of encryption to protect sensitive data transmitted to and from our website</li>
            <li>Regular malware scanning</li>
            <li>Secure networks and systems</li>
            <li>Limited access to personal information to employees who need it to perform a specific job</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>8. Your Data Protection Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information:</p>
          <ul>
            <li>
              <strong>Right to Access</strong>: You have the right to request copies of your personal data.
            </li>
            <li>
              <strong>Right to Rectification</strong>: You have the right to request that we correct any information you
              believe is inaccurate or complete information you believe is incomplete.
            </li>
            <li>
              <strong>Right to Erasure</strong>: You have the right to request that we erase your personal data, under
              certain conditions.
            </li>
            <li>
              <strong>Right to Restrict Processing</strong>: You have the right to request that we restrict the
              processing of your personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Object to Processing</strong>: You have the right to object to our processing of your
              personal data, under certain conditions.
            </li>
            <li>
              <strong>Right to Data Portability</strong>: You have the right to request that we transfer the data we
              have collected to another organization, or directly to you, under certain conditions.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for children under the age of 13. We do not knowingly collect personal
            information from children under 13. If you are a parent or guardian and you are aware that your child has
            provided us with personal information, please contact us so that we can take necessary actions.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>10. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@example.com">privacy@example.com</a>.
          </p>
        </section>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors mr-8">
          Terms of Service
        </Link>
        <Link href="/cookies" className="text-blue-600 hover:text-blue-800 transition-colors">
          Cookie Policy
        </Link>
      </div>
    </div>
  )
}

