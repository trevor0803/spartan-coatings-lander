"use client";

import { ReactNode, useLayoutEffect } from "react";

type TemplateProps = {
  children: ReactNode;
};

type SpriteProject = {
  title: "Garage Floor Coating" | "Pool Deck Coating" | "Patio Coating";
  kind: "sprite";
  x: "0%" | "33.333%" | "66.667%" | "100%";
  y: "0%" | "50%" | "100%";
};

type ImageProject = {
  title: "Garage Floor Coating";
  kind: "image";
  src: string;
};

type GalleryProject = SpriteProject | ImageProject;

const galleryProjects: GalleryProject[] = [
  { title: "Garage Floor Coating", kind: "sprite", x: "33.333%", y: "0%" },
  { title: "Garage Floor Coating", kind: "sprite", x: "66.667%", y: "0%" },
  { title: "Garage Floor Coating", kind: "sprite", x: "100%", y: "0%" },
  { title: "Garage Floor Coating", kind: "sprite", x: "0%", y: "50%" },
  { title: "Garage Floor Coating", kind: "sprite", x: "33.333%", y: "50%" },
  { title: "Garage Floor Coating", kind: "sprite", x: "66.667%", y: "50%" },
  { title: "Garage Floor Coating", kind: "image", src: "/projects/pool-deck.webp" },
  { title: "Pool Deck Coating", kind: "sprite", x: "100%", y: "50%" },
  { title: "Pool Deck Coating", kind: "sprite", x: "0%", y: "100%" },
  { title: "Patio Coating", kind: "sprite", x: "33.333%", y: "100%" },
  { title: "Patio Coating", kind: "sprite", x: "66.667%", y: "100%" },
];

export default function Template({ children }: TemplateProps) {
  useLayoutEffect(() => {
    const gallery = document.querySelector<HTMLElement>(".project-grid");
    if (!gallery) return;

    gallery.replaceChildren(
      ...galleryProjects.map((project, index) => {
        const figure = document.createElement("figure");
        figure.dataset.galleryPosition = String(index + 1);

        let image: HTMLElement;

        if (project.kind === "image") {
          const img = document.createElement("img");
          img.className = "gallery-photo";
          img.src = project.src;
          img.alt = `Spartan Coatings ${project.title}`;
          img.loading = index < 4 ? "eager" : "lazy";
          image = img;
        } else {
          const sprite = document.createElement("div");
          sprite.className = "gallery-sprite-photo";
          sprite.setAttribute("role", "img");
          sprite.setAttribute("aria-label", `Spartan Coatings ${project.title}`);
          sprite.style.backgroundPosition = `${project.x} ${project.y}`;
          image = sprite;
        }

        const caption = document.createElement("figcaption");
        caption.textContent = project.title;

        figure.append(image, caption);
        return figure;
      }),
    );

    gallery.classList.remove("gallery-ten");
    gallery.classList.add("gallery-eleven");

    const projectCopy = document.querySelector<HTMLElement>(
      ".projects .section-heading > p:not(.kicker)",
    );
    projectCopy?.remove();

    const projectCta = document.querySelector<HTMLElement>(
      ".projects .section-cta p",
    );
    if (projectCta) {
      projectCta.textContent =
        "Have a garage, pool deck, or patio project in mind?";
    }
  }, []);

  return (
    <>
      {children}
      <style>{`
        .project-grid.gallery-eleven {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .project-grid.gallery-eleven figure,
        .project-grid.gallery-eleven figure:nth-child(4),
        .project-grid.gallery-eleven figure:nth-child(5) {
          grid-column: auto;
          height: auto;
          min-width: 0;
          overflow: hidden;
        }

        .gallery-sprite-photo,
        .project-grid.gallery-eleven img.gallery-photo {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }

        .gallery-sprite-photo {
          background-image: url('/projects/gallery-sprite.webp');
          background-repeat: no-repeat;
          background-size: 400% 300%;
        }

        @media (max-width: 768px) {
          .project-grid.gallery-eleven {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
