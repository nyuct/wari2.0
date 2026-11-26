// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Synchronize Lenis scroll with GSAP ScrollTrigger
lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

document.addEventListener("DOMContentLoaded", () => {
  console.log("Wari 2.0 initialized with Gulp & Partials!");
});
gsap.utils.toArray(".fadeUp").forEach(el => {
  gsap.fromTo(
    el,
    {
      opacity: 0,
      y: 150,
    },
    {
      opacity: 1,
      y: 0,
      duration: 2,
      delay: 0,
      ease: "power3.out",
      clearProps: "opacity,transform",

      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
        markers: false,
      },
    },
  );
});

// Text animation for all <p> elements using SplitText
gsap.utils.toArray(".text-animation").forEach(p => {
  // Check if element has text content to animate
  if (!p.textContent.trim()) return;

  const split = new SplitText(p, { type: "lines,words,chars" });

  gsap.from(split.words, {
    opacity: 0,
    y: 20,
    duration: 0.8,
    stagger: 0.05,
    ease: "power2.out",
    scrollTrigger: {
      trigger: p,
      start: "top 100%",
      end: "top 85%",
      toggleActions: "play none none reverse",
      markers: false,
    },
  });
});

gsap.utils.toArray(".section-animation").forEach(el => {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 60%",
        end: "bottom 75%",
        scrub: true,
        markers: false,
      },
    })
    .fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })
    .to(el, { opacity: 1, duration: 2, ease: "none" })
    .to(el, { opacity: 0, duration: 1, ease: "power2.in" });
});
const audio = document.getElementById("bgAudio");

function playBgAudio() {
  audio.muted = false;
  audio.play().catch(() => {
    console.log("Autoplay blocked, waiting for interaction");

    const enableSound = () => {
      audio.play();
      document.removeEventListener("click", enableSound);
      document.removeEventListener("scroll", enableSound);
    };

    document.addEventListener("click", enableSound);
    document.addEventListener("scroll", enableSound);
  });
}

ScrollTrigger.create({
  trigger: ".pundalikTxt",
  start: "top 70%", // play when the text sits in the center of the screen

  onEnter: playBgAudio,
  onEnterBack: playBgAudio, // also play when scrolling up into center (reverse)
});



// Moon Effect
// visibility code
const moonContainer = document.querySelector(".moon-container");

let moonTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".map-box",
    start: "top top",
    end: "bottom bottom",
    markers: true,
    scrub: true,
  },
});
// moonTimeline.fromTo("body", { "--overlay-opacity": 0 } , {"--overlay-opacity" : 0},"a");
moonTimeline.to(moonContainer, { opacity: 1000 }, "a");
moonTimeline.fromTo("body", { "--overlay-opacity": 0.5 } , {"--overlay-opacity" : -0.5}, "a");
moonTimeline.fromTo("body", { "--overlay-opacity": -0.5 } , {"--overlay-opacity" : 0.5}, "b");
// moonTimeline.fromTo("body", { "--overlay-opacity": 0 } , {"--overlay-opacity" : 0.5}, "c");

const moon = document.querySelector(".moon");
const mask = document.querySelector(".mask");

ScrollTrigger.create({
  trigger: ".map-box",
  start: "top center",
  end: "bottom center",
  scrub: true,

  onUpdate: self => {
    const progress = self.progress; // 0 → 1 ONLY inside pathway

    if (progress <= 0.5) {
      // 🌘 Waning → 🌑
      const p = progress * 2;

      mask.style.right = "-5%";
      mask.style.left = "auto";

      mask.style.transform = `translateX(${p * 120}%)`;

      // moon.style.filter = `brightness(${1 + p})`;
    } else {
      // 🌑 → 🌒 Waxing
      const p = (progress - 0.5) * 2;

      mask.style.left = "-5%";
      mask.style.right = "auto";

      mask.style.transform = `translateX(${(1 - p) * -120}%)`;

      // moon.style.filter = `brightness(${p})`;
    }
  },
});
