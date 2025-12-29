import gsap from "gsap";

export const RandomButton = (buttonSelector) => {
  const button = document.querySelector(buttonSelector);
  if (!button) return;

  const flipAnimation = gsap.to(button, {
    rotationX: "-=180",
    transformOrigin: "center",
    duration: 0.25,
    ease: "sine.inOut",
    paused: true,
  });

  const onClick = () => {
    flipAnimation.restart();
  };

  button.addEventListener("click", onClick);

  gsap.fromTo(
    button,
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
};
