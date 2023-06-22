import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";

const scene = new THREE.Scene();

scene.background = "#ffffff";

const earthTexture = new THREE.TextureLoader().load("/earth.jpg");
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
  roughness: 0.5,
});
const geometry = new THREE.SphereGeometry(3, 64, 64);

const earth = new THREE.Mesh(geometry, earthMaterial);
scene.add(earth);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 0.9;
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.z = 20;

scene.add(camera);

const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setPixelRatio(2);
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};
loop();

const timeLine1 = gsap.timeline({ defaults: { duration: 3 } });
const timeLine2 = gsap.timeline({ defaults: { duration: 3 } });
timeLine1.fromTo(earth.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
timeLine2.fromTo("nav", { y: "-100%" }, { y: "0%" });
timeLine2.fromTo(".title", { opacity: 0 }, { opacity: 1 });
