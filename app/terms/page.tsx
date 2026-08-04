import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Spartan Coatings",
  description:
    "Terms of Service for Spartan Coatings, serving concrete coating customers in Northeast Florida.",
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

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ ...paragraphStyle, color: "#6f7b70" }}>
          Last updated: August 4, 2026
        </p>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Agreement to These Terms</h2>
          <p style={paragraphStyle}>
            By accessing or using this website, calling Spartan Coatings, or
            submitting any form or request through this site, you agree to these
            Terms of Service. If you do not agree, please do not use the site or
            submit information through it.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Website Information</h2>
          <p style={paragraphStyle}>
            The content on this website is provided for general informational
            purposes. It is intended to help visitors understand concrete
            coating services, preparation methods, materials, and the types of
            projects Spartan Coatings may perform. Site content is not a promise,
            warranty, engineering opinion, or substitute for an on-site project
            evaluation.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Quotes and Estimates</h2>
          <p style={paragraphStyle}>
            Any price range, quote, estimate, recommendation, timeline, or other
            project information provided through the website, by phone, by text,
            by email, or during an initial evaluation is preliminary and is not
            binding. A project becomes binding only after the parties sign a
            written contract describing the approved scope, price, payment terms,
            materials, schedule, exclusions, and other applicable terms.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Communications</h2>
          <p style={paragraphStyle}>
            When you provide contact information, you authorize Spartan Coatings
            to respond to your inquiry using the contact methods you supplied,
            subject to the consent language shown on the form and our Privacy
            Policy. Message and data rates may apply to text messages. You may
            opt out of text messages by replying STOP.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Acceptable Use</h2>
          <p style={paragraphStyle}>
            You may use this website only for lawful purposes. You may not try to
            disrupt the site, gain unauthorized access, submit false or harmful
            information, copy content for commercial misuse, or use the website
            in a way that could damage Spartan Coatings or another person.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Intellectual Property</h2>
          <p style={paragraphStyle}>
            The website design, text, graphics, logos, photographs, videos, and
            other content are owned by or licensed to Spartan Coatings and are
            protected by applicable intellectual property laws. Limited personal,
            noncommercial viewing is permitted. No other use is authorized
            without prior written permission.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Limitation of Liability</h2>
          <p style={paragraphStyle}>
            To the fullest extent permitted by law, Spartan Coatings will not be
            liable for indirect, incidental, special, consequential, or punitive
            damages arising from the use of, or inability to use, this website.
            We do not guarantee that the site will always be available, error-free,
            or free from harmful components. Nothing in these terms limits any
            liability that cannot legally be limited under applicable law.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Third-Party Services and Links</h2>
          <p style={paragraphStyle}>
            The website may use or link to third-party services such as analytics,
            advertising, scheduling, communications, maps, or social platforms.
            Spartan Coatings is not responsible for the content, availability, or
            privacy practices of third-party services.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Governing Law</h2>
          <p style={paragraphStyle}>
            These Terms of Service are governed by the laws of the State of
            Florida, without regard to conflict-of-law principles. Any dispute
            relating to the website or these terms will be handled in a court of
            competent jurisdiction in Florida, unless a signed written agreement
            provides otherwise.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={headingStyle}>Changes to These Terms</h2>
          <p style={paragraphStyle}>
            We may update these terms from time to time. The current version will
            be posted on this page with the updated date. Continued use of the
            website after changes are posted means you accept the revised terms.
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
          <a href="/privacy" style={{ color: "#182019", fontWeight: 800 }}>
            Privacy Policy
          </a>
        </div>
      </article>
    </main>
  );
}
