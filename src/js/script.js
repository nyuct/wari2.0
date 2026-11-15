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
