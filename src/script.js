import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * https://threejs.org/docs/#api/en/core/BufferGeometry
 * All the geomoetries are inherited from BufferGeometry
 * BoxGeometry, SphereGeometry, PlaneGeometry, TorusGeometry, ConeGeometry, CylinderGeometry, etc
 *
 */

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
//width , height , depth ,
//widthSegments - How many subdivision in x axis , heightSegments - y , depthSegments - z
//Subdivision correspond to how much triangles you have in each phase
//Segment of 1 - 2 triangles in each plane
//Segment of 2 - 8 triangles in each plane
//Segment of 3 - 18 triangles in each plane
//Segment of 4 - 24 triangles in each plane

//More traingles means more detailed object
// const geometry = new THREE.BoxGeometry(1, 1, 1, 50, 50, 50);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x0000ff, // Change color to blue (hexadecimal value)
//   wireframe: true,
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

/**
 * Creating our own Buffer Geometry
 * Before Creating the geometry, we need to understand how to store buffer gemotry data
 * going to use - Float32Array - typed array, can only store floats , fixed lengths , easier to handle for the computer
 */

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Fullscreen
 */
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
