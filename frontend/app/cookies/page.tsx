"use client"

import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CookiesPolicyPage() {
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
        <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
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
            This Cookie Policy explains how Project ("we", "us", or "our") uses cookies and similar technologies to
            recognize you when you visit our website ("Website"). It explains what these technologies are and why we use
            them, as well as your rights to control our use of them.
          </p>
          <p>
            By continuing to use our Website, you are agreeing to our use of cookies as described in this Cookie Policy.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>2. What Are Cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well
            as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, Project) are called "first-party cookies". Cookies set by
            parties other than the website owner are called "third-party cookies". Third-party cookies enable
            third-party features or functionality to be provided on or through the website (e.g., advertising,
            interactive content, and analytics). The parties that set these third-party cookies can recognize your
            computer both when it visits the website in question and also when it visits certain other websites.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>3. Why Do We Use Cookies?</h2>
          <p>
            We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons
            in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
            Other cookies also enable us to track and target the interests of our users to enhance the experience on our
            Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
            This is described in more detail below.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>4. Types of Cookies We Use</h2>
          <p>
            The specific types of first- and third-party cookies served through our Website and the purposes they
            perform are described below:
          </p>

          <h3>4.1 Essential Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our Website and to use
            some of its features, such as access to secure areas. Because these cookies are strictly necessary to
            deliver the Website, you cannot refuse them without impacting how our Website functions.
          </p>
          <ul>
            <li>
              <strong>Authentication Cookies</strong>: These cookies help us identify you when you are logged in to our
              Website.
            </li>
            <li>
              <strong>Security Cookies</strong>: These cookies help us detect and prevent security risks and malicious
              activity.
            </li>
            <li>
              <strong>Session Cookies</strong>: These temporary cookies expire when you close your browser and enable
              certain functions during your session.
            </li>
          </ul>

          <h3>4.2 Performance and Functionality Cookies</h3>
          <p>
            These cookies are used to enhance the performance and functionality of our Website but are non-essential to
            their use. However, without these cookies, certain functionality may become unavailable.
          </p>
          <ul>
            <li>
              <strong>Preference Cookies</strong>: These cookies remember your settings and preferences (like language
              or region) to enhance your experience.
            </li>
            <li>
              <strong>Functionality Cookies</strong>: These cookies help our Website remember choices you make (such as
              your username, language, or the region you are in) and provide enhanced features.
            </li>
          </ul>

          <h3>4.3 Analytics and Customization Cookies</h3>
          <p>
            These cookies collect information that is used either in aggregate form to help us understand how our
            Website is being used or how effective our marketing campaigns are, or to help us customize our Website for
            you.
          </p>
          <ul>
            <li>
              <strong>Google Analytics</strong>: We use Google Analytics to collect information about how visitors use
              our Website. These cookies collect information in an anonymous form, including the number of visitors to
              the Website, where visitors have come to the Website from, and the pages they visited.
            </li>
            <li>
              <strong>Hotjar</strong>: We use Hotjar to better understand our users' needs and to optimize this service
              and experience. Hotjar uses cookies to collect non-personal information like how users navigate our
              Website and which features they interact with the most.
            </li>
          </ul>

          <h3>4.4 Advertising Cookies</h3>
          <p>
            These cookies are used to make advertising messages more relevant to you. They perform functions like
            preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some
            cases selecting advertisements that are based on your interests.
          </p>
          <ul>
            <li>
              <strong>Google Ads</strong>: These cookies track your browsing habits to enable us to show advertising
              which is more likely to be of interest to you.
            </li>
            <li>
              <strong>Facebook Pixel</strong>: These cookies help us understand the effectiveness of our Facebook ads
              and to build audiences for future advertisements.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>5. How Can You Control Cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences
            in the following ways:
          </p>

          <h3>5.1 Browser Settings</h3>
          <p>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or
            delete certain cookies. Generally, you can also manage similar technologies in the same way that you manage
            cookies – using your browser's preferences.
          </p>
          <p>The following links show how to adjust the cookie settings on commonly used browsers:</p>
          <ul>
            <li>
              <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>

          <h3>5.2 Cookie Management Tool</h3>
          <p>
            We provide a cookie management tool on our Website that allows you to choose which types of cookies you
            accept or reject. You can access this tool through the "Cookie Settings" button in our cookie banner or in
            the footer of our Website.
          </p>

          <h3>5.3 Opt-Out Links</h3>
          <p>
            For cookies served by third parties, you can often opt out directly through the relevant third party. For
            example:
          </p>
          <ul>
            <li>
              Google Analytics:{" "}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                https://tools.google.com/dlpage/gaoptout
              </a>
            </li>
            <li>
              Google Ads:{" "}
              <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
                https://adssettings.google.com
              </a>
            </li>
            <li>
              Facebook:{" "}
              <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noopener noreferrer">
                https://www.facebook.com/policies/cookies/
              </a>
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>6. What If You Don't Allow Cookies?</h2>
          <p>
            If you choose not to allow certain cookies, some features and functionality of our Website may not work
            properly. For example:
          </p>
          <ul>
            <li>You may not be able to log in to secure areas of the Website</li>
            <li>Your preferences and settings may not be remembered</li>
            <li>Some pages might not display properly</li>
            <li>You may not receive personalized content or offers</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>7. Changes to Our Cookie Policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the "Last updated" date.
          </p>
          <p>
            You are advised to review this Cookie Policy periodically for any changes. Changes to this Cookie Policy are
            effective when they are posted on this page.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at{" "}
            <a href="mailto:privacy@example.com">privacy@example.com</a>.
          </p>
        </section>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors mr-8">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  )
}

