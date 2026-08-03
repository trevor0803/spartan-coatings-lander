"use client";

import { ReactNode, useLayoutEffect } from "react";

type TemplateProps = {
  children: ReactNode;
};

const galleryProjects = [
  ["/projects/garage.webp", "Garage Floor Coating"],
  ["/projects/flake-garage.webp", "Garage Floor Coating"],
  ["/projects/garage-floor-showcase.webp", "Garage Floor Coating"],
  ["/projects/decorative-driveway.webp", "Garage Floor Coating"],
  ["/projects/stained-driveway.webp", "Garage Floor Coating"],
  ["/projects/driveway.webp", "Garage Floor Coating"],
  ["/projects/pool-deck-new.webp", "Pool Deck Coating"],
  ["/projects/pool-deck.webp", "Pool Deck Coating"],
  ["/projects/screened-patio.webp", "Patio Coating"],
  ["/projects/patio.webp", "Patio Coating"],
] as const;

export default function Template({ children }: TemplateProps) {
  useLayoutEffect(() => {
    const gallery = document.querySelector<HTMLElement>(".project-grid");
    if (!gallery) return;

    gallery.replaceChildren(
      ...galleryProjects.map(([src, title], index) => {
        const figure = document.createElement("figure");
        figure.dataset.galleryPosition = String(index + 1);

        const image = document.createElement("img");
        image.src = src;
        image.alt = `Spartan Coatings ${title}`;
        image.loading = index < 4 ? "eager" : "lazy";

        const caption = document.createElement("figcaption");
        caption.textContent = title;

        figure.append(image, caption);
        return figure;
      }),
    );

    gallery.classList.add("gallery-ten");

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
        @media (min-width: 1001px) {
          .project-grid.gallery-ten {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .project-grid.gallery-ten figure,
          .project-grid.gallery-ten figure:nth-child(4),
          .project-grid.gallery-ten figure:nth-child(5) {
            grid-column: auto;
            height: 360px;
          }
        }
      `}</style>
    </>
  );
}
