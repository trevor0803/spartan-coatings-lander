"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type TemplateProps = {
  children: ReactNode;
};

const galleryProjects = [
  ["/projects/garage-project-01.webp", "Garage Floor Coating"],
  ["/projects/garage-project-02.webp", "Garage Floor Coating"],
  ["/projects/garage-project-03.webp", "Garage Floor Coating"],
  ["/projects/garage-project-04.webp", "Garage Floor Coating"],
  ["/projects/garage-project-05.webp", "Garage Floor Coating"],
  ["/projects/garage-project-06.webp", "Garage Floor Coating"],
  ["/projects/pool-deck.webp", "Garage Floor Coating"],
  ["/projects/pool-project-user.webp", "Pool Deck Coating"],
  ["/projects/pool-deck-new.webp", "Pool Deck Coating"],
  ["/projects/patio-project-user.webp", "Patio Coating"],
  ["/projects/screened-patio.webp", "Patio Coating"],
] as const;

function ProjectGallery() {
  return (
    <>
      {galleryProjects.map(([src, title], index) => (
        <figure className="gallery-project-new" key={src}>
          <img
            className="gallery-photo"
            src={src}
            alt={`Spartan Coatings ${title}`}
            loading={index < 4 ? "eager" : "lazy"}
          />
          <figcaption>{title}</figcaption>
        </figure>
      ))}
    </>
  );
}

export default function Template({ children }: TemplateProps) {
  const [gallery, setGallery] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>(".project-grid");
    if (!target) return;

    target.classList.add("gallery-eleven");
    setGallery(target);

    const heroLead = document.querySelector<HTMLElement>(".hero-lead");
    if (heroLead) {
      heroLead.textContent =
        "Over 20 years of hands-on experience, professional preparation, premium materials, and systems selected for Florida concrete.";
    }
  }, []);

  return (
    <>
      {children}
      {gallery ? createPortal(<ProjectGallery />, gallery) : null}
      <style>{`
        .projects .section-heading > p:not(.kicker) {
          display: none !important;
        }

        .projects .section-cta p {
          font-size: 0;
        }

        .projects .section-cta p::after {
          content: "Have a garage, pool deck, or patio project in mind?";
          font-size: 13px;
        }

        .project-grid.gallery-eleven {
          display: grid !important;
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 14px !important;
          position: relative !important;
        }

        .project-grid.gallery-eleven > figure:not(.gallery-project-new) {
          display: none !important;
        }

        .project-grid.gallery-eleven .gallery-project-new,
        .project-grid.gallery-eleven .gallery-project-new:nth-child(4),
        .project-grid.gallery-eleven .gallery-project-new:nth-child(5) {
          display: block !important;
          grid-column: auto !important;
          height: auto !important;
          min-width: 0 !important;
          margin: 0 !important;
          overflow: hidden !important;
          position: relative !important;
          background: #111 !important;
        }

        .project-grid.gallery-eleven img.gallery-photo {
          display: block !important;
          width: 100% !important;
          height: auto !important;
          aspect-ratio: 16 / 9 !important;
          object-fit: cover !important;
          object-position: center !important;
        }

        .project-grid.gallery-eleven .gallery-project-new figcaption {
          background: rgba(12, 16, 12, .9) !important;
          bottom: 0 !important;
          color: white !important;
          font-size: 12px !important;
          font-weight: 800 !important;
          left: 0 !important;
          padding: 13px 16px !important;
          position: absolute !important;
          right: 0 !important;
        }

        @media (max-width: 1099px) and (min-width: 769px) {
          .project-grid.gallery-eleven {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .project-grid.gallery-eleven {
            grid-template-columns: none !important;
            grid-auto-flow: column !important;
            grid-auto-columns: 88% !important;
            gap: 12px !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            overscroll-behavior-inline: contain !important;
            padding: 0 0 12px !important;
            scroll-behavior: smooth !important;
            scroll-snap-type: x mandatory !important;
            scrollbar-width: none !important;
            -webkit-overflow-scrolling: touch !important;
          }

          .project-grid.gallery-eleven::-webkit-scrollbar {
            display: none !important;
          }

          .project-grid.gallery-eleven::after {
            content: "Swipe to see more →";
            color: #687166;
            font-size: 10px;
            font-weight: 800;
            letter-spacing: .08em;
            position: absolute;
            right: 0;
            top: -24px;
            text-transform: uppercase;
          }

          .project-grid.gallery-eleven .gallery-project-new {
            scroll-snap-align: start !important;
            scroll-snap-stop: always !important;
          }
        }
      `}</style>
    </>
  );
}
