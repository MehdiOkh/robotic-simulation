import * as THREE from "three";
import { thirdGrp } from "./Wrist";

// create our prismatic joint
const cubeGeo1 = new THREE.BoxGeometry(0.15, 0.08, 0.08);
const material = new THREE.MeshNormalMaterial();
const cube1 = new THREE.Mesh(cubeGeo1, material);
const cubeGeo2 = new THREE.BoxGeometry(0.4, 0.04, 0.04);
const cube2 = new THREE.Mesh(cubeGeo2, material);

const grp = new THREE.Group();
const mrgCubeToWrist = new THREE.Group();
mrgCubeToWrist.add(thirdGrp);
mrgCubeToWrist.add(cube2);

// this is prismatic joint's movement boundary along x axis
// mrgCubeToWrist.position.set(0.1, 0, 0);
mrgCubeToWrist.position.set(-0.1, 0, 0);

grp.add(cube1);
grp.add(mrgCubeToWrist);
// grp1.add(grp2);
grp.position.set(0, 0.2, 0.1);

export { grp as secondGrp, mrgCubeToWrist };
