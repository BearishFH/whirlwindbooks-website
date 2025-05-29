import Link from "next/link"

export default function PrivacyPage() {
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
              Whirlwind Privacy Policy
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="text-sm text-soft-ivory/60">Last Updated: May 28, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mb-8">
              <p className="text-gold font-medium text-lg leading-relaxed">
                We believe in respecting your privacy. We do not sell your data, do not serve ads, and do not track you
                across the web.
              </p>
            </div>

            <p className="text-soft-ivory/90 mb-8 leading-relaxed">
              Whirlwind is owned and operated by Bearish FH INC, a Delaware corporation ("Whirlwind," "we," "us," or
              "our"). This Privacy Policy explains how we collect, use, and protect your personal information when you
              use our mobile application and website (collectively, the "Service").
            </p>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">1. What We Collect</h2>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                We collect only what's necessary to deliver a personalized, high-quality storytelling experience.
              </p>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">a. Account Information</h3>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                When you sign in using Apple or Google, we receive:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Your name (if provided)</li>
                <li>Your email address (only if available)</li>
                <li>A unique authentication token</li>
              </ul>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                We do not collect passwords or access your full third-party profile.
              </p>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">b. Content Usage</h3>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                To deliver and improve your reading experience, we store:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Which books and chapters you open</li>
                <li>Completion status and bookmarks</li>
                <li>Your reading streak and engagement stats</li>
              </ul>
              <p className="text-soft-ivory/90 mb-4 leading-relaxed">
                This data is tied to your account for personalization but never sold or shared.
              </p>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">c. Reading Analytics (Anonymized)</h3>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                We use PostHog to track anonymized engagement data such as:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Cover images viewed or clicked</li>
                <li>Pages read per session</li>
                <li>Time spent on each chapter or book</li>
                <li>Abandonment points (where readers stop reading)</li>
                <li>Session length, navigation flow, and re-reads</li>
              </ul>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                This information is not tied to your name or email. It is used in aggregate to:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Improve our content quality</li>
                <li>Adjust recommendation algorithms</li>
                <li>Optimize UX and layout</li>
                <li>Understand audience preferences</li>
              </ul>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">d. Device & Technical Info</h3>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                We collect basic technical data to ensure smooth performance:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Device type and OS version</li>
                <li>Language preference and timezone</li>
                <li>Anonymous error logs and crash reports</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                We do not track your location, install cookies, or use third-party advertising SDKs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">2. How We Use Your Data</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">We use your data to:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 space-y-2 leading-relaxed">
                <li>Authenticate your login</li>
                <li>Save your reading progress</li>
                <li>Improve story delivery and app performance</li>
                <li>Analyze reading patterns (anonymized) to guide story development</li>
                <li>Fulfill legal and operational obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">3. No Ads. No Cross-App Tracking.</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">We do not:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Sell your data</li>
                <li>Show ads</li>
                <li>Track you across websites or apps</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">Everything you do stays within Whirlwind.</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">4. Your Rights</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Access a copy of your data</li>
                <li>Request corrections</li>
                <li>Delete your account and data</li>
                <li>Object to data processing</li>
                <li>Export your data in a portable format</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                To exercise your rights, email us at privacy@bearishfh.com | Privacy, Whirlwind Books
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">5. Data Retention</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                We keep your personal and usage data only as long as your account is active. Upon account deletion, your
                personal data is permanently removed. Some anonymized analytics may be retained for platform-level
                improvements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">6. Data Hosting & Transfers</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                All data is hosted in the United States, with encryption in transit and at rest. For users in the EU,
                EEA, or UK, we rely on standard contractual clauses (SCCs) to lawfully transfer and protect data under
                the GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">7. Children's Privacy</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                Whirlwind is not intended for children under 13. If we discover that a child has created an account, we
                will delete it and all associated data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">8. Third-Party Services</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                We use a small number of essential, privacy-respecting third parties:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Apple & Google (authentication)</li>
                <li>PostHog (anonymous analytics)</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                These services are governed by their own privacy policies and do not receive access to your personal
                reading content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">9. Policy Changes</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                We may update this Privacy Policy as laws evolve or as features change. When we do, we'll update the
                "Last Updated" date and notify you if changes are significant.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">10. Contact</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                📧 privacy@bearishfh.com | Privacy, Whirlwind Books
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">
                📬 Bearish FH INC
                <br />
                95 3rd Street
                <br />
                San Francisco, CA 94103
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
