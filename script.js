const rotatingWord = document.getElementById("rotating-word");
const currentYear = document.getElementById("current-year");
const scrollProgress = document.getElementById("scroll-progress");
const revealItems = document.querySelectorAll(".reveal");
const heroVisual = document.querySelector(".hero-stage");

const rotatingWords = ["Voice", "Reading", "Thought", "Growth"];

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (rotatingWord) {
  let wordIndex = 0;

  window.setInterval(() => {
    wordIndex = (wordIndex + 1) % rotatingWords.length;
    rotatingWord.animate(
      [
        { opacity: 1, transform: "translateY(0)" },
        { opacity: 0, transform: "translateY(-8px)" },
        { opacity: 0, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      {
        duration: 550,
        easing: "ease"
      }
    );
    rotatingWord.textContent = rotatingWords[wordIndex];
  }, 2200);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -24px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.addEventListener(
  "scroll",
  () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${progress}%`;
    }
  },
  { passive: true }
);

if (heroVisual && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.setProperty("--tilt-x", `${x * 10}deg`);
    heroVisual.style.setProperty("--tilt-y", `${y * -10}deg`);
    heroVisual.style.transform = `perspective(1100px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  });
}
