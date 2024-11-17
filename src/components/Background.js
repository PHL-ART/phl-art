import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import {
  FilmPass,
} from "three/examples/jsm/postprocessing/FilmPass.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import fragment from "@shaders/fragment.glsl";
import vertex from "@shaders/vertex.glsl";
import {
  handleCameraRotation,
  handleMouseMovement,
} from "@helpers/CameraRotation.js";
import CameraOrientationState from "@helpers/CameraState.js";
import { PalleteController } from "@helpers/PalleteController";

export default class Background {
  constructor() {
    // Scene adding
    this.scene = new THREE.Scene();

    // Container
    this.container = document.getElementById("background");
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;

    // Renderer
    // antialias?
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xeeeeee, 1);

    this.container.appendChild(this.renderer.domElement);

    // Camera & Controls

    this.camera = new THREE.PerspectiveCamera(
      70,
      this.width / this.height,
      0.01,
      1000
    );
    this.camera.zoom = 1.5;
    this.camera.position.x = 0.01;
    this.camera.position.y = 0.075;
    this.camera.position.z = 0.2;
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.camera.rotateX(-0.4);
    // this.camera.rotateZ(0);

    this.cameraOrientationState = new CameraOrientationState();

    this.mouse = new THREE.Vector2();

    this.time = 0;

    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath(
      "https://www.gstatic.com/draco/v1/decoders/"
    );

    this.gltf = new GLTFLoader();
    this.gltf.setDRACOLoader(this.dracoLoader);

    this.composer = new EffectComposer(this.renderer);
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);
    const filmPass = new FilmPass(0.15, 0, 0, 0);
    this.composer.addPass(filmPass);

    this.pallete = PalleteController();

    this.isPlaying = true;

    this.addObject();
    this.resize();
    this.render();
    this.setupResize();
    this.setupMouseMove();
  }

  setupResize() {
    window.addEventListener("resize", this.resize.bind(this));
  }

  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = (event.clientY / window.innerHeight) * 2 - 1;

    handleMouseMovement(
      this.mouse.x,
      this.mouse.y,
      this.cameraOrientationState
    );
  }

  setupMouseMove() {
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  resize() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.aspect = this.width / this.height;

    this.imageAspect = 853 / 1280;

    let a1;
    let a2;

    if (this.height / this.width > this.imageAspect) {
      a1 = (this.width / this.height) * this.imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (this.width / this.height) * this.imageAspect;
    }

    this.material.uniforms.resolution.value.x = this.width;
    this.material.uniforms.resolution.value.y = this.height;
    this.material.uniforms.resolution.value.z = a1;
    this.material.uniforms.resolution.value.w = a2;

    this.camera.updateProjectionMatrix();
  }

  addObject() {
    this.material = new THREE.ShaderMaterial({
      extensions: {
        derivatives: "#extension GL_OES_standard_derivatives : enable",
      },
      side: THREE.DoubleSide,
      uniforms: {
        time: { value: 0 },
        resolution: { value: new THREE.Vector4() },
        uColor: { value: this.pallete },
      },
      fragmentShader: fragment,
      vertexShader: vertex,
      // wireframe: true
    });

    this.geometry = new THREE.PlaneGeometry(2, 2, 150, 150);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.rotateX(0.3);
    this.scene.add(this.mesh);
  }

  // addText() {
  //   this.material = new THREE.ShaderMaterial({
  //     extensions: {
  //       derivatives: "#extension GL_OES_standard_derivatives : enable",
  //     },
  //     side: THREE.DoubleSide,
  //     uniforms: {
  //       time: { value: 0 },
  //       resolution: { value: new THREE.Vector4() },
  //       uColor: { value: pallete },
  //     },
  //     fragmentShader: fragment,
  //     vertexShader: vertex,
  //     // wireframe: true
  //   });

  //   this.geometry = new THREE.PlaneGeometry(1, 1, 100, 100);
  //   this.mesh = new THREE.Mesh(this.geometry, this.material);
  //   this.scene.add(this.mesh);
  // }

  changePallete() {
    this.pallete = PalleteController();
    console.log(this.pallete);
    this.material.uniforms.uColor.value = this.pallete;
    this.render();
  }

  addLight() {
    const light1 = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(light1);

    const light2 = new THREE.AmbientLight(0xffffff, 0.75);
    light2.position.set(0.5, 0, 0, 0.466);
    this.scene.add(light2);
  }

  stop() {
    this.isPlaying = false;
  }

  play() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      this.render();
    }
  }

  render() {
    if (!this.isPlaying) return;
    this.time += 0.0001;
    this.material.uniforms.time.value = this.time;
    requestAnimationFrame(this.render.bind(this));
    handleCameraRotation(this.camera, this.cameraOrientationState);
    // this.renderer.render(this.scene, this.camera);
    this.composer.render();
  }
}
