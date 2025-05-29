import Link from "next/link"

export default function EUDataPage() {
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
              Whirlwind EU Data Policy
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"></div>
            <p className="text-sm text-soft-ivory/60">Last Updated: May 28, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mb-8">
              <p className="text-gold font-medium text-lg leading-relaxed">
                We are committed to handling your information responsibly, respectfully, and in full compliance with the
                General Data Protection Regulation (GDPR).
              </p>
            </div>

            <p className="text-soft-ivory/90 mb-8 leading-relaxed">
              This page explains how Whirlwind, owned and operated by Bearish FH INC, handles personal data for users
              located in the European Union, European Economic Area, and United Kingdom.
            </p>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">1. Who We Are</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                Bearish FH INC
                <br />
                95 3rd Street,
                <br />
                San Francisco CA 94013
              </p>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">Email: privacy@bearishfh.com</p>
              <p className="text-soft-ivory/90 leading-relaxed">Data Controller: Bearish FH INC (USA)</p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">2. Why We Collect Your Data</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">We collect and use data to:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 space-y-2 leading-relaxed">
                <li>Let you sign in and use the Whirlwind app</li>
                <li>Save your reading progress and bookmarks</li>
                <li>Show you books and audio content in your language</li>
                <li>Improve the quality of stories through anonymous analytics</li>
                <li>Fulfill legal and operational requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">3. What We Collect</h2>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">a. Account Information</h3>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Name and email address (from Apple or Google sign-in)</li>
                <li>Authentication token (used to keep you logged in)</li>
              </ul>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">b. Reading Progress</h3>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Books and chapters read</li>
                <li>Bookmark placement and streaks</li>
                <li>Completion and performance stats</li>
              </ul>

              <h3 className="text-xl font-serif font-medium text-gold mb-3">c. Anonymized Analytics</h3>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                We track anonymous usage patterns (not tied to your name or email):
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Book covers clicked</li>
                <li>Time spent reading each page</li>
                <li>Which books are finished or abandoned</li>
                <li>Session length and behavior flow</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                All of this is collected to improve the reading experience and refine content delivery.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">4. Your Rights Under the GDPR</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">You have the right to:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Access the data we have about you</li>
                <li>Correct any inaccurate data</li>
                <li>Delete your data ("right to be forgotten")</li>
                <li>Object to how we process your data</li>
                <li>Export your data ("data portability")</li>
                <li>Withdraw consent at any time (where applicable)</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                To make a request, email: privacy@bearishfh.com
                <br />
                We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">5. Legal Basis for Processing</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">We process your personal data based on:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 space-y-2 leading-relaxed">
                <li>Contractual necessity (to provide the app/service)</li>
                <li>Legitimate interests (to improve the experience, fix bugs, understand content performance)</li>
                <li>Consent (where required, such as when collecting analytics or localization preferences)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">6. International Data Transfers</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                Your data is stored on servers located in the United States. To ensure your privacy rights are
                respected:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 space-y-2 leading-relaxed">
                <li>We use Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                <li>We apply appropriate safeguards like encryption and restricted access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">7. How Long We Keep Your Data</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">We keep your data only as long as needed to:</p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Provide the service</li>
                <li>Comply with applicable laws</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                When you delete your account, your personal data is removed. Aggregated anonymous analytics may be
                retained for platform insights, but cannot be traced back to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">8. Third Parties</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                We use a small number of GDPR-compliant service providers:
              </p>
              <ul className="list-disc list-inside text-soft-ivory/90 mb-4 space-y-2 leading-relaxed">
                <li>Apple / Google for authentication</li>
                <li>PostHog for anonymous product analytics</li>
              </ul>
              <p className="text-soft-ivory/90 leading-relaxed">
                These providers only receive the minimum data necessary to perform their services and are bound by data
                processing agreements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">9. Complaints</h2>
              <p className="text-soft-ivory/90 leading-relaxed">
                If you believe your data rights have been violated, you can contact your local Data Protection Authority
                (DPA). You also have the right to lodge a complaint directly with us at privacy@bearishfh.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-medium text-gold mb-4">10. Contact</h2>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">For any privacy-related questions or requests:</p>
              <p className="text-soft-ivory/90 mb-2 leading-relaxed">
                Bearish FH INC
                <br />
                95 3rd Street,
                <br />
                San Francisco CA 94013
              </p>
              <p className="text-soft-ivory/90 leading-relaxed">📧 Email: privacy@whirlwind.com</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
