import { toast } from "react-toastify";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { baseBox } from "./Base";
import grp from "./FirstAndSecRevJoint";
import { sphere } from "./Object";

const buildStanfordRobot = () => {
  // create gridHelper for our model
  const gridHelper = new THREE.GridHelper(1, 10);

  // create camera
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  // set position of camera
  camera.position.z = 1;

  // create the scene
  const scene = new THREE.Scene();

  // add our created gridHelper to our scene
  scene.add(gridHelper);
  // add our first group and base box to our scene
  scene.add(grp);
  scene.add(baseBox);

  // this is our desired object which we are trying to grasp it
  scene.add(sphere);

  const canvas = document.getElementById("myCanvas")!;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // animation
  function animation() {
    controls.update();

    renderer.render(scene, camera);
  }
};

// calculate our prismatic joint's opening length
export const prismaticJointSize = (r: number) => {
  // our distance to object minus our wrist length
  const boundary = r - 0.065;
  // check if our object is out of reach or not
  if (boundary > 0.2) {
    toast.error("Object is out of reach!");
    return 0.2;
  }
  // check if our robot collapses with object or not
  if (boundary < 0) {
    toast.error("Object is destroyed by robot!");
    return 0;
  }
  return boundary;
};

// a recursive function to implement smooth transition for our robot's movements
export const smoothTransition = (
  from: number,
  to: number,
  myVar: THREE.Group,
  type: "position" | "rotation",
  axis: "x" | "y" | "z",
  speed: number
) => {
  const threshold = speed;

  if (from < to && to - from > threshold) {
    setTimeout(() => {
      myVar[type][axis] += threshold;
      smoothTransition(myVar[type][axis], to, myVar, type, axis, speed);
    }, 5);
  }
  if (from > to && from - to > threshold) {
    setTimeout(() => {
      myVar[type][axis] -= threshold;
      smoothTransition(myVar[type][axis], to, myVar, type, axis, speed);
    }, 5);
  }
};

export default buildStanfordRobot;
