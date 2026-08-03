"use client";

import { ReactNode, useLayoutEffect } from "react";

type TemplateProps = {
  children: ReactNode;
};

type GalleryProject = {
  title: "Garage Floor Coating" | "Pool Deck Coating" | "Patio Coating";
  x: "0%" | "33.333%" | "66.667%" | "100%";
  y: "0%" | "50%" | "100%";
};

const galleryProjects: GalleryProject[] = [
  { title: "Garage Floor Coating", x: "0%", y: "0%" },
  { title: "Garage Floor Coating", x: "33.333%", y: "0%" },
  { title: "Garage Floor Coating", x: "66.667%", y: "0%" },
  { title: "Garage Floor Coating", x: "100%", y: "0%" },
  { title: "Garage Floor Coating", x: "0%", y: "50%" },
  { title: "Garage Floor Coating", x: "33.333%", y: "50%" },
  { title: "Garage Floor Coating", x: "66.667%", y: "50%" },
  { title: "Pool Deck Coating", x: "100%", y: "50%" },
  { title: "Pool Deck Coating", x: "0%", y: "100%" },
  { title: "Patio Coating", x: "33.333%", y: "100%" },
  { title: "Patio Coating", x: "66.667%", y: "100%" },
];

export default function Template({ children }: TemplateProps) {
  useLayoutEffect(() => {
    const gallery = document.querySelector<HTMLElement>(".project-grid");
    if (!gallery) return;

    gallery.replaceChildren(
      ...galleryProjects.map(({ title, x, y }, index) => {
        const figure = document.createElement("figure");
        figure.dataset.galleryPosition = String(index + 1);

        const image = document.createElement("div");
        image.className = "gallery-sprite-photo";
        image.setAttribute("role", "img");
        image.setAttribute("aria-label", `Spartan Coatings ${title}`);
        image.style.backgroundPosition = `${x} ${y}`;

        const caption = document.createElement("figcaption");
        caption.textContent = title;

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
        .project-grid.gallery-eleven figure,
        .project-grid.gallery-eleven figure:nth-child(4),
        .project-grid.gallery-eleven figure:nth-child(5) {
          grid-column: auto;
          height: auto;
          overflow: hidden;
        }

        .gallery-sprite-photo {
          width: 100%;
          aspect-ratio: 16 / 9;
          background-image: url('/projects/gallery-sprite.webp');
          background-repeat: no-repeat;
          background-size: 400% 300%;
        }

        @media (min-width: 1001px) {
          .project-grid.gallery-eleven {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </>
  );
}
