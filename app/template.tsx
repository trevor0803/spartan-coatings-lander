"use client";

import { ReactNode, useLayoutEffect } from "react";

type TemplateProps = {
  children: ReactNode;
};

export default function Template({ children }: TemplateProps) {
  useLayoutEffect(() => {
    const gallery = document.querySelector<HTMLElement>(".project-grid");
    if (!gallery) return;

    const figures = Array.from(gallery.querySelectorAll<HTMLElement>("figure"));
    const decorativeDriveway = figures.find((figure) =>
      figure.textContent?.includes("Decorative Concrete Driveway"),
    );

    if (decorativeDriveway) {
      const image = decorativeDriveway.querySelector<HTMLImageElement>("img");
      const caption = decorativeDriveway.querySelector<HTMLElement>("figcaption");

      if (image) {
        image.src = "/projects/driveway.webp";
        image.alt = "Spartan Coatings Commercial Concrete Coating";
      }

      if (caption) caption.textContent = "Commercial Concrete Coating";
      decorativeDriveway.dataset.galleryPicture = "commercial";
    }

    const alreadyHasInterior = Array.from(
      gallery.querySelectorAll<HTMLElement>("figcaption"),
    ).some((caption) => caption.textContent === "Interior Concrete Coating");

    if (!alreadyHasInterior) {
      const interiorFigure = document.createElement("figure");
      interiorFigure.dataset.galleryPicture = "interior";

      const interiorImage = document.createElement("img");
      interiorImage.src = "/projects/flake-garage.webp";
      interiorImage.alt = "Spartan Coatings Interior Concrete Coating";

      const interiorCaption = document.createElement("figcaption");
      interiorCaption.textContent = "Interior Concrete Coating";

      interiorFigure.append(interiorImage, interiorCaption);
      gallery.appendChild(interiorFigure);
    }

    gallery.classList.add("project-grid-six");
  }, []);

  return (
    <>
      {children}
      <style>{`
        @media (min-width: 901px) {
          .project-grid.project-grid-six figure,
          .project-grid.project-grid-six figure:nth-child(4),
          .project-grid.project-grid-six figure:nth-child(5) {
            grid-column: span 2;
          }
        }
      `}</style>
    </>
  );
}
