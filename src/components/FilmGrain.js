import grainShader from '../shaders/grain.glsl';

export default class GrainShader {
  constructor(THREE) {
    this.grainShader = new THREE.ShaderMaterial({
      fragmentShader: grainShader,
      transparent: true, //<---------- Toggling this does Weird. PLAY WITH THIS disable/enable etc.
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending, //<---------- Blend mode PLAY WITH THIS disable/enable etc.
      uniforms: {
        iTime: { value: 0 },
      },
    });
    this.update = () => {
      this.grainShader.uniforms.iTime.value = performance.now() / 1000; //<---------- Time scale PLAY WITH THIS
    };
  }
}

export function makeItGrain(THREE, camera, bsz = 2.5) {
  let gs = new GrainShader(THREE);
  //gs.grainShader.depthFunc = THREE.GreaterEqualDepth;
  gs.grainShader.depthTest = false;
  gs.grainShader.side = THREE.DoubleSide; //BackSide;
  let m = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), gs.grainShader);
  m.position.z = camera.near * -1.001;
  //m.rotation.x=Math.PI*.5
  m.onBeforeRender = function () {
    gs.grainShader.uniforms.iTime.value = performance.now() * 0.001;
  };
  camera.add(m);
}
