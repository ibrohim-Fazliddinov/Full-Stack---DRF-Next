"use client"

import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { motion } from "framer-motion"

export default function TermsPage() {
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
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
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
            Welcome to Project. These Terms of Service ("Terms") govern your access to and use of our website, products,
            and services ("Services"). By accessing or using our Services, you agree to be bound by these Terms. If you
            disagree with any part of the Terms, you may not access the Services.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>2. Definitions</h2>
          <p>Throughout these Terms, we may use certain terms that have specific meanings:</p>
          <ul>
            <li>
              <strong>"User"</strong>: Any individual or entity that accesses or uses our Services.
            </li>
            <li>
              <strong>"Content"</strong>: Any information, text, graphics, photos, or other materials uploaded,
              downloaded, or appearing on our Services.
            </li>
            <li>
              <strong>"API"</strong>: The application programming interface provided as part of our Services.
            </li>
            <li>
              <strong>"Account"</strong>: A registered user profile with credentials that allow access to our Services.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>3. Account Registration and Security</h2>
          <p>
            To access certain features of our Services, you may be required to register for an account. You agree to
            provide accurate, current, and complete information during the registration process and to update such
            information to keep it accurate, current, and complete.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur under your account. You
            agree to notify us immediately of any unauthorized use of your account or any other breach of security. We
            cannot and will not be liable for any loss or damage arising from your failure to comply with the above
            requirements.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>4. API Usage</h2>
          <p>
            Our Services include APIs that allow you to interact with our platform. When using our APIs, you agree to:
          </p>
          <ul>
            <li>Comply with any rate limits and other usage restrictions;</li>
            <li>Only use our APIs for lawful purposes and in accordance with these Terms;</li>
            <li>Not attempt to circumvent any security measures or access controls;</li>
            <li>Not reverse engineer or decompile our APIs or attempt to derive the source code;</li>
            <li>
              Not use our APIs in a manner that could damage, disable, overburden, or impair our servers or networks.
            </li>
          </ul>
          <p>We reserve the right to modify, suspend, or discontinue our APIs at any time without notice.</p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>5. User Content</h2>
          <p>
            You retain ownership of any Content that you submit, post, or display on or through our Services. By
            submitting, posting, or displaying Content on or through our Services, you grant us a worldwide,
            non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit,
            display, and distribute such Content.
          </p>
          <p>You represent and warrant that:</p>
          <ul>
            <li>
              You own the Content posted by you on or through our Services or otherwise have the right to grant the
              license set forth above;
            </li>
            <li>
              The posting of your Content on or through our Services does not violate the privacy rights, publicity
              rights, copyrights, contract rights, or any other rights of any person.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>6. Prohibited Uses</h2>
          <p>You agree not to use our Services to:</p>
          <ul>
            <li>Violate any applicable law, regulation, or these Terms;</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent yourself;</li>
            <li>
              Engage in any activity that interferes with or disrupts our Services (or the servers and networks which
              are connected to our Services);
            </li>
            <li>
              Attempt to gain unauthorized access to any part of our Services, other accounts, computer systems, or
              networks connected to our Services;
            </li>
            <li>Collect or harvest any personally identifiable information from our Services;</li>
            <li>
              Upload, post, or transmit any Content that is unlawful, harmful, threatening, abusive, harassing,
              defamatory, vulgar, obscene, or otherwise objectionable;
            </li>
            <li>
              Upload, post, or transmit any Content that contains viruses, trojan horses, worms, spyware, adware, or
              other harmful computer code.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>7. Pricing and Payment</h2>
          <p>
            Some of our Services are offered on a subscription basis. By selecting a subscription plan, you agree to pay
            the specified fees. All fees are in US dollars and are non-refundable except as required by law or as
            expressly stated in these Terms.
          </p>
          <p>
            We reserve the right to change our prices at any time. If we change our prices, we will provide notice of
            the change on our website or by email. If you do not agree to the price change, you must cancel your
            subscription before the price change takes effect.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>8. Termination</h2>
          <p>
            We may terminate or suspend your account and access to our Services immediately, without prior notice or
            liability, for any reason, including, without limitation, if you breach these Terms.
          </p>
          <p>
            Upon termination, your right to use our Services will immediately cease. If you wish to terminate your
            account, you may simply discontinue using our Services or contact us to request account deletion.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>9. Limitation of Liability</h2>
          <p>
            In no event shall we, our directors, employees, partners, agents, suppliers, or affiliates, be liable for
            any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of
            profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul>
            <li>Your access to or use of or inability to access or use our Services;</li>
            <li>Any conduct or content of any third party on our Services;</li>
            <li>Any content obtained from our Services;</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>10. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is
            material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a
            material change will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Services after any revisions become effective, you agree to be bound by
            the revised terms. If you do not agree to the new terms, you are no longer authorized to use our Services.
          </p>
        </section>

        <Separator className="my-8" />

        <section className="mb-12">
          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a href="mailto:legal@example.com">legal@example.com</a>.
          </p>
        </section>
      </motion.div>

      <div className="mt-16 flex justify-center">
        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors mr-8">
          Privacy Policy
        </Link>
        <Link href="/cookies" className="text-blue-600 hover:text-blue-800 transition-colors">
          Cookie Policy
        </Link>
      </div>
    </div>
  )
}

