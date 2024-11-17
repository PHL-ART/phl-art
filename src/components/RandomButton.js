import gsap from "gsap";

export const RandomButton = (buttonSelector) => {
  document.querySelector(buttonSelector).addEventListener("mouseover", hoverOn);
  document
    .querySelector(buttonSelector)
    .addEventListener("mouseleave", hoverOff);

  const tween = gsap.to("buttonSelector", {
    duration: 2,
    rotationX: 360,
    ease: "sine.inOut",
    repeat: -1,
    paused: true
  });

  function hoverOn() {
    tween.play();
  }

  function hoverOff() {
    tween.resetTo('')
  }
};
