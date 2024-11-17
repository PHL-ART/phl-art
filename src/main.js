import Background from "@components/Background.js";
import "@/style.css";
import { RandomButton } from "./components/RandomButton";

const background = new Background();
const shuffleButtonSlector = ".shuffle";
RandomButton(shuffleButtonSlector);

document.querySelector(shuffleButtonSlector).addEventListener("click", () => {
  background.changePallete();
});
