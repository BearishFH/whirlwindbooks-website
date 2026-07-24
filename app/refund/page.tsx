import Link from "next/link"

export const metadata = { title: "Refund Policy — Whirlwind" }

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-ash-grey py-20 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,180,131,0.05)_0%,transparent_70%)]"></div>

      <div className="container mx-auto max-w-4xl relative z-20">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gold hover:text-ivory transition-colors duration-300 font-serif mb-6"
          >
            ← Back to Whirlwind
          </Link>
        </div>

        <div className="bg-dark-ash/80 backdrop-blur-sm rounded-lg p-10 shadow-2xl border border-gold/10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-gold mystery-glow mb-4">
              Whirlwind Refund Policy
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="text-sm text-soft-ivory/60">Last Updated: July 22, 2026</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">1. Overview</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                Whirlwind is a digital subscription service operated by Bearish FH INC ("we", "our",
                "us"). This policy explains when and how you can obtain a refund, and how to cancel to
                avoid future charges. It applies alongside our{" "}
                <Link href="/terms" className="text-gold hover:text-ivory underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-gold hover:text-ivory underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">2. How you subscribed matters</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                Where you buy your subscription determines who processes the payment and handles refunds:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-soft-ivory">On the web (whirlwindbooks.com):</strong> payments
                  are processed by Stripe, our payment processor and merchant of record. Refund requests
                  for web subscriptions are handled by us.
                </li>
                <li>
                  <strong className="text-soft-ivory">In the iOS app (Apple App Store):</strong> Apple is
                  the seller of record. Refunds for App Store purchases are governed by Apple&apos;s
                  policies and must be requested from Apple at{" "}
                  <a
                    href="https://reportaproblem.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:text-ivory underline"
                  >
                    reportaproblem.apple.com
                  </a>
                  .
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">3. 14-day right to cancel (UK &amp; EU)</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                If you are a consumer in the United Kingdom or the European Union, you have a statutory
                right to cancel a purchase within 14 days. Because Whirlwind is digital content supplied
                immediately, you are asked to consent to immediate access when you subscribe. Where you
                have not yet started reading paid content, we will provide a full refund on request within
                this 14-day period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">4. Our refund promise</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                Beyond your statutory rights, we want you to be happy. For web subscriptions we will
                normally grant a refund when:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>You were charged in error or charged twice;</li>
                <li>You were charged after cancelling and did not use the service in the new period;</li>
                <li>A technical fault on our side prevented you from accessing the content you paid for;</li>
                <li>You request a refund within 14 days of a renewal and have made little or no use of it.</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                Requests outside these cases are considered on a case-by-case basis. Refunds are issued to
                your original payment method.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">5. Cancelling your subscription</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                Subscriptions renew automatically until cancelled. Cancelling stops future charges; it does
                not by itself refund a charge already made.
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>
                  <strong className="text-soft-ivory">Web:</strong> cancel from your Whirlwind{" "}
                  <Link href="/account" className="text-gold hover:text-ivory underline">
                    Account
                  </Link>{" "}
                  page, or via the management link in your Stripe receipt email.
                </li>
                <li>
                  <strong className="text-soft-ivory">iOS:</strong> cancel in your Apple ID subscription
                  settings on your device.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">6. How to request a refund</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                For web (Stripe) purchases, email us and we will respond within 5 business days:
              </p>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                📧 support@bearishfh.com | Subject: Whirlwind Refund
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                Please include the email address used at checkout and your Stripe order or receipt number.
                You can also manage your subscription via the link in the receipt emailed to you after purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">7. Contact</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                Bearish FH INC
                <br />
                95 3rd St. San Francisco CA 94103
                <br />
                support@bearishfh.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
