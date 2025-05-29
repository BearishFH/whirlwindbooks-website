import Link from "next/link"

export default function TermsPage() {
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
              Whirlwind Terms of Service
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="text-sm text-soft-ivory/60">Last Updated: May 28, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">1. Introduction</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                Welcome to Whirlwind, a multilingual digital mystery fiction platform available in text and audio
                formats.
              </p>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                Whirlwind is owned and operated by Bearish FH INC, a Delaware corporation ("we", "our", "us"). These
                Terms of Service ("Terms") govern your use of Whirlwind ("Service").
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                By using Whirlwind, you agree to these Terms. If you do not agree, please do not access or use the
                Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">2. Who May Use Whirlwind</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                You must be at least 13 years old (or the legal minimum age in your country) to use Whirlwind.
              </p>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">By using the Service, you confirm:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>You meet the age requirement</li>
                <li>All account information provided is accurate</li>
                <li>You are using the Service for personal and non-commercial purposes</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                Whirlwind is available globally, including in Europe, Canada, Australia, MENA, and Latin America. Local
                consumer protection laws may apply and, where required by law, prevail over conflicting clauses in these
                Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">3. Accounts & Access</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                Whirlwind access requires authentication through Apple or Google Sign-In.
              </p>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">Your account is:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>For personal use only</li>
                <li>Non-transferable</li>
                <li>Limited to a single user</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                You may not share, sell, or lend access to your account or content to others. We reserve the right to
                suspend or terminate accounts that violate this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">4. Content Usage & License</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                All books, narration, art, and features available through Whirlwind are protected intellectual property
                owned or licensed by Bearish FH INC.
              </p>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">When you purchase or subscribe:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>
                  You receive a limited, non-transferable, non-sublicensable, revocable license to access the content
                  within the Whirlwind app only
                </li>
                <li>You may not download, export, screenshot, print, or otherwise reproduce any part of the content</li>
                <li>Content may not be stored or consumed outside the app</li>
                <li>You may not create backups, share files, or circumvent app protections</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">5. Chapters and Access Model</h2>
              <ul className="list-disc list-inside text-soft-ivory/90 space-y-2 leading-relaxed">
                <li>The first chapter of every book is free to read</li>
                <li>Full books are available through individual purchase or monthly subscription</li>
                <li>Prices may vary by region and currency</li>
                <li>No downloadable versions (PDF, ePub, audio files) are offered</li>
                <li>All access is streamed or rendered in-app only</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">6. Subscriptions & Billing</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period. Billing
                is handled via the Apple App Store. We do not process payments directly.
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                To cancel a subscription, visit your Apple account settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">7. Prohibited Conduct</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">You agree not to:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 space-y-2 leading-relaxed">
                <li>Share, resell, or redistribute any content or access</li>
                <li>Attempt to extract, download, record, or reproduce story content</li>
                <li>Use automated tools to scrape, index, or mine data</li>
                <li>Upload harmful software or interfere with service integrity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">8. Privacy</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                Please review our privacy policy on our website via the Privacy page link.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">9. Intellectual Property</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                All content, features, and branding of Whirlwind are protected under copyright, trademark, and other
                intellectual property laws. All rights not expressly granted are reserved.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">10. Service Availability</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue parts of the Service without prior notice.
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                We are not liable for interruptions in access due to device, network, platform restrictions, or external
                limitations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">11. Termination</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                You may stop using Whirlwind at any time. We may suspend or terminate your account for violation of
                these Terms or unauthorized use of content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">12. Disclaimer</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                The Service is provided "as is" and "as available" without warranties of any kind. We do not guarantee
                uninterrupted access or availability of content at all times.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">13. Limitation of Liability</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                To the fullest extent permitted by law, Bearish FH INC shall not be liable for indirect, incidental, or
                consequential damages arising from your use of the Service.
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                In regions where this limitation is not enforceable, our liability is limited to the amount paid by you
                to use the Service in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">14. Governing Law</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                These Terms are governed by the laws of the State of Delaware, USA. For users in Europe or other
                jurisdictions with consumer protection laws, your local laws may provide additional rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">15. Contact Us</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">For legal or support inquiries:</p>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                📧 support@bearishfh.com | Subject: Whirlwind Books
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                📬 Bearish FH INC
                <br />
                95 3rd St. San Francisco CA 94103
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
