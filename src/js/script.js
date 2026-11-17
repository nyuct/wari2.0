// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

// Synchronize Lenis scroll with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
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

gsap.utils.toArray(".section-animation").forEach((el) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top 50%",
      end: "bottom 75%",
      scrub: true,
      markers: false
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

