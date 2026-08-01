import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | TattvaTech" },
      {
        name: "description",
        content:
          "How TattvaTech collects, uses, and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy | TattvaTech" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrivacyPolicy,
});

const sections: [string, string[]][] = [
  [
    "1. Introduction",
    [
      "TattvaTech (\"we\", \"us\", \"our\") is a founder-led technology company headquartered in India. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you visit our website, engage our services, enroll in our training programs, or otherwise interact with us.",
      "By accessing our website or using our services, you agree to the practices described in this policy. If you do not agree, please discontinue use of our services.",
    ],
  ],
  [
    "2. Information We Collect",
    [
      "Contact information: name, email address, phone number, and organization details when you reach out, request a proposal, or enroll in a program.",
      "Usage information: pages visited, time spent, device type, browser, and approximate location, collected automatically through standard analytics.",
      "Correspondence: the content of messages you send us, including emails, support requests, and feedback.",
      "Job and education data: where you apply to join us or enroll in training, we may collect your resume, academic background, and relevant professional details.",
    ],
  ],
  [
    "3. How We Use Your Information",
    [
      "To respond to your inquiries, provide proposals, and deliver contracted services.",
      "To administer training programs, issue certificates, and manage enrollments.",
      "To improve our website, services, and the quality of our engagements through analytics and usage patterns.",
      "To send you relevant updates about our work, only where you have consented to receive them.",
      "To comply with legal obligations and protect our legal rights.",
    ],
  ],
  [
    "4. Cookies & Tracking",
    [
      "We use cookies and similar technologies to keep our website functional and to understand how visitors use it.",
      "Essential cookies: required for core site behavior such as navigation and security.",
      "Analytics cookies: help us understand aggregate usage so we can improve the site. These do not identify you personally.",
      "You can control or delete cookies through your browser settings. Disabling them may affect how the website functions.",
    ],
  ],
  [
    "5. Sharing & Disclosure",
    [
      "We do not sell your personal information. We share it only where necessary:",
      "With service providers who support our operations (hosting, analytics, communication tools), bound by confidentiality obligations.",
      "With legal or regulatory authorities where required by applicable law, or to protect our rights, safety, and property.",
      "In connection with a merger, acquisition, or similar corporate event, where the receiving entity is bound by this policy.",
    ],
  ],
  [
    "6. Data Security",
    [
      "We apply appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction.",
      "These include access controls, encrypted transmission where applicable, and periodic review of our security practices.",
      "No method of transmission over the internet is completely secure. While we work to protect your data, we cannot guarantee absolute security.",
    ],
  ],
  [
    "7. Data Retention",
    [
      "We retain personal information only as long as necessary to fulfil the purposes described in this policy, meet contractual obligations, or comply with legal requirements.",
      "Where information is no longer required, we delete or anonymize it in a secure manner.",
    ],
  ],
  [
    "8. Your Rights & Choices",
    [
      "Depending on your jurisdiction, you may have the right to access, correct, update, or delete your personal information, and to object to or restrict certain processing.",
      "You may withdraw consent for marketing communications at any time by using the unsubscribe link in any email or by contacting us directly.",
      "To exercise any of these rights, contact us at the address below. We will respond within the timeframes required by applicable law.",
    ],
  ],
  [
    "9. Children's Privacy",
    [
      "Our services are not directed at individuals under the age of 18, and we do not knowingly collect personal information from children.",
      "If you believe a child has provided us with personal information, please contact us so we can delete it.",
    ],
  ],
  [
    "10. Changes to This Policy",
    [
      "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements.",
      "We will post the revised policy on this page with an updated \"Last updated\" date. Significant changes will be communicated through appropriate channels.",
    ],
  ],
  [
    "11. Contact Us",
    [
      "If you have questions about this Privacy Policy or how we handle your personal information, reach us at:",
      "Email: hello@tattvatech.com",
      "We aim to acknowledge privacy requests within two business days and resolve them promptly.",
    ],
  ],
];

function PrivacyPolicy() {
  return (
    <main className="relative bg-ivory">
      {/* Minimal top bar */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-ivory/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4 md:px-10">
          <a href="/" data-cursor="hover" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg gradient-sunset text-ivory">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 3v18M3 12h18M7 7l10 10M17 7l-10 10" />
              </svg>
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Tattva<span className="text-orange">Tech</span>
            </span>
          </a>
          <a
            href="/"
            data-cursor="hover"
            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm text-charcoal transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 10H5M9 6l-4 4 4 4" />
            </svg>
            Back to home
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 md:pt-36">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70">
            <span className="h-px w-8 bg-orange/50" />
            <span>Legal</span>
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-balance">
            Privacy <span className="italic text-gradient-orange">Policy.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
            How TattvaTech collects, uses, and protects your personal
            information across our website, services, and training programs.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.24em] text-charcoal/60">
            Last updated · August 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 pt-14 md:pb-32 md:pt-20">
        <div className="mx-auto max-w-[1100px] px-6 md:px-10">
          <div className="space-y-14">
            {sections.map(([title, paras]) => (
              <article key={title}>
                <h2 className="font-display text-2xl leading-tight md:text-3xl">
                  {title}
                </h2>
                <div className="mt-4 space-y-4">
                  {paras.map((p) => (
                    <p
                      key={p}
                      className="max-w-2xl text-pretty text-sm leading-relaxed text-charcoal md:text-base"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 rounded-3xl border border-border bg-cream p-8 md:p-10">
            <h2 className="font-display text-2xl">Questions?</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-charcoal">
              Reach out at any time — we're happy to explain exactly what we
              collect and why.
            </p>
            <a
              href="mailto:hello@tattvatech.com"
              data-cursor="hover"
              className="mt-6 inline-flex items-center gap-3 rounded-full gradient-sunset px-6 py-3.5 text-sm font-medium text-ivory shadow-warm"
            >
              hello@tattvatech.com
              <span className="grid h-6 w-6 place-items-center rounded-full bg-ivory/20 text-ivory">
                <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 10h12M11 5l5 5-5 5" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-cream">
        <div className="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-4 px-6 py-8 text-xs text-charcoal md:flex-row md:items-center md:px-10">
          <div>© {new Date().getFullYear()} TattvaTech. All rights reserved.</div>
          <a
            href="/"
            data-cursor="hover"
            className="text-charcoal underline-offset-4 hover:text-ink hover:underline"
          >
            ← Back to home
          </a>
        </div>
      </footer>
    </main>
  );
}
