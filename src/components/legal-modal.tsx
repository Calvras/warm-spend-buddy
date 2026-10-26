import { useEffect } from "react";
import { X, ShieldCheck, Scale } from "lucide-react";

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
  const title = isTerms ? "Terms of Service Agreement" : "Global Privacy Policy & Data Disclosure";
  const effectiveDate = "October 26, 2026";
  const lastUpdated = "Revision 4.2.0 • Binding Contract";

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Swipe-up Sheet leaving ~20px at top with curved top left & right */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="legal-modal-title"
        className="relative z-50 w-full max-w-[480px] mx-auto bg-background rounded-t-[28px] shadow-2xl flex flex-col overflow-hidden border-t border-border animate-in slide-in-from-bottom duration-300"
        style={{ height: "calc(100dvh - 20px)" }}
      >
        {/* Top Header */}
        <div className="flex-shrink-0 px-5 pt-3.5 pb-4 border-b border-border/80 bg-background/95 backdrop-blur-md">
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
            <div className="flex items-center gap-1.5 flex-1 justify-center pr-6">
              {isTerms ? <Scale className="w-4 h-4 text-[var(--balance)]" /> : <ShieldCheck className="w-4 h-4 text-emerald-500" />}
              <h2 id="legal-modal-title" className="text-sm font-bold text-foreground text-center">
                {title}
              </h2>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-1 text-[10px] text-muted-foreground">
            <span>Effective: {effectiveDate}</span>
            <span>•</span>
            <span>{lastUpdated}</span>
          </div>
        </div>

        {/* Scrollable Content: Very extensive legal text */}
        <div className="flex-1 overflow-y-auto px-6 py-5 text-xs text-foreground/90 space-y-6 leading-relaxed divide-y divide-border/40">
          {isTerms ? (
            <>
              {/* Preamble */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--balance)]">
                  Preamble & Legal Notice
                </span>
                <h3 className="text-sm font-bold text-foreground">
                  IMPORTANT NOTICE — MANDATORY BINDING ARBITRATION & CLASS ACTION WAIVER
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  PLEASE READ THESE TERMS OF SERVICE CAREFULLY BEFORE ACCESSING OR USING THE PAIDLY MOBILE APPLICATION,
                  WEBSITE, EMBEDDED SOFTWARE, OR COMPANION TRACKING INTERFACES (COLLECTIVELY, THE &ldquo;SERVICE&rdquo;).
                  THESE TERMS CONSTITUTE A LEGALLY ENFORCEABLE CONTRACT BETWEEN YOU (&ldquo;USER,&rdquo; &ldquo;YOU,&rdquo; OR
                  &ldquo;YOUR&rdquo;) AND PAIDLY TECHNOLOGIES INC. (&ldquo;PAIDLY,&rdquo; &ldquo;WE,&rdquo; &ldquo;US,&rdquo; OR
                  &ldquo;OUR&rdquo;). BY CREATING AN ACCOUNT, ACCESSING THE DASHBOARD, CONNECTING A PAYMENT CARD OR
                  SAMPLE INSTRUMENT, OR CHECKING THE ACCEPTANCE BOX, YOU EXPRESSLY AGREE TO BE BOUND BY ALL COVENANTS,
                  WARRANTIES, DISCLAIMERS, AND ARBITRATION MANDATES CONTAINED HEREIN.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  IF YOU DO NOT AGREE TO THESE TERMS IN THEIR ENTIRETY, YOU ARE NOT AUTHORIZED TO ACCESS, DOWNLOAD, OR
                  CONTINUE UTILIZING PAIDLY, AND YOU MUST IMMEDIATELY DISCONTINUE ALL USAGE OF THE APPLICATION.
                </p>
              </div>

              {/* Section 1 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 1. Definitions & Interpretations
                </h4>
                <p className="text-muted-foreground">
                  Throughout this Agreement, the following terms shall have the exact definitions set forth below:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">1.1 &ldquo;Account&rdquo;</strong> refers to the digital identity,
                    credential token, and associated data repository created by a User upon registration with Paidly.
                  </li>
                  <li>
                    <strong className="text-foreground">1.2 &ldquo;Subscription Tracker&rdquo;</strong> refers to the client-side
                    and hosted algorithmic calculation mechanisms utilized to catalogue, project, and monitor recurring expenses.
                  </li>
                  <li>
                    <strong className="text-foreground">1.3 &ldquo;Payment Card Data&rdquo;</strong> refers to simulated, demo,
                    or user-entered financial card metadata, including cardholder name, truncated card digits, expiration tokens, and CVV representations.
                  </li>
                  <li>
                    <strong className="text-foreground">1.4 &ldquo;Third-Party Provider&rdquo;</strong> refers to autonomous
                    external corporations (including but not limited to Spotify AB, Netflix Inc., Google LLC, Apple Inc., and Adobe Inc.)
                    whose independent recurring service terms govern their respective memberships.
                  </li>
                  <li>
                    <strong className="text-foreground">1.5 &ldquo;Applicable Privacy Laws&rdquo;</strong> refers collectively to
                    the General Data Protection Regulation (EU 2016/679) (&ldquo;GDPR&rdquo;), the California Consumer Privacy Act of 2018
                    as amended by the California Privacy Rights Act (&ldquo;CCPA/CPRA&rdquo;), and related statutory data protection enactments.
                  </li>
                </ul>
              </section>

              {/* Section 2 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 2. Scope of Service & Non-Banking Disclaimer
                </h4>
                <p className="text-muted-foreground">
                  Paidly is an organizational and personal expense monitoring utility. PAIDLY IS NOT A CHARTERED BANK,
                  INSURED DEPOSITORY INSTITUTION, MONEY TRANSMITTER, BROKER-DEALER, REGISTERED INVESTMENT ADVISOR, OR
                  FINANCIAL FIDUCIARY UNDER APPLICABLE UNITED STATES OR INTERNATIONAL JURISPRUDENTIAL DIRECTIVES.
                </p>
                <p className="text-muted-foreground">
                  The calculations, balance estimates, projected renewal timelines, and total expenditure figures displayed
                  on the Home Screen, Subscriptions Screen, and Profile Dashboards are computed for organizational budgeting
                  convenience only. They do not constitute formal transactional accounting records, audited bank reconciliations,
                  or statutory tax advice. You remain solely liable for inspecting your formal financial institution statements
                  for verified debits, bank overdrafts, or merchant fees.
                </p>
              </section>

              {/* Section 3 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 3. Eligibility, Age Verification & Account Integrity
                </h4>
                <p className="text-muted-foreground">
                  Access to the Service is restricted exclusively to natural persons who are at least eighteen (18) years of age,
                  or of legal age to form a binding contract within their jurisdiction of residence. By utilizing Paidly, you
                  warrant and represent that:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                  <li>You possess the full legal power, capacity, and authority to enter into this Agreement;</li>
                  <li>You will maintain the strict confidentiality of your authentication credentials;</li>
                  <li>You will not provide deceptive, impersonated, or malicious registration credentials;</li>
                  <li>You assume full liability for all actions taken under your authenticated user session.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 4. Multi-Card Wallet Simulation & Sandbox Environment
                </h4>
                <p className="text-muted-foreground">
                  Paidly features a multi-card organizational wallet enabling Users to associate specific subscription
                  obligations with designated credit, debit, or prepaid accounts. Users are explicitly instructed NOT to
                  input verified Primary Account Numbers (PANs) subject to Payment Card Industry Data Security Standards (PCI-DSS)
                  into unencrypted demo fields.
                </p>
                <p className="text-muted-foreground">
                  Paidly maintains zero custody over fiat deposits. Any &ldquo;Sample Balance&rdquo; or &ldquo;Card Limit&rdquo;
                  rendered within onboarding or dashboard cards represents a simulated baseline designed to facilitate
                  expenditure categorization. Paidly disclaims any liability for transaction declines, insufficient balance fees,
                  or bank penalties assessed by your actual card issuers.
                </p>
              </section>

              {/* Section 5 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 5. Third-Party Subscription Management & Autonomous Contracts
                </h4>
                <p className="text-muted-foreground">
                  Your subscriptions with Third-Party Providers are governed entirely by separate bilateral agreements executed
                  directly between you and each individual vendor. Paidly holds no agency, partnership, joint venture, or
                  subcontractor relationship with Netflix, Spotify, YouTube, Adobe, Apple, Google, or any listed enterprise.
                </p>
                <p className="text-muted-foreground">
                  Executing a &ldquo;Cancel Subscription&rdquo; or &ldquo;Change Plan&rdquo; action within Paidly registers an
                  organizational update within your localized tracking dashboard. Unless Paidly is explicitly authenticated
                  via verified OAuth integrations with the merchant, YOU REMAIN EXCLUSIVELY RESPONSIBLE FOR NAVIGATING TO
                  THE MERCHANT&rsquo;S OFFICIAL BILLING PORTAL TO CANCEL, PAUSE, OR ALTER YOUR RECURRING SERVICE CONTRACT.
                  Paidly bears no financial liability for ongoing subscription charges billed by third-party merchants.
                </p>
              </section>

              {/* Section 6 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 6. Intellectual Property & Limited License
                </h4>
                <p className="text-muted-foreground">
                  All rights, title, and interest in and to the Service—including source code, compiled bundles, database
                  schemas, interactive visual components, typography, animations, SVG assets, and proprietary brand graphics—are
                  and shall remain the exclusive property of Paidly Technologies Inc. and its licensors.
                </p>
                <p className="text-muted-foreground">
                  Subject to continuous compliance with these Terms, Paidly grants you a revocable, non-exclusive,
                  non-transferable, non-sublicensable limited license to execute and view the Service solely for personal,
                  non-commercial organizational purposes. Any extraction of source code, unauthorized scraping, competitive
                  benchmarking, or reverse engineering is strictly prohibited and constitutes a material breach of contract.
                </p>
              </section>

              {/* Section 7 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 7. Acceptable Use & Prohibited Conduct
                </h4>
                <p className="text-muted-foreground">
                  You agree to refrain from engaging in any of the following prohibited behaviors:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                  <li>Deploying automated robots, spiders, scripts, or scrapers against any Paidly endpoint;</li>
                  <li>Circumventing, disabling, or tampering with security or rate-limiting features;</li>
                  <li>Transmitting malicious payloads, worms, trojans, or corrupted code packages;</li>
                  <li>Using the platform to conduct unauthorized financial laundering or identity manipulation;</li>
                  <li>Impersonating another natural person or falsely claiming authorization on behalf of an enterprise.</li>
                </ul>
              </section>

              {/* Section 8 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 8. Disclaimer of Warranties
                </h4>
                <p className="text-muted-foreground">
                  THE SERVICE IS PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES
                  OF ANY KIND, EITHER EXPRESS, IMPLIED, STATUTORY, OR CASUAL. TO THE MAXIMUM EXTENT PERMISSIBLE UNDER
                  APPLICABLE LAW, PAIDLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF
                  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, ACCURACY, SYSTEM INTEGRATION, QUIET ENJOYMENT,
                  AND NON-INFRINGEMENT.
                </p>
                <p className="text-muted-foreground">
                  PAIDLY DOES NOT WARRANT THAT THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, ERROR-FREE, OR FREE OF
                  VIRUSES OR HARMFUL COMPONENTS, OR THAT RENEWAL DATES CALCULATED BY THE APP WILL PRECISELY MATCH ACTUAL
                  MERCHANT BILLING MOMENTS DOWN TO THE SECOND.
                </p>
              </section>

              {/* Section 9 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 9. Limitation of Liability & Damages Cap
                </h4>
                <p className="text-muted-foreground">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PAIDLY TECHNOLOGIES INC., ITS
                  OFFICERS, DIRECTORS, AFFILIATES, EMPLOYEES, AGENTS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT,
                  PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES
                  FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH
                  THE USE OF, OR INABILITY TO USE, THIS SERVICE.
                </p>
                <p className="text-muted-foreground">
                  UNDER NO CIRCUMSTANCES SHALL PAIDLY&rsquo;S AGGREGATE CUMULATIVE LIABILITY EXCEED THE GREATER OF: (A) THE
                  AMOUNT ACTUALLY PAID BY YOU TO PAIDLY FOR ACCESS TO THE SERVICE DURING THE THREE (3) MONTHS PRECEDING
                  THE EVENT GIVING RISE TO LIABILITY, OR (B) FIFTY UNITED STATES DOLLARS ($50.00 USD).
                </p>
              </section>

              {/* Section 10 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 10. Indemnification Obligations
                </h4>
                <p className="text-muted-foreground">
                  You agree to defend, indemnify, and hold harmless Paidly, its parent, subsidiaries, affiliates, and their
                  respective officers, directors, agents, and employees from and against any third-party claims, liabilities,
                  damages, judgments, awards, losses, costs, expenses, or reasonable legal fees arising out of: (a) your breach
                  of this Agreement; (b) your violation of any applicable law or third-party intellectual property or privacy right;
                  or (c) fraudulent or unauthorized conduct executed via your account.
                </p>
              </section>

              {/* Section 11 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 11. Mandatory Binding Arbitration & Dispute Resolution
                </h4>
                <p className="text-muted-foreground">
                  Any dispute, controversy, or claim arising out of or relating to this Agreement, including the formation,
                  interpretation, breach, or termination thereof, shall be resolved through confidential, final, and binding
                  arbitration administered by the American Arbitration Association (&ldquo;AAA&rdquo;) under its Consumer Arbitration
                  Rules.
                </p>
                <p className="text-muted-foreground">
                  YOU AND PAIDLY AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY,
                  AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING.
                  THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON&rsquo;S CLAIMS.
                </p>
              </section>

              {/* Section 12 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 12. Governing Law & Jurisdiction
                </h4>
                <p className="text-muted-foreground">
                  This Agreement and any dispute arising out of or in connection with it shall be governed by and construed
                  in accordance with the laws of the State of Delaware, United States, without giving effect to any principles
                  of conflicts of law. To the extent any dispute is deemed not subject to mandatory arbitration, you agree to
                  submit to the exclusive personal jurisdiction of the state and federal courts located in New Castle County, Delaware.
                </p>
              </section>

              {/* Section 13 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 13. Severability & Entire Agreement
                </h4>
                <p className="text-muted-foreground">
                  If any provision of these Terms is found to be unlawful, void, or unenforceable, that provision shall be
                  deemed severable and shall not affect the validity and enforceability of any remaining provisions. These Terms,
                  together with our Privacy Policy, constitute the entire legal agreement between you and Paidly concerning the Service.
                </p>
              </section>

              {/* Section 14 */}
              <section className="pt-4 space-y-2 pb-6">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Section 14. Legal Notices & Communications
                </h4>
                <p className="text-muted-foreground">
                  All formal legal notices, claims, or regulatory inquiries must be transmitted in writing to:
                </p>
                <div className="p-3 rounded-xl bg-accent/60 border border-border/70 text-[11px] text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Paidly Technologies Inc. — Legal Operations</p>
                  <p>1209 Orange Street, Wilmington, DE 19801, USA</p>
                  <p>Email: <span className="font-semibold text-foreground">legal@paidly.app</span></p>
                </div>
              </section>
            </>
          ) : (
            <>
              {/* Privacy Preamble */}
              <div className="pt-2 space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-500">
                  Global Privacy Standard
                </span>
                <h3 className="text-sm font-bold text-foreground">
                  COMPREHENSIVE PRIVACY POLICY & DATA PROCESSING ADDENDUM
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Paidly Technologies Inc. (&ldquo;Paidly&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is
                  committed to establishing and upholding the highest standards of user confidentiality, data protection, and
                  cryptographic security. This Global Privacy Policy details our comprehensive principles governing the collection,
                  classification, processing, persistence, retention, and transfer of personal information when you access our
                  subscription tracking application, client dashboard, Progressive Web App (PWA), or associated support channels.
                </p>
              </div>

              {/* Privacy 1 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  1. Data Controller Identification
                </h4>
                <p className="text-muted-foreground">
                  For the purposes of the General Data Protection Regulation (Regulation (EU) 2016/679) and the UK Data Protection
                  Act 2018, the designated Data Controller responsible for your personal information is:
                </p>
                <div className="p-3 rounded-xl bg-accent/60 border border-border/70 text-[11px] text-muted-foreground space-y-0.5">
                  <p className="font-semibold text-foreground">Paidly Technologies Inc. (Data Governance Division)</p>
                  <p>Attn: Chief Privacy Officer</p>
                  <p>Inquiries: <span className="font-semibold text-foreground">dpo@paidly.app</span></p>
                </div>
              </section>

              {/* Privacy 2 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  2. Taxonomy of Personal Information Collected
                </h4>
                <p className="text-muted-foreground">
                  We categorize the personal information we receive or generate through your utilization of the Service as follows:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground font-semibold">Category A — Identity & Authentication Tokens:</strong>
                    Natural legal name, verified email address, cryptographic salted password hashes, user profile avatars,
                    and device authorization identifiers.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">Category B — Subscription Portfolio Metadata:</strong>
                    Names of subscribed merchants (e.g., Spotify, Netflix, YouTube), chosen subscription tiers, scheduled renewal dates,
                    billing recurrence frequency (weekly, monthly, annual), estimated currency allocations, and billing history logs.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">Category C — Card Assignment & Wallet References:</strong>
                    Non-sensitive card descriptors, including cardholder name display aliases, truncated last 4 account digits,
                    expiration indicators, and card association types (Visa, Mastercard). We NEVER store full 16-digit Primary
                    Account Numbers (PAN) or security CVV codes on remote database infrastructure.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">Category D — Device Telemetry & Session Diagnostics:</strong>
                    Operating system architecture (iOS, Android, macOS, Windows), WebKit/Chromium browser engine user-agent strings,
                    network IP addresses (anonymized at ingestion), viewport display metrics, crash reports, and performance latency indicators.
                  </li>
                </ul>
              </section>

              {/* Privacy 3 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  3. Legal Bases for Processing Under GDPR & Global Frameworks
                </h4>
                <p className="text-muted-foreground">
                  Under Article 6 of the General Data Protection Regulation, our lawful bases for collecting and processing
                  your personal information include:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                  <li>
                    <strong className="text-foreground font-semibold">Contractual Performance (Art. 6(1)(b)):</strong>
                    Executing the core functionalities of the Paidly application, compiling subscription schedules, and managing multi-card records.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">Legitimate Interests (Art. 6(1)(f)):</strong>
                    Detecting fraudulent or abusive bot traffic, maintaining application reliability, optimizing asset delivery, and safeguarding infrastructure.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">Explicit Consent (Art. 6(1)(a)):</strong>
                    Delivering push notifications, periodic spend digests, and client-side device reminders, which you may revoke at any moment.
                  </li>
                  <li>
                    <strong className="text-foreground font-semibold">Legal Compliance (Art. 6(1)(c)):</strong>
                    Adhering to statutory tax, reporting, and regulatory auditing obligations.
                  </li>
                </ul>
              </section>

              {/* Privacy 4 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  4. Local-First Storage Architecture & Offline Caching
                </h4>
                <p className="text-muted-foreground">
                  Paidly operates with an intentional local-first client architecture. Subscription records, customized card assignments,
                  and user preferences are persisted directly within your device&rsquo;s sandboxed Web Storage API (localStorage)
                  and IndexedDB databases.
                </p>
                <p className="text-muted-foreground">
                  When you access Paidly as an installed Progressive Web App (PWA), our Service Worker caches application assets
                  and encrypted subscription states on your physical device. This ensures full offline availability without transmitting
                  your day-to-day subscription views across public networks. You can clear this stored data at any time via your browser
                  or mobile system storage controls.
                </p>
              </section>

              {/* Privacy 5 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  5. Zero Sale or Commercialization of User Data
                </h4>
                <p className="text-muted-foreground font-semibold text-foreground">
                  PAIDLY HAS NEVER SOLD, RENTED, LEASED, OR COMMERCIALLY TRANSFERRED USER PERSONAL DATA, FINANCIAL RECORDS, OR
                  SUBSCRIPTION HABITS TO DATA BROKERS, ADVERTISING NETWORKS, OR MARKETING CONGLOMERATES.
                </p>
                <p className="text-muted-foreground">
                  We do not monetize our users through behavioral advertising auctions or third-party programmatic tracking pixels.
                  Our business model relies exclusively on subscription tier offerings, not data harvesting.
                </p>
              </section>

              {/* Privacy 6 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  6. Third-Party Sub-Processors & Service Providers
                </h4>
                <p className="text-muted-foreground">
                  We contract with carefully vetted technical service providers to maintain application hosting and stability.
                  Each sub-processor is bound by strict Data Processing Agreements (DPAs) requiring adherence to equivalent privacy standards:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li><strong className="text-foreground font-semibold">Hosting & Server Infrastructure:</strong> Render Services Inc. (Secure SOC2-certified cloud infrastructure);</li>
                  <li><strong className="text-foreground font-semibold">Error Monitoring & Diagnostics:</strong> Encrypted telemetry engines with PII masking;</li>
                  <li><strong className="text-foreground font-semibold">DNS & SSL Edge Delivery:</strong> Cloudflare Inc. (DDoS mitigation and global edge CDN).</li>
                </ul>
              </section>

              {/* Privacy 7 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  7. Data Security, Cryptographic Protocols & Breach Response
                </h4>
                <p className="text-muted-foreground">
                  We implement robust administrative, physical, and technical safeguards engineered to prevent unauthorized access,
                  alteration, destruction, or disclosure of your data. All network communications are mandated over Transport Layer Security
                  (TLS 1.3) with strict HTTP Strict Transport Security (HSTS) headers.
                </p>
                <p className="text-muted-foreground">
                  In the improbable event of a validated security incident affecting personal data, Paidly maintains a computerized
                  Incident Response Plan complying with Article 33 of the GDPR, providing formal notification to relevant supervisory
                  authorities and affected data subjects without undue delay (within 72 hours of verification).
                </p>
              </section>

              {/* Privacy 8 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  8. Your Statutory Privacy Rights (GDPR & CCPA/CPRA)
                </h4>
                <p className="text-muted-foreground">
                  Subject to statutory exceptions, you are entitled to exercise the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground">
                  <li><strong className="text-foreground font-semibold">Right of Access (Art. 15 GDPR):</strong> Obtain confirmation and copies of your processed data;</li>
                  <li><strong className="text-foreground font-semibold">Right to Rectification (Art. 16 GDPR):</strong> Correct inaccurate or incomplete profile records;</li>
                  <li><strong className="text-foreground font-semibold">Right to Erasure (&ldquo;Right to be Forgotten&rdquo;) (Art. 17 GDPR):</strong> Request total deletion of your account and records;</li>
                  <li><strong className="text-foreground font-semibold">Right to Data Portability (Art. 20 GDPR):</strong> Export your subscription portfolio in standardized JSON format;</li>
                  <li><strong className="text-foreground font-semibold">Right to Non-Discrimination:</strong> Exercise your rights without experiencing degraded service or price discrimination.</li>
                </ul>
              </section>

              {/* Privacy 9 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  9. Data Retention Schedules
                </h4>
                <p className="text-muted-foreground">
                  We retain personal information only for as long as your account remains active or as strictly required to fulfill
                  the purposes outlined in this policy. Upon receipt of a verified account deletion request, your account data is
                  purged from active database clusters within thirty (30) days, and subsequently overwritten in encrypted rolling backups.
                </p>
              </section>

              {/* Privacy 10 */}
              <section className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  10. Children&rsquo;s Privacy (COPPA & Global Standards)
                </h4>
                <p className="text-muted-foreground">
                  Our Service is strictly directed to adults and does not intentionally solicit, collect, or process information from
                  children under the age of sixteen (16). If we learn that we have inadvertently collected personal data from a minor,
                  we will promptly take measures to delete such data from our systems.
                </p>
              </section>

              {/* Privacy 11 */}
              <section className="pt-4 space-y-2 pb-6">
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">
                  11. Contacting the Data Protection Officer (DPO)
                </h4>
                <p className="text-muted-foreground">
                  If you have questions, comments, or statutory rights requests regarding this Privacy Policy, please contact our
                  designated DPO and Privacy Governance team:
                </p>
                <div className="p-3 rounded-xl bg-accent/60 border border-border/70 text-[11px] text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Data Protection Officer — Paidly Technologies Inc.</p>
                  <p>Inquiries & Deletion Requests: <span className="font-semibold text-foreground">privacy@paidly.app</span></p>
                  <p>Security Vulnerabilities: <span className="font-semibold text-foreground">security@paidly.app</span></p>
                </div>
              </section>
            </>
          )}

          {/* Bottom Confirmation Button inside the sheet */}
          <div className="pt-4 pb-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
            >
              I Have Read & Agree to These Terms
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
