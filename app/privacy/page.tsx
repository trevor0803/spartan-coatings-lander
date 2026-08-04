import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Spartan Coatings",
  description:
    "Privacy Policy for Spartan Coatings, serving concrete coating customers in Northeast Florida.",
};

const sectionStyle = {
  marginTop: "32px",
} as const;

const headingStyle = {
  color: "#182019",
  fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
  marginBottom: "10px",
} as const;

const paragraphStyle = {
  color: "#3f4940",
  fontSize: "1rem",
  lineHeight: 1.75,
  margin: "0 0 16px",
} as const;

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f4f2ec" }}>
      <header
        style={{
          alignItems: "center",
          background: "#111713",
          display: "flex",
          justifyContent: "space-between",
          padding: "18px clamp(20px, 5vw, 64px)",
        }}
      >
        <a href="/" aria-label="Spartan Coatings home">
          <img
            src="/spartan-logo.png"
            alt="Spartan Coatings"
            style={{ display: "block", height: "48px", width: "auto" }}
          />
        </a>
        <a
          href="tel:+19047097794"
          style={{ color: "#fff", fontWeight: 800, textDecoration: "none" }}
        >
          (904) 709-7794
        </a>
      </header>

      <article
        style={{
          background: "#fff",
          boxShadow: "0 20px 60px rgba(20, 30, 22, 0.08)",
          margin: "clamp(28px, 6vw, 72px) auto",
          maxWidth: "860px",
          padding: "clamp(28px, 6vw, 64px)",
          width: "calc(100% - 32px)",
        }}
      >
        <p
          style={{
            color: "#6f7b70",
            fontSize: "0.78rem",
            fontWeight: 800,
            letterSpacing: "0.12em",
            margin: "0 0 12px",
            textTransform: "uppercase",
          }}
        >
          Spartan Coatings
        </p>
        <h1
          style={{
            color: "#111713",
            fontSize: "clamp(2.2rem, 6vw, 4.2rem)",
            lineHeight: 1.02,
            margin: "0 0 12px",
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ ...paragraphStyle, color: "#6f7b70" }}>
          Last updated: August 4, 2026
        </p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Who We Are</h2>
          <p style={paragraphStyle}>
            Spartan Coatings provides professional concrete coating services for
            homeowners and businesses throughout Northeast Florida. This policy
            explains how we collect, use, protect, and share information when
            you visit this website, submit a form, call us, or communicate with
            our team.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Information We Collect</h2>
          <p style={paragraphStyle}>
            We may collect your name, phone number, email address, property or
            project address, ZIP code, project type, approximate project size,
            scheduling preferences, comments, and other details you choose to
            provide. We may also collect standard website analytics such as
            browser type, device information, pages viewed, referring source,
            advertising click identifiers, and general usage data.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>How We Use Information</h2>
          <p style={paragraphStyle}>
            We use information to respond to inquiries, evaluate projects,
            provide quotes, schedule and confirm appointments, send reminders,
            follow up about requested services, improve our website and
            advertising, maintain records, and operate our business.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Text Messaging Consent</h2>
          <p style={paragraphStyle}>
            By providing your phone number and submitting a form on this website,
            you consent to receive text messages from Spartan Coatings related to
            your inquiry, including appointment confirmations, reminders,
            follow-ups, and service updates. Message frequency varies. Message
            and data rates may apply. You can opt out at any time by replying
            STOP to any message. Reply HELP for assistance. Consent to receive
            text messages is not a condition of purchasing any goods or services.
          </p>
          <p style={paragraphStyle}>
            No mobile information will be shared with third parties or affiliates
            for marketing or promotional purposes. Information sharing to
            subcontractors in support services, such as customer service, is
            permitted. All other use-case categories exclude text messaging
            originator opt-in data and consent; this information will not be
            shared with, or obtained by, any third parties.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>How We Share Information</h2>
          <p style={paragraphStyle}>
            We do not sell personal information. We may share information only
            with service providers that help us operate our business, such as
            customer relationship management, communications, scheduling,
            analytics, advertising measurement, website hosting, and payment or
            administrative providers. These providers are permitted to use the
            information only to perform services for us or as required by law.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Data Security and Retention</h2>
          <p style={paragraphStyle}>
            We use reasonable administrative, technical, and physical safeguards
            designed to protect personal information. No internet transmission or
            storage system can be guaranteed completely secure. We retain
            information only as long as reasonably necessary to respond to your
            request, provide services, maintain business and legal records,
            resolve disputes, and meet applicable obligations.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Your Choices and Rights</h2>
          <p style={paragraphStyle}>
            You may request access to, correction of, or deletion of personal
            information we maintain about you. You may also opt out of marketing
            communications at any time. Text message recipients can reply STOP,
            and email recipients can use any available unsubscribe option or
            contact us directly.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Contact Us</h2>
          <p style={paragraphStyle}>
            Spartan Coatings
            <br />
            Northeast Florida
            <br />
            <a href="tel:+19047097794" style={{ color: "#182019" }}>
              904-709-7794
            </a>
          </p>
        </section>

        <div
          style={{
            borderTop: "1px solid #dde2dc",
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            marginTop: "40px",
            paddingTop: "22px",
          }}
        >
          <a href="/" style={{ color: "#182019", fontWeight: 800 }}>
            Back to Home
          </a>
          <a href="/terms" style={{ color: "#182019", fontWeight: 800 }}>
            Terms of Service
          </a>
        </div>
      </article>
    </main>
  );
}
