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

  // grp.rotation.y = firstAngle + secondAngle;
  // smoothTransition(
  // 	grp.rotation.y,
  // 	firstAngle + secondAngle,
  // 	grp,
  // 	"rotation",
  // 	"y"
  // );

  // secondGrp.rotation.z = Math.atan2(s, r);
  // setTimeout(() => {
  // smoothTransition(
  // 	secondGrp.rotation.z,
  // 	Math.atan2(s, r),
  // 	secondGrp,
  // 	"rotation",
  // 	"z"
  // );
  // }, 5000);

  // console.log(target.distanceTo(sphere.position), prismaticDis);

  // mrgCubeToWrist.position.x = prismaticJointSize(prismaticDis);
  // setTimeout(() => {
  // smoothTransition(
  // 	mrgCubeToWrist.position.x,
  // 	prismaticJointSize(prismaticDis),
  // 	mrgCubeToWrist,
  // 	"position",
  // 	"x"
  // );
  // }, 10000);

  const canvas = document.getElementById("myCanvas")!;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // animation
  function animation(time: number) {
    // mesh.rotation.x = time / 2000;
    // mesh.rotation.y = time / 1000;
    controls.update();

    renderer.render(scene, camera);
  }
};

export const prismaticJointSize = (r: number) => {
  const boundary = r - 0.065;
  if (boundary > 0.2) {
    toast.error("Object is out of reach!");
    return 0.2;
  }
  if (boundary < 0) {
    toast.error("Object is destroyed by robot!");
    return 0;
  }
  return boundary;
};

export const smoothTransition = (
  from: number,
  to: number,
  myVar: THREE.Group,
  type: "position" | "rotation",
  axis: "x" | "y" | "z"
) => {
  const threshold = 0.001;

  if (from < to && to - from > threshold) {
    setTimeout(() => {
      myVar[type][axis] += threshold;
      smoothTransition(myVar[type][axis], to, myVar, type, axis);
    }, 5);
  }
  if (from > to && from - to > threshold) {
    setTimeout(() => {
      myVar[type][axis] -= threshold;
      smoothTransition(myVar[type][axis], to, myVar, type, axis);
    }, 5);
  }
};

export default buildStanfordRobot;
