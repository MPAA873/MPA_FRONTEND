"use client";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    id: "information-we-collect",
    number: "01",
    title: "Information We Collect",
    body: (
      <>
        <h3 className="mt-6 mb-2 text-[15px] font-semibold text-[#1F3A5F]">
          Personal information
        </h3>
        <ul className="policy-list">
          <li>Full name</li>
          <li>Email address</li>
          <li>Institutional affiliation</li>
          <li>Department</li>
          <li>Country</li>
          <li>ORCID iD (if provided)</li>
          <li>Contact details</li>
          <li>Profile photograph (optional)</li>
          <li>Professional biography (optional)</li>
        </ul>

        <h3 className="mt-6 mb-2 text-[15px] font-semibold text-[#1F3A5F]">
          Manuscript information
        </h3>
        <p className="policy-p">When authors submit manuscripts, we collect:</p>
        <ul className="policy-list">
          <li>Manuscript files</li>
          <li>Supplementary files</li>
          <li>Author details</li>
          <li>Corresponding author information</li>
          <li>Funding information</li>
          <li>Conflict of interest declarations</li>
          <li>Ethical approval statements</li>
          <li>Copyright and licensing information</li>
        </ul>

        <h3 className="mt-6 mb-2 text-[15px] font-semibold text-[#1F3A5F]">
          Reviewer information
        </h3>
        <p className="policy-p">For reviewers, we may collect:</p>
        <ul className="policy-list">
          <li>Name</li>
          <li>Email address</li>
          <li>Institution</li>
          <li>Areas of expertise</li>
          <li>Review comments</li>
          <li>Recommendation on submitted manuscripts</li>
        </ul>

        <h3 className="mt-6 mb-2 text-[15px] font-semibold text-[#1F3A5F]">
          Automatically collected information
        </h3>
        <p className="policy-p">When you browse our website, we may automatically collect:</p>
        <ul className="policy-list">
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Operating system</li>
          <li>Date and time of access</li>
          <li>Pages visited</li>
          <li>Referral source</li>
          <li>Cookies and usage analytics</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-your-information",
    number: "02",
    title: "How We Use Your Information",
    body: (
      <>
        <p className="policy-p">We use your information to:</p>
        <ul className="policy-list">
          <li>Process manuscript submissions</li>
          <li>Manage peer review</li>
          <li>Publish accepted articles</li>
          <li>Communicate with authors, reviewers and editors</li>
          <li>Verify author identity</li>
          <li>Improve our journal platform</li>
          <li>Respond to enquiries</li>
          <li>Prevent fraud and plagiarism</li>
          <li>Maintain publication records</li>
          <li>Comply with legal and ethical publishing requirements</li>
        </ul>
      </>
    ),
  },
  {
    id: "peer-review-confidentiality",
    number: "03",
    title: "Peer Review Confidentiality",
    body: (
      <>
        <p className="policy-p">
          All manuscripts submitted to MPA Research are treated as confidential.
        </p>
        <p className="policy-p">
          Reviewer identities and review comments are handled according to the
          peer review model adopted by the journal, unless disclosure is
          required by law or publication policy.
        </p>
        <p className="policy-p">
          Editors and reviewers are expected to maintain confidentiality
          throughout the review process.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies",
    body: (
      <>
        <p className="policy-p">Our website uses cookies to:</p>
        <ul className="policy-list">
          <li>Improve website functionality</li>
          <li>Remember user preferences</li>
          <li>Maintain login sessions</li>
          <li>Measure website performance</li>
          <li>Understand visitor behaviour using analytics tools</li>
        </ul>
        <p className="policy-p">
          You may disable cookies through your browser settings. Some website
          features may not function correctly if cookies are disabled.
        </p>
      </>
    ),
  },
  {
    id: "sharing-of-information",
    number: "05",
    title: "Sharing of Information",
    body: (
      <>
        <p className="policy-p">
          We do not sell, rent or trade your personal information.
        </p>
        <p className="policy-p">We may share information only with:</p>
        <ul className="policy-list">
          <li>Editors handling manuscripts</li>
          <li>Assigned peer reviewers</li>
          <li>Publishing service providers</li>
          <li>Website hosting providers</li>
          <li>Payment processors (where applicable)</li>
          <li>Government or legal authorities when required by law</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    number: "06",
    title: "Data Security",
    body: (
      <>
        <p className="policy-p">
          We implement reasonable administrative, technical and organizational
          safeguards to protect your personal information from unauthorized
          access, alteration, disclosure or destruction.
        </p>
        <p className="policy-p">
          Although we strive to protect your information, no internet
          transmission or electronic storage method can be guaranteed to be
          completely secure.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    number: "07",
    title: "Data Retention",
    body: (
      <>
        <p className="policy-p">We retain information for as long as necessary to:</p>
        <ul className="policy-list">
          <li>Maintain scholarly publication records</li>
          <li>Preserve published research</li>
          <li>Meet legal obligations</li>
          <li>Resolve disputes</li>
          <li>Support academic integrity investigations</li>
        </ul>
        <p className="policy-p">
          Published article metadata may remain permanently available as part
          of the scholarly record.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    number: "08",
    title: "Your Rights",
    body: (
      <>
        <p className="policy-p">Depending on applicable laws, you may have the right to:</p>
        <ul className="policy-list">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Update your profile</li>
          <li>Request deletion of personal data where legally permissible</li>
          <li>Withdraw consent for certain processing activities</li>
          <li>Request a copy of your personal information</li>
        </ul>
        <p className="policy-p">Requests can be submitted using the contact information below.</p>
      </>
    ),
  },
  {
    id: "third-party-services",
    number: "09",
    title: "Third-Party Services",
    body: (
      <>
        <p className="policy-p">Our website may use trusted third-party services such as:</p>
        <ul className="policy-list">
          <li>Google Analytics</li>
          <li>DOI registration agencies</li>
          <li>ORCID</li>
          <li>Crossref</li>
          <li>Anti-plagiarism services</li>
          <li>Payment gateways (if article processing charges are collected)</li>
        </ul>
        <p className="policy-p">These providers have their own privacy policies governing their services.</p>
      </>
    ),
  },
  {
    id: "external-links",
    number: "10",
    title: "External Links",
    body: (
      <>
        <p className="policy-p">Our website may contain links to external websites.</p>
        <p className="policy-p">
          We are not responsible for the privacy practices or content of
          third-party websites.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    number: "11",
    title: "Children's Privacy",
    body: (
      <p className="policy-p">
        MPA Research does not knowingly collect personal information from
        individuals under the age of 18.
      </p>
    ),
  },
  {
    id: "international-users",
    number: "12",
    title: "International Users",
    body: (
      <p className="policy-p">
        As an international scholarly publisher, your information may be
        processed in countries where our editors, reviewers or service
        providers operate. By using our services, you consent to such
        processing in accordance with applicable data protection laws.
      </p>
    ),
  },
  {
    id: "changes-to-this-policy",
    number: "13",
    title: "Changes to This Privacy Policy",
    body: (
      <>
        <p className="policy-p">We may update this Privacy Policy from time to time.</p>
        <p className="policy-p">
          The updated version will be posted on this page together with the
          revised effective date.
        </p>
      </>
    ),
  },
  {
    id: "contact-us",
    number: "14",
    title: "Contact Us",
    body: (
      <>
        <p className="policy-p">
          If you have any questions regarding this Privacy Policy or your
          personal information, please contact:
        </p>
        <div className="mt-4 rounded-md border border-[#DCD7CB] bg-[#FBFAF6] px-5 py-4 text-[13px] leading-7 text-[#33394A]">
          <div className="font-semibold text-[#1F3A5F]">MPA Research</div>
          <div>
            Website:{" "}
            <a
              href="https://www.mparesearch.com"
              className="text-[#8A5A22] underline underline-offset-2 hover:text-[#6e4519]"
            >
              www.mparesearch.com
            </a>
          </div>
          <div>
            Email:{" "}
            <a
              href="mailto:info@mparesearch.com"
              className="text-[#8A5A22] underline underline-offset-2 hover:text-[#6e4519]"
            >
              info@mparesearch.com
            </a>
          </div>
        </div>
        <p className="policy-p mt-4">
          We will make reasonable efforts to respond to your enquiry promptly.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyContent({ effectiveDate }) {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const sectionRefs = useRef({});

  const formattedDate = new Date(effectiveDate + "T00:00:00").toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    SECTIONS.forEach((s) => {
      const el = sectionRefs.current[s.id];
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToId = (id) => {
    const el = sectionRefs.current[id];
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F7F5F0] text-[#1E2432] antialiased"
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .policy-p {
          margin-bottom: 0.9rem;
          line-height: 1.75;
          color: #33394a;
        }
        .policy-list {
          margin: 0 0 1rem 0;
          padding-left: 0;
          list-style: none;
        }
        .policy-list li {
          position: relative;
          padding-left: 1.1rem;
          margin-bottom: 0.45rem;
          line-height: 1.6;
          color: #33394a;
        }
        .policy-list li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.65rem;
          width: 5px;
          height: 5px;
          background: #9c6b30;
          border-radius: 9999px;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .print-break {
            break-inside: avoid;
          }
        }
      `}</style>

      {/* ================= Masthead ================= */}
      <header className="border-b border-[#DCD7CB] bg-[#FBFAF6]">
        <div className="mx-auto max-w-6xl px-6 pt-14 pb-10 sm:px-10">
          <p className="text-xs tracking-[0.25em] text-[#8A5A22] uppercase">
            MPA Research &middot; Governance &amp; Compliance
          </p>

          <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="text-4xl font-semibold leading-tight text-[#1F3A5F] sm:text-5xl">
              Privacy Policy
            </h1>

            {/* Signature element: a journal-style "document info" panel,
                echoing the article-info box found on a published paper. */}
            <dl className="grid w-full max-w-sm grid-cols-2 gap-x-6 gap-y-2 rounded-md border border-[#DCD7CB] bg-white px-5 py-4 text-[12px] leading-6 text-[#33394A] lg:w-auto">
              <dt className="text-[#8A5A22]">Document</dt>
              <dd>Privacy Policy</dd>
              <dt className="text-[#8A5A22]">Effective date</dt>
              <dd>{formattedDate}</dd>
              <dt className="text-[#8A5A22]">Applies to</dt>
              <dd>Authors, reviewers, editors, visitors</dd>
              <dt className="text-[#8A5A22]">Publisher</dt>
              <dd>MPA Research</dd>
            </dl>
          </div>

          <p className="mt-6 max-w-2xl text-[15px] leading-7 text-[#4A5262]">
            MPA Research is committed to protecting the privacy of our
            authors, reviewers, editors, readers and website visitors. This
            page explains how we collect, use, store and protect personal
            information across manuscript submission, peer review and
            publication.
          </p>

          <button
            onClick={() => window.print()}
            className="no-print mt-8 inline-flex items-center gap-2 rounded-md border border-[#1F3A5F] px-4 py-2 text-[13px] font-medium text-[#1F3A5F] transition-colors hover:bg-[#1F3A5F] hover:text-white"
          >
            Print / Save as PDF
          </button>
        </div>
      </header>

      {/* ================= Body ================= */}
      <div className="mx-auto max-w-6xl px-6 py-12 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr]">
          {/* ---------- Sticky TOC ---------- */}
          <nav
            aria-label="Table of contents"
            className="no-print order-2 lg:order-1 lg:sticky lg:top-10 lg:h-fit"
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#8A5A22]">
              Contents
            </p>
            <ul className="space-y-1 border-l border-[#DCD7CB]">
              {SECTIONS.map((s) => {
                const isActive = activeId === s.id;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollToId(s.id)}
                      className={`-ml-px flex w-full items-baseline gap-2 border-l-2 py-1.5 pl-4 text-left text-[13px] transition-colors ${
                        isActive
                          ? "border-[#9C6B30] text-[#1F3A5F] font-semibold"
                          : "border-transparent text-[#5B6472] hover:text-[#1F3A5F]"
                      }`}
                    >
                      <span className="text-[11px] text-[#9C6B30]">
                        {s.number}
                      </span>
                      {s.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ---------- Sections ---------- */}
          <main className="order-1 min-w-0 lg:order-2">
            {SECTIONS.map((s, idx) => (
              <section
                key={s.id}
                id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
                className={`print-break scroll-mt-24 ${
                  idx !== 0 ? "mt-12 border-t border-[#DCD7CB] pt-10" : ""
                }`}
              >
                <div className="mb-3 flex items-baseline gap-3">
                  <span className="text-sm text-[#9C6B30]">
                    {s.number}
                  </span>
                  <h2 className="text-2xl font-semibold text-[#1F3A5F]">
                    {s.title}
                  </h2>
                </div>
                <div className="text-[15px]">{s.body}</div>
              </section>
            ))}

            <footer className="mt-16 border-t border-[#DCD7CB] pt-8 text-[13px] text-[#5B6472]">
              <p>
                &copy; {new Date().getFullYear()} MPA Research. This Privacy
                Policy was last revised on {formattedDate}.
              </p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
}