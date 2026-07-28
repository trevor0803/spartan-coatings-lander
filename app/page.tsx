"use client";

import { FormEvent, useEffect, useState } from "react";

const PHONE_DISPLAY = "(904) 709-7794";
const PHONE_LINK = "tel:+19047097794";

const projectTypes = [
  "Garage",
  "Patio",
  "Pool Deck",
  "Driveway",
  "Walkway",
  "Porch",
  "Commercial",
  "Other",
];

const reviews = [
  {
    name: "Virginia Elizabeth",
    text: "Matthew Casey and his team were extremely courteous and highly skilled. Everything was explained clearly, and the garage, patio, and back deck were completed beautifully.",
  },
  {
    name: "Clifford Feuerstein",
    text: "Matt and his team exceeded all of our expectations. Their attitude and attention to detail was unsurpassed. Spartan Coatings is one of the best!",
  },
  {
    name: "Roberta Galler",
    text: "Great communication with Matt from start to finish. The crew kept their work area neat, and we are very happy with our patio and front porch.",
  },
];

const faqs = [
  [
    "Why is surface preparation so important?",
    "Most coating failures begin below the coating. Spartan mechanically diamond-grinds the slab, repairs damage, and creates the correct surface profile before installation.",
  ],
  [
    "Do you evaluate moisture?",
    "Yes. Florida slabs can move moisture even when the surface appears dry. Moisture conditions are evaluated before a system is recommended.",
  ],
  [
    "Is polyurea always better than epoxy?",
    "No single material is automatically best for every slab. The right system depends on moisture, UV exposure, traffic, slip resistance, and the condition of the concrete.",
  ],
  [
    "How much does a concrete coating cost?",
    "Pricing depends on square footage, slab condition, repairs, preparation, and the system selected. Your free evaluation provides a clear, project-specific price.",
  ],
  [
    "How do Florida conditions affect the floor?",
    "Heat, humidity, UV, and moisture can punish the wrong coating. Spartan selects materials and installation methods for Northeast Florida conditions.",
  ],
];

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  zip: string;
  projectTypes: string[];
  size: string;
  priority: string;
  timing: string;
  comments: string;
  consent: boolean;
};

const blankForm: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  zip: "",
  projectTypes: [],
  size: "",
  priority: "",
  timing: "",
  comments: "",
  consent: false,
};

type MetaPixel = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
};

export default function Home() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(blankForm);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const metaWindow = window as Window & {
      fbq?: MetaPixel;
      _fbq?: MetaPixel;
    };
    if (metaWindow.fbq) return;

    const fbq = ((...args: unknown[]) => {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    }) as MetaPixel;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    metaWindow.fbq = fbq;
    metaWindow._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);

    fbq("set", "autoConfig", false, "3187285261472604");
    fbq("init", "3187285261472604");
    fbq("track", "PageView");
  }, []);

  function toggleProject(project: string) {
    setForm((current) => ({
      ...current,
      projectTypes: current.projectTypes.includes(project)
        ? current.projectTypes.filter((item) => item !== project)
        : [...current.projectTypes, project],
    }));
  }

  function nextStep() {
    setError("");
    if (step === 0 && !form.projectTypes.length) {
      setError("Choose at least one area to continue.");
      return;
    }
    if (step === 1 && (!form.size || !form.priority)) {
      setError("Please answer both questions to continue.");
      return;
    }
    setStep((current) => Math.min(current + 1, 2));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("sending");

    try {
      const eventId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? `lead_${crypto.randomUUID()}`
          : `lead_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const cookies = Object.fromEntries(
        document.cookie
          .split(";")
          .map((item) => item.trim().split("="))
          .filter(([key]) => key),
      );
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          eventId,
          fbp: cookies._fbp || "",
          fbc: cookies._fbc || "",
          eventSourceUrl: window.location.href,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Please try again.");
      const fbq = (
        window as Window & {
          fbq?: (...args: unknown[]) => void;
        }
      ).fbq;
      fbq?.("track", "Lead", {}, { eventID: eventId });
      setStatus("success");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Please try again.",
      );
      setStatus("idle");
    }
  }

  return (
    <main>
      <header>
        <a href="#top" aria-label="Spartan Coatings home">
          <img src="https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/spartan-logo.png" alt="Spartan Coatings" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#why">Why Spartan</a>
          <a href="#video">Watch Matt</a>
          <a href="#work">Projects</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="header-phone" href={PHONE_LINK}>
          {PHONE_DISPLAY}
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Built To Last.</p>
          <h1>
            Northeast Florida&apos;s
            <em> Concrete Coating Experts.</em>
          </h1>
          <p className="hero-lead">
            Nearly 20 years of hands-on experience, professional preparation,
            premium materials, and systems selected for Florida concrete.
          </p>
          <div className="rating">
            <span>★★★★★</span>
            <strong>4.9 on Google</strong>
            <small>200+ homeowner reviews</small>
          </div>
          <div className="hero-matt">
            <img
              src="https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/matt-casey.webp"
              alt="Matt Casey, founder of Spartan Coatings"
            />
            <div>
              <span>Meet your coating expert</span>
              <strong>Matt Casey</strong>
              <small>Experience since 2005</small>
            </div>
          </div>
        </div>

        <div className="survey-wrap" id="evaluation">
          <div className="survey-topline">
            <span>Free concrete evaluation</span>
            <small>No pressure. Clear recommendations.</small>
          </div>
          <div className="survey-card">
            {status === "success" ? (
              <div className="survey-success">
                <span>✓</span>
                <p className="kicker">Request Received</p>
                <h2>Thanks. Matt&apos;s team will be in touch.</h2>
                <p>
                  We&apos;ll call or text to learn more and schedule your free
                  concrete evaluation.
                </p>
                <a className="button" href={PHONE_LINK}>
                  Call Now: {PHONE_DISPLAY}
                </a>
              </div>
            ) : (
              <form onSubmit={submitForm}>
                <div className="survey-progress">
                  {[0, 1, 2].map((item) => (
                    <span key={item} className={item <= step ? "active" : ""} />
                  ))}
                </div>
                <div className="survey-step-label">
                  Step {step + 1} of 3
                </div>

                {step === 0 && (
                  <div className="survey-screen">
                    <h2>What area are you looking to coat?</h2>
                    <p>Select all that apply.</p>
                    <div className="survey-options project-options">
                      {projectTypes.map((project) => (
                        <button
                          type="button"
                          key={project}
                          className={
                            form.projectTypes.includes(project)
                              ? "selected"
                              : ""
                          }
                          onClick={() => toggleProject(project)}
                          aria-pressed={form.projectTypes.includes(project)}
                        >
                          {form.projectTypes.includes(project) && <b>✓</b>}
                          {project}
                        </button>
                      ))}
                    </div>
                    {error && <p className="form-error">{error}</p>}
                    <button
                      className="button survey-next"
                      type="button"
                      onClick={nextStep}
                    >
                      Continue <span>→</span>
                    </button>
                  </div>
                )}

                {step === 1 && (
                  <div className="survey-screen">
                    <h2>A little more about the project.</h2>
                    <label>
                      Approximately how large is the area?
                      <select
                        value={form.size}
                        onChange={(event) =>
                          setForm({ ...form, size: event.target.value })
                        }
                      >
                        <option value="">Choose one</option>
                        <option>Small — under 400 sq. ft.</option>
                        <option>Medium — 400–800 sq. ft.</option>
                        <option>Large — over 800 sq. ft.</option>
                        <option>Not sure</option>
                      </select>
                    </label>
                    <label>
                      What matters most to you?
                      <select
                        value={form.priority}
                        onChange={(event) =>
                          setForm({ ...form, priority: event.target.value })
                        }
                      >
                        <option value="">Choose one</option>
                        <option>Appearance</option>
                        <option>Durability</option>
                        <option>Easier maintenance</option>
                        <option>Protecting the concrete</option>
                        <option>All of the above</option>
                      </select>
                    </label>
                    {error && <p className="form-error">{error}</p>}
                    <div className="survey-nav">
                      <button
                        type="button"
                        className="back-button"
                        onClick={() => setStep(0)}
                      >
                        ← Back
                      </button>
                      <button
                        className="button"
                        type="button"
                        onClick={nextStep}
                      >
                        Continue <span>→</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="survey-screen contact-screen">
                    <h2>Where should we send your evaluation details?</h2>
                    <label>
                      When are you hoping to complete the project?
                      <select
                        required
                        value={form.timing}
                        onChange={(event) =>
                          setForm({ ...form, timing: event.target.value })
                        }
                      >
                        <option value="">Choose one</option>
                        <option>ASAP</option>
                        <option>Within 30 days</option>
                        <option>1–3 months</option>
                        <option>Just gathering information</option>
                      </select>
                    </label>
                    <div className="two-fields">
                      <label>
                        First Name
                        <input
                          required
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={(event) =>
                            setForm({ ...form, firstName: event.target.value })
                          }
                        />
                      </label>
                      <label>
                        Last Name
                        <input
                          required
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={(event) =>
                            setForm({ ...form, lastName: event.target.value })
                          }
                        />
                      </label>
                    </div>
                    <div className="two-fields">
                      <label>
                        Mobile Phone
                        <input
                          required
                          type="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(event) =>
                            setForm({ ...form, phone: event.target.value })
                          }
                        />
                      </label>
                      <label>
                        Email
                        <input
                          required
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={(event) =>
                            setForm({ ...form, email: event.target.value })
                          }
                        />
                      </label>
                    </div>
                    <label>
                      Project ZIP Code
                      <input
                        required
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        autoComplete="postal-code"
                        value={form.zip}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            zip: event.target.value
                              .replace(/\D/g, "")
                              .slice(0, 5),
                          })
                        }
                      />
                    </label>
                    <label>
                      Anything we should know?{" "}
                      <i className="optional">(optional)</i>
                      <textarea
                        rows={3}
                        value={form.comments}
                        onChange={(event) =>
                          setForm({ ...form, comments: event.target.value })
                        }
                      />
                    </label>
                    <label className="consent">
                      <input
                        required
                        type="checkbox"
                        checked={form.consent}
                        onChange={(event) =>
                          setForm({ ...form, consent: event.target.checked })
                        }
                      />
                      <span>
                        I agree to receive calls and texts from Spartan Coatings
                        about my request. Msg &amp; data rates may apply. Reply
                        STOP to opt out. Consent is not a condition of purchase.{" "}
                        <a
                          href="https://mat-spartan-coatings.vercel.app/privacy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Privacy
                        </a>{" "}
                        ·{" "}
                        <a
                          href="https://mat-spartan-coatings.vercel.app/terms"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms
                        </a>
                      </span>
                    </label>
                    {error && <p className="form-error">{error}</p>}
                    <div className="survey-nav">
                      <button
                        type="button"
                        className="back-button"
                        onClick={() => setStep(1)}
                      >
                        ← Back
                      </button>
                      <button
                        className="button"
                        type="submit"
                        disabled={status === "sending"}
                      >
                        {status === "sending"
                          ? "Sending..."
                          : "Schedule My Free Evaluation"}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
          <p className="privacy-note">
            Your information stays private and is only used to respond to your
            request.
          </p>
        </div>
      </section>

      <section className="trust-strip">
        <div>
          <strong>Since 2005</strong>
          <span>Hands-on coating expertise</span>
        </div>
        <div>
          <strong>Professional Preparation</strong>
          <span>Diamond grinding and concrete repair</span>
        </div>
        <div>
          <strong>Premium Materials</strong>
          <span>USA-made professional systems</span>
        </div>
        <div>
          <strong>Florida Experience</strong>
          <span>Heat, humidity, UV, and moisture considered</span>
        </div>
      </section>

      <section className="video-section section-dark" id="video">
        <div>
          <p className="kicker">Watch Before You Hire Anyone</p>
          <h2>Matt explains what makes a coating last.</h2>
          <p>
            Learn what proper preparation looks like, why moisture matters, and
            how to compare two coating estimates before making a decision.
          </p>
          <a className="button" href="#evaluation">
            Get My Free Evaluation <span>↑</span>
          </a>
        </div>
        <video
          controls
          playsInline
          preload="metadata"
          poster="https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/spartan-video-thumbnail.webp"
          aria-label="Matt Casey concrete coating buyer guide"
        >
          <source src="https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/matt-introduction.mp4" type="video/mp4" />
          Your browser does not support embedded video.
        </video>
      </section>

      <section className="why section" id="why">
        <div className="section-heading">
          <p className="kicker">Why Choose Spartan</p>
          <h2>A better coating starts below the surface.</h2>
          <p>
            Matt has worked with concrete coatings since 2005. His approach is
            simple: evaluate the slab, explain what it needs, and install the
            complete system correctly.
          </p>
        </div>
        <div className="feature-grid">
          <article>
            <span>01</span>
            <h3>Professional Surface Preparation</h3>
            <p>
              Diamond grinding, repairs, and the correct profile create the
              foundation for a durable bond.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Systems Designed for Florida</h3>
            <p>
              The recommendation considers moisture, UV, heat, traffic, and how
              you use the space.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Premium Materials. No Shortcuts.</h3>
            <p>
              Professional-grade materials are installed as a complete system,
              not sold as a one-product miracle.
            </p>
          </article>
        </div>
        <div className="section-cta">
          <p>Not sure which coating system fits your concrete?</p>
          <a className="button" href="#evaluation">
            See What My Concrete Needs <span>↑</span>
          </a>
        </div>
      </section>

      <section className="projects section" id="work">
        <div className="section-heading">
          <p className="kicker">Real Spartan Projects</p>
          <h2>Finished work across Northeast Florida.</h2>
          <p>
            Real garages, patios, driveways, and pool decks from Spartan
            Coatings.
          </p>
        </div>
        <div className="project-grid">
          {[
            ["https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/projects/garage.webp", "Garage Floor"],
            ["https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/projects/patio.webp", "Patio"],
            ["https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/projects/driveway.webp", "Driveway"],
            ["https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/projects/pool-deck.webp", "Pool Deck"],
          ].map(([src, title]) => (
            <figure key={title}>
              <img src={src} alt={`Spartan Coatings ${title}`} />
              <figcaption>{title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="section-cta">
          <p>Have a garage, patio, driveway, or pool deck in mind?</p>
          <a className="button" href="#evaluation">
            Discuss My Project <span>↑</span>
          </a>
        </div>
      </section>

      <section className="process section-dark">
        <div className="section-heading">
          <p className="kicker">The Spartan Process</p>
          <h2>Five clear steps. No guesswork.</h2>
          <p>
            You will understand what your concrete needs and why before
            installation begins.
          </p>
        </div>
        <div className="process-grid">
          {[
            ["01", "Schedule Evaluation"],
            ["02", "Concrete Assessment"],
            ["03", "Custom Recommendation"],
            ["04", "Professional Installation"],
            ["05", "Enjoy Your New Floor"],
          ].map(([number, title]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
        <div className="section-cta section-cta-dark">
          <p>Your first step takes about 60 seconds.</p>
          <a className="button" href="#evaluation">
            Start My Free Evaluation <span>↑</span>
          </a>
        </div>
      </section>

      <section className="reviews section">
        <div className="section-heading">
          <p className="kicker">Customer Reviews</p>
          <h2>Trusted from the first conversation to the final walkthrough.</h2>
          <p>4.9 stars on Google from Northeast Florida homeowners.</p>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.name}>
              <span>★★★★★</span>
              <p>“{review.text}”</p>
              <strong>{review.name}</strong>
              <small>Google review</small>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <p>Ready for a clear, project-specific recommendation?</p>
          <a className="button" href="#evaluation">
            Get My Recommendation <span>↑</span>
          </a>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="faq-heading">
          <p className="kicker">Straight Answers</p>
          <h2>Questions smart homeowners ask.</h2>
          <p>
            Good decisions start with clear information—not a high-pressure
            pitch.
          </p>
          <a className="button faq-button" href="#evaluation">
            Schedule My Free Evaluation <span>↑</span>
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <p className="kicker">Ready When You Are</p>
        <h2>Start with a free concrete evaluation.</h2>
        <p>Clear recommendations. Project-specific pricing. No pressure.</p>
        <a className="button" href="#evaluation">
          Start My 60-Second Evaluation <span>↑</span>
        </a>
      </section>

      <footer>
        <img src="https://spartan-coatings-trust.newleaf-digi-7833.chatgpt.site/spartan-logo.png" alt="Spartan Coatings" />
        <p>Jacksonville &amp; Northeast Florida</p>
        <a href={PHONE_LINK}>{PHONE_DISPLAY}</a>
        <span>
          © 2026 Spartan Coatings · DBA of FloorEver Solutions LLC
        </span>
      </footer>

      <a className="mobile-cta" href="#evaluation">
        Start Free Evaluation <span>→</span>
      </a>
    </main>
  );
}
