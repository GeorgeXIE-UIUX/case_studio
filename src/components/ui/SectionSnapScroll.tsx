import { useEffect } from "react";

const ANIMATION_LOCK_MS = 900;

const isInteractiveElement = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.closest(
      "input, textarea, select, button, [contenteditable='true'], [data-snap-ignore='true']"
    ) !== null
  );
};

const getSections = () =>
  Array.from(document.querySelectorAll("main section")) as HTMLElement[];

const getSectionTop = (section: HTMLElement) =>
  section.getBoundingClientRect().top + window.scrollY;

const getSectionBottom = (section: HTMLElement) =>
  getSectionTop(section) + section.offsetHeight;

export const SectionSnapScroll = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (prefersReducedMotion || !isFinePointer) return;

    let isLocked = false;

    const unlock = () => {
      isLocked = false;
    };

    const onWheel = (event: WheelEvent) => {
      if (isLocked) return;
      if (isInteractiveElement(event.target)) return;
      if (Math.abs(event.deltaY) < 6) return;

      const sections = getSections();
      if (sections.length === 0) return;

      const viewportTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportBottom = viewportTop + viewportHeight;

      const footer = document.querySelector("footer") as HTMLElement | null;
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top + window.scrollY;
        if (viewportBottom >= footerTop - 12) {
          return;
        }
      }

      const direction = event.deltaY > 0 ? 1 : -1;
      const currentIndex = sections.findIndex((section) => {
        const top = getSectionTop(section);
        const bottom = getSectionBottom(section);
        return viewportTop >= top - 4 && viewportTop < bottom - 4;
      });

      const currentSection = currentIndex >= 0 ? sections[currentIndex] : null;
      if (currentSection) {
        const sectionTop = getSectionTop(currentSection);
        const sectionBottom = getSectionBottom(currentSection);
        const isTallSection = currentSection.offsetHeight > viewportHeight + 16;

        if (isTallSection) {
          if (direction > 0 && viewportBottom < sectionBottom - 12) return;
          if (direction < 0 && viewportTop > sectionTop + 12) return;
        }
      }

      const targetIndex =
        currentIndex === -1
          ? direction > 0
            ? 0
            : sections.length - 1
          : Math.min(
              Math.max(currentIndex + direction, 0),
              sections.length - 1
            );

      const target = sections[targetIndex];
      if (!target) return;

      event.preventDefault();
      isLocked = true;

      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth"
      });

      window.setTimeout(unlock, ANIMATION_LOCK_MS);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel as EventListener);
    };
  }, []);

  return null;
};
