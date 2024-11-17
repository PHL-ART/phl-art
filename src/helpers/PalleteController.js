import * as THREE from "three";
import { PALLETES } from "@constants/palletes.js";

export const PalleteController = () => {
  const palleteKeys = Object.keys(PALLETES);
  const randomInt = Math.floor(
    Math.random() * (Math.floor(palleteKeys.length))
  );

  const resultPallete = PALLETES[palleteKeys[randomInt]].map((color) => new THREE.Color(color));

  return resultPallete;
};