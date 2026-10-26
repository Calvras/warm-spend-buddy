import { useEffect } from "react";
import { X } from "lucide-react";

export type LegalDocType = "terms" | "privacy" | null;

interface LegalModalProps {
  type: LegalDocType;
  onClose: () => void;
}

export function LegalModal({ type, onClose }: LegalModalProps) {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [type]);

  if (!type) return null;

  const isTerms = type === "terms";
  const title = isTerms ? "Terms of Service" : "Privacy Policy";
  const effectiveDate = "October 26, 2026";

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Swipe-up Sheet leaving ~20px at top with curved top left & right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative z-50 w-full max-w-[460px] mx-auto bg-background rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden border-t border-border animate-in slide-in-from-bottom duration-300"
        style={{ height: "calc(100dvh - 20px)" }}
      >
        {/* Top Drag Indicator & Header */}
        <div className="flex-shrink-0 px-5 pt-3 pb-4 border-b border-border/80 bg-background/95 backdrop-blur-sm">
          <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="p-1.5 -ml-1.5 rounded-full hover:bg-accent text-foreground transition-colors flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[2.2]" />
            </button>
            <h2 id="legal-modal-title" className="text-base font-bold text-foreground text-center flex-1 pr-6">
              {title}
            </h2>
          </div>
          <p className="text-[11px] text-muted-foreground text-center mt-1">
            Effective Date: {effectiveDate}
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-sm text-foreground/90 space-y-6 leading-relaxed">
          {isTerms ? (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  1. Agreement to Terms
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Welcome to Paidly. By creating an account, browsing, or using our mobile application,
                  website, or services (collectively, the &ldquo;Services&rdquo;), you agree to be bound by these
                  Terms of Service (&ldquo;Terms&rdquo;) and our Privacy Policy. If you do not agree to all of these
                  Terms, do not access or use the Services.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  2. Description of the Paidly Services
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Paidly provides a personal finance organization tool designed to help you track, organize,
                  and monitor your recurring subscription expenses, digital memberships, renewal timelines,
                  and estimated payment schedules. Paidly is a simulated tracking assistant and does not act
                  as a banking institution, licensed financial advisor, or credit provider.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  3. User Eligibility & Account Registration
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You must be at least 18 years of age or the age of majority in your jurisdiction to use
                  Paidly. You agree to provide accurate, current, and complete information during registration
                  and to keep your credentials confidential. You are solely responsible for any activity that
                  occurs under your account.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  4. Card Simulation and Financial Disclaimer
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Paidly includes simulated card connection experiences and demo payment cards for illustrative
                  purposes. You should never submit real, sensitive banking credentials, actual credit card CVVs,
                  or private financial data into demo fields. All calculations, estimates, and payment notifications
                  provided by Paidly are for organizational reference only and should not replace formal bank statements.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  5. Subscription Tracking & Third-Party Services
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Paidly displays information regarding third-party subscription services (e.g., Netflix,
                  Spotify, YouTube, Adobe). Paidly is not affiliated with, endorsed by, or sponsored by any
                  of these third-party companies. Any cancellation or modification of your external subscriptions
                  must be executed directly through the respective provider.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  6. Acceptable Use Policy
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You agree not to: (a) reverse engineer, decompile, or disassemble any aspect of the Services;
                  (b) use the Services for any unlawful, fraudulent, or unauthorized purpose; (c) attempt to
                  interfere with or compromise the system integrity or security; or (d) introduce malicious software
                  or automated scraping tools.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  7. Intellectual Property
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The Paidly trademarks, service marks, logo designs, custom code, graphics, interactive widgets,
                  and software belong exclusively to Paidly. You are granted a limited, personal, non-transferable,
                  revocable license to use Paidly in accordance with these Terms.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  8. Limitation of Liability
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  To the maximum extent permitted by applicable law, in no event shall Paidly, its directors,
                  employees, or partners be liable for any indirect, punitive, incidental, special, consequential,
                  or exemplary damages, including damages for loss of profits, financial discrepancies, goodwill,
                  data, or other intangible losses arising from your use of the service.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  9. Termination
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We reserve the right to suspend or terminate your access to Paidly at any time, with or without
                  cause, without prior notice. You may also delete your account or terminate your use at any time
                  through the Profile settings.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  10. Contact Information
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  If you have questions about these Terms of Service, please reach out to our legal support team
                  at <span className="font-semibold text-foreground">legal@paidly.app</span>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  1. Privacy Commitment
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  At Paidly, your privacy is a foundational priority. This Privacy Policy describes how Paidly
                  (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, processes, stores, and protects your information
                  when you use our subscription tracking app and related services.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  2. Information We Collect
                </h3>
                <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
                  <p>We may collect information you directly provide when using the app, including:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong className="text-foreground font-semibold">Account Information:</strong> Name, email address, password hashes, and profile settings.</li>
                    <li><strong className="text-foreground font-semibold">Subscription Records:</strong> Service names, renewal dates, estimated fees, billing frequencies, and user notes.</li>
                    <li><strong className="text-foreground font-semibold">Card Metadata:</strong> Display nicknames, expiration dates, and the last 4 digits for on-device tracking reference.</li>
                    <li><strong className="text-foreground font-semibold">Device & Usage Data:</strong> Browser type, operating system version, screen resolution, and diagnostic logs.</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  3. How We Use Your Information
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="text-xs text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Display your dashboard, active subscriptions, and upcoming payment alerts.</li>
                  <li>Enable multi-card organization and balance summaries.</li>
                  <li>Notify you of approaching renewal deadlines and price revisions.</li>
                  <li>Maintain application stability, prevent abuse, and deliver customer support.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  4. Payment & Financial Data Protection
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Paidly does not transmit or store full debit or credit card primary account numbers (PAN),
                  nor do we store security CVV codes on remote servers. Sensitive card entries are managed
                  locally on your device or via simulated sandboxes to ensure your financial integrity is never compromised.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  5. Local Storage and Client-Side Data
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Paidly utilizes client-side storage technologies (such as localStorage and IndexedDB) and
                  Service Workers to enable offline availability and preserve your customized settings across
                  sessions on your device. You can clear this stored data at any time through your browser settings.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  6. Third-Party Sharing and Sale of Data
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We do not sell, rent, or trade your personal information or financial records to data brokers,
                  advertisers, or third-party marketing networks. Any data shared with technical service providers
                  (e.g., hosting or error monitoring) is conducted under strict confidentiality agreements.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  7. Your Privacy Rights
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Depending on your jurisdiction (such as under the GDPR or CCPA), you have the right to access,
                  rectify, export, or delete the personal data associated with your Paidly account. To exercise
                  these rights, you can utilize the in-app Profile controls or contact us directly.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  8. Security Measures
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We employ industry-standard encryption protocols (HTTPS/TLS) and modern authorization frameworks
                  to protect your account against unauthorized access, alteration, or disclosure.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-[12px]">
                  9. Contact Us
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  For privacy inquiries, data deletion requests, or questions regarding our information practices,
                  please contact our Data Protection Officer at <span className="font-semibold text-foreground">privacy@paidly.app</span>.
                </p>
              </section>
            </>
          )}

          {/* Bottom Close Button inside sheet */}
          <div className="pt-4 pb-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 px-4 rounded-xl font-semibold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
            >
              I Understand & Close
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
