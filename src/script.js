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
 * going to use - Float32Array
 *  - type is array, can only store floats value , fixed lengths , easier to handle for the computer
 *
 * There are two ways of creating and filling a value of Float32Array
 * 1. Specify a length and then fill the array
 * 2. Directly put the array
 * Float32Array([
 *   0,0,0
 *   0,1,0,
 *   1,0,0
 * ]);
 */

// //We are creating a triangle
// const positionsArray = new Float32Array(9);
// //First Vertex
// positionsArray[0] = 0; //x
// positionsArray[1] = 0; //y
// positionsArray[2] = 0; //z

// //Second Vertex
// positionsArray[3] = 0; //x
// positionsArray[4] = 1; //y
// positionsArray[5] = 0; //z

// //Third Vertex
// positionsArray[6] = 1; //x
// positionsArray[7] = 0; //y
// positionsArray[8] = 0; //z

// //We can now convert Float32Array to BufferAttribute

// //3 is the number of components per vertex
// const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);

// const geometry = new THREE.BufferGeometry();

// //We can add this BufferAttribute to our BufferGeometry
// geometry.setAttribute("position", positionsAttribute);

// //Note : Position is the name that will be used in the shaders as an attribute
// //Three JS has built-in shaders when we are showing the triangle on viewport
// //it's three js who is handling this(GPU, Three JS, Shaders)
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });

// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

const geometry = new THREE.BufferGeometry();
const count = 10; // number of triangles we want
const positionsArray = new Float32Array(count * 9);
for (let i = 0; i < count * 9; i++) {
  positionsArray[i] = Math.random() * 5;
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry.setAttribute("position", positionsAttribute);

const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
