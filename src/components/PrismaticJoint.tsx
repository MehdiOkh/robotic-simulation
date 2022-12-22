import * as THREE from "three";
import { thirdGrp } from "./Wrist";

// create our prismatic joint
const cubeGeo1 = new THREE.BoxGeometry(0.15, 0.08, 0.08);
const material = new THREE.MeshNormalMaterial();
const cube1 = new THREE.Mesh(cubeGeo1, material);
const cubeGeo2 = new THREE.BoxGeometry(0.4, 0.04, 0.04);
const cube2 = new THREE.Mesh(cubeGeo2, material);

// group our created joints together
const grp = new THREE.Group();
const mrgCubeToWrist = new THREE.Group();
mrgCubeToWrist.add(thirdGrp);
mrgCubeToWrist.add(cube2);

mrgCubeToWrist.position.set(-0.1, 0, 0);

grp.add(cube1);
// const axesHelper = new THREE.AxesHelper(0.5);
// mrgCubeToWrist.add(axesHelper);
grp.add(mrgCubeToWrist);
grp.position.set(0, 0.2, 0.1);

export { grp as secondGrp, mrgCubeToWrist };
