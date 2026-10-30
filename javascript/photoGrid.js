
const portfolioCollections = [
  {
    title: "Urban Exploration",
    category: "01 / STREET & ARCHITECTURE",
    year: "2025",
    description: "Fragments of the city: geometry, light, passing moments and the spaces between them.",
    layout: "hero-split",
    photos: [
      { src: "./PHOTOS/PORTFOLIO/1 (1).jpg", caption: "01 — Main frame", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (2).jpg", caption: "02 — Architecture", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (3).jpg", caption: "03 — Details", position: "center" }
    ]
  },
  {
    title: "Portraits",
    category: "02 / PEOPLE",
    year: "2025",
    description: "A closer look at people, expression and the character of available light.",
    layout: "fullscreen",
    photos: [
      { src: "./PHOTOS/PORTFOLIO/1 (4).jpg", caption: "01 — Portrait", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (5).jpg", caption: "02 — Portrait detail", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (6).jpg", caption: "03 — Another perspective", position: "center" }
    ]
  },
  {
    title: "Quiet Places",
    category: "03 / PLACES & ATMOSPHERE",
    year: "2024",
    description: "Places worth slowing down for. A study of atmosphere, framing and negative space.",
    layout: "editorial",
    photos: [
      { src: "./PHOTOS/PORTFOLIO/1 (7).jpg", caption: "01 — The wider scene", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (8).jpg", caption: "02 — A closer look", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (9).jpg", caption: "03 — Small details", position: "center" }
    ]
  },
  {
    title: "Visual Studies",
    category: "04 / EXPERIMENTAL",
    year: "2024",
    description: "A final sequence of colour, texture, shape and unexpected compositions.",
    layout: "triptych",
    photos: [
      { src: "./PHOTOS/PORTFOLIO/1 (10).jpg", caption: "01 — Study one", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (11).jpg", caption: "02 — Study two", position: "center" },
      { src: "./PHOTOS/PORTFOLIO/1 (12).jpg", caption: "03 — Study three", position: "center" }
    ]
  }
];

/* ---------- DOM references ---------- */

const sceneStack = document.querySelector("#scene-stack");
const currentCollectionLabel = document.querySelector("#current-collection");
const totalCollectionsLabel = document.querySelector("#total-collections");
const progressFill = document.querySelector("#progress-fill");
const loadingLabel = document.querySelector("#stage-loading");

const viewer = document.querySelector("#photo-viewer");
const viewerImage = document.querySelector("#viewer-image");
const viewerCaption = document.querySelector("#viewer-caption");
const viewerCount = document.querySelector("#viewer-count");

let allPhotos = [];
let activeViewerIndex = 0;
let portfolioTimeline = null;
let portfolioTrigger = null;

/* ---------- Helpers ---------- */

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

/* ---------- Build the scene DOM ---------- */

function buildPortfolio() {
  sceneStack.replaceChildren();
  allPhotos = [];

  totalCollectionsLabel.textContent = padNumber(portfolioCollections.length);

  portfolioCollections.forEach((collection, collectionIndex) => {
    const scene = createElement(
      "article",
      `portfolio-scene layout-${collection.layout || "hero-split"}`
    );

    scene.dataset.collectionIndex = collectionIndex;

    const background = createElement("div", "scene-bg");
    scene.appendChild(background);

    const heading = createElement("div", "scene-heading");
    heading.appendChild(createElement("span", "scene-category", collection.category));
    heading.appendChild(createElement("h2", "scene-title", collection.title));
    heading.appendChild(createElement("p", "scene-description", collection.description));
    scene.appendChild(heading);

    scene.appendChild(createElement("span", "scene-year", collection.year));

    collection.photos.forEach((photo, photoIndex) => {
      const photoIndexInViewer = allPhotos.length;

      allPhotos.push({
        src: photo.src,
        caption: photo.caption || collection.title,
        alt: photo.alt || `${collection.title} — photograph ${photoIndex + 1}`
      });

      const figure = createElement(
        "figure",
        `portfolio-photo photo-${photoIndex}`
      );

      figure.dataset.viewerIndex = photoIndexInViewer;

      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.alt || `${collection.title} — photograph ${photoIndex + 1}`;
      image.loading = collectionIndex === 0 ? "eager" : "lazy";
      image.decoding = "async";
      image.style.objectPosition = photo.position || "center";

      image.addEventListener("error", () => {
        figure.classList.add("is-broken");
        image.style.opacity = "0";
        console.warn("Portfolio image could not be loaded:", photo.src);
      }, { once: true });

      figure.appendChild(image);

      if (photo.caption) {
        figure.appendChild(createElement("figcaption", "", photo.caption));
      }

      scene.appendChild(figure);
    });

    sceneStack.appendChild(scene);
  });

  loadingLabel.classList.add("is-hidden");
}

/* ---------- Scroll-driven animation ---------- */

function setupScrollAnimation() {
  if (!window.gsap || !window.ScrollTrigger) {
    console.error("GSAP or ScrollTrigger did not load. Check your internet connection.");
    loadingLabel.textContent = "Animation library could not load.";
    loadingLabel.classList.remove("is-hidden");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Kill an earlier instance if this function is called again.
  if (portfolioTrigger) portfolioTrigger.kill();
  if (portfolioTimeline) portfolioTimeline.kill();

  const scenes = gsap.utils.toArray(".portfolio-scene");

  if (!scenes.length) return;

  gsap.set(scenes, {
    autoAlpha: 0,
    y: 28
  });

  portfolioTimeline = gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: {
      trigger: ".portfolio-scroll",
      start: "top top",
      end: () => `+=${scenes.length * window.innerHeight * 1.65}`,
      pin: ".portfolio-stage",
      pinSpacing: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: self => {
        const index = Math.min(
          scenes.length - 1,
          Math.floor(self.progress * scenes.length)
        );

        currentCollectionLabel.textContent = padNumber(index + 1);
        progressFill.style.width = `${self.progress * 100}%`;
      }
    }
  });

  portfolioTrigger = portfolioTimeline.scrollTrigger;

  scenes.forEach((scene, index) => {
    const photos = scene.querySelectorAll(".portfolio-photo");
    const heading = scene.querySelector(".scene-heading");
    const year = scene.querySelector(".scene-year");

    // Give the scene a predictable initial state.
    portfolioTimeline.set(scene, {
      autoAlpha: 1,
      y: 0,
      onStart: () => scene.classList.add("is-active"),
      onReverseComplete: () => scene.classList.remove("is-active")
    });

    // Fade in the photographs with a slight stagger.
    portfolioTimeline.fromTo(
      photos,
      { y: 32, scale: 0.965, autoAlpha: 0 },
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.65,
        stagger: 0.10,
        ease: "power2.out"
      },
      index === 0 ? 0 : ">"
    );

    // Text follows the first part of the image reveal.
    portfolioTimeline.fromTo(
      [heading, year],
      { y: 16, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.45,
        stagger: 0.05
      },
      "<0.12"
    );

    // Hold this composition for the visitor to inspect.
    portfolioTimeline.to({}, { duration: 0.8 });

    // Transition out. The next scene begins immediately after.
    portfolioTimeline.to(
      scene,
      {
        autoAlpha: 0,
        y: -24,
        duration: 0.45,
        ease: "power1.in",
        onComplete: () => scene.classList.remove("is-active"),
        onReverseComplete: () => scene.classList.add("is-active")
      }
    );
  });

  // Initial state: first scene is active.
  if (scenes[0]) scenes[0].classList.add("is-active");

  // Refresh after images have had a chance to establish dimensions.
  window.setTimeout(() => ScrollTrigger.refresh(), 250);
}

/* ---------- Fullscreen photo viewer ---------- */

function showViewerPhoto(index) {
  if (!allPhotos.length) return;

  activeViewerIndex = (index + allPhotos.length) % allPhotos.length;
  const photo = allPhotos[activeViewerIndex];

  viewerImage.src = photo.src;
  viewerImage.alt = photo.alt;
  viewerCaption.textContent = photo.caption;
  viewerCount.textContent = `${padNumber(activeViewerIndex + 1)} / ${padNumber(allPhotos.length)}`;
}

function openViewer(index) {
  showViewerPhoto(index);
  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector(".viewer-close").focus();
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function nextViewerPhoto(direction) {
  showViewerPhoto(activeViewerIndex + direction);
}

sceneStack.addEventListener("click", event => {
  const photo = event.target.closest(".portfolio-photo");
  if (!photo || !photo.classList.contains("is-active") &&
      !photo.closest(".portfolio-scene")?.classList.contains("is-active")) {
    return;
  }
  openViewer(Number(photo.dataset.viewerIndex));
});

document.querySelector(".viewer-close").addEventListener("click", closeViewer);
document.querySelector(".viewer-prev").addEventListener("click", () => nextViewerPhoto(-1));
document.querySelector(".viewer-next").addEventListener("click", () => nextViewerPhoto(1));

viewer.addEventListener("click", event => {
  if (event.target === viewer) closeViewer();
});

document.addEventListener("keydown", event => {
  if (!viewer.classList.contains("is-open")) return;

  if (event.key === "Escape") closeViewer();
  if (event.key === "ArrowLeft") nextViewerPhoto(-1);
  if (event.key === "ArrowRight") nextViewerPhoto(1);
});

/* ---------- Start ---------- */

function initPortfolio() {
  buildPortfolio();
  setupScrollAnimation();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPortfolio, { once: true });
} else {
  initPortfolio();
}
