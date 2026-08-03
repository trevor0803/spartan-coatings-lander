"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type TemplateProps = {
  children: ReactNode;
};

type SpriteProject = {
  title: "Garage Floor Coating" | "Pool Deck Coating" | "Patio Coating";
  kind: "sprite";
  col: 0 | 1 | 2 | 3;
  row: 0 | 1 | 2;
};

type ImageProject = {
  title: "Garage Floor Coating";
  kind: "image";
  src: string;
};

type GalleryProject = SpriteProject | ImageProject;

const galleryProjects: GalleryProject[] = [
  { title: "Garage Floor Coating", kind: "sprite", col: 1, row: 0 },
  { title: "Garage Floor Coating", kind: "sprite", col: 2, row: 0 },
  { title: "Garage Floor Coating", kind: "sprite", col: 3, row: 0 },
  { title: "Garage Floor Coating", kind: "sprite", col: 0, row: 1 },
  { title: "Garage Floor Coating", kind: "sprite", col: 1, row: 1 },
  { title: "Garage Floor Coating", kind: "sprite", col: 2, row: 1 },
  { title: "Garage Floor Coating", kind: "image", src: "/projects/pool-deck.webp" },
  { title: "Pool Deck Coating", kind: "sprite", col: 3, row: 1 },
  { title: "Pool Deck Coating", kind: "sprite", col: 0, row: 2 },
  { title: "Patio Coating", kind: "sprite", col: 1, row: 2 },
  { title: "Patio Coating", kind: "sprite", col: 2, row: 2 },
];

function ProjectGallery() {
  return (
    <>
      {galleryProjects.map((project, index) => (
        <figure className="gallery-project-new" key={`${project.title}-${index}`}>
          {project.kind === "image" ? (
            <img
              className="gallery-photo"
              src={project.src}
              alt={`Spartan Coatings ${project.title}`}
              loading={index < 4 ? "eager" : "lazy"}
            />
          ) : (
            <div
              className="gallery-crop"
              role="img"
              aria-label={`Spartan Coatings ${project.title}`}
            >
              <img
                className="gallery-sprite-sheet"
                src="/projects/gallery-sprite.webp?v=3"
                alt=""
                aria-hidden="true"
                style={{
                  left: `${project.col * -100}%`,
                  top: `${project.row * -100}%`,
                }}
              />
            </div>
          )}
          <figcaption>{project.title}</figcaption>
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
  }, []);

  return (
    <>
      {children}
      {gallery ? createPortal(<ProjectGallery />, gallery) : null}
      <style>{`
        .projects .section-heading > p:not(.kicker) {
          display: none !important;
        }

        .project-grid.gallery-eleven {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 14px !important;
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

        .gallery-crop,
        .project-grid.gallery-eleven img.gallery-photo {
          display: block !important;
          width: 100% !important;
          aspect-ratio: 16 / 9 !important;
          height: auto !important;
        }

        .gallery-crop {
          overflow: hidden !important;
          position: relative !important;
        }

        .gallery-sprite-sheet {
          display: block !important;
          position: absolute !important;
          width: 400% !important;
          height: 300% !important;
          max-width: none !important;
          object-fit: fill !important;
        }

        .project-grid.gallery-eleven img.gallery-photo {
          object-fit: cover !important;
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

        @media (max-width: 768px) {
          .project-grid.gallery-eleven {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
