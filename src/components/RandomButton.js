import gsap from "gsap";

export const RandomButton = (buttonSelector) => {
  document
    .querySelector(buttonSelector)
    .addEventListener("click", () => onClick());
  document
    .querySelector(buttonSelector)
    .addEventListener("mouseleave", hoverOff);

  gsap.fromTo(
    buttonSelector,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      ease: "sine.inOut",
      repeat: 0,
      duration: 0.25,
      delay: 1.5,
    }
  );

  function onClick() {
    console.log(1);
    gsap
      .to(buttonSelector, {
        rotationX: "-=180",
        transformOrigin: "center",
        duration: 0.25,
        ease: "sine.inOut",
        paused: true,
      })
      .play();
    console.log(2);

    // gsap.to("#arrowTop", {
    //   rotateX: 180,
    //   duration: "0.2",
    //   ease: "sine.inOut",
    //   repeat: 0,
    // });
    // gsap.to("arrowBottom", {
    //   rotateX: 180,
    //   duration: "0.2",
    //   ease: "sine.inOut",
    //   repeat: 0,
    // });
  }

  function hoverOff() {}
};
