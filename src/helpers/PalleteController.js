import * as THREE from "three";
import { PALLETES } from "../palletes";

export const PalleteController = () => {
    const palleteKeys = Object.keys(PALLETES);
    const randomInt = Math.floor(Math.random() * (Math.floor(palleteKeys.length) + 1));

    const resultPallete = PALLETES[palleteKeys[randomInt]];
    console.log(resultPallete);

    return resultPallete;
}

let pallete = PALLETES.DEFAULT.map((color) => new THREE.Color(color));
