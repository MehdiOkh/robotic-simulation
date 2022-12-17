import * as THREE from "three";

// make base cube which was placed under the robot
const baseGeo = new THREE.BoxGeometry(0.2, 0.05, 0.2);
const material = new THREE.MeshNormalMaterial();
export const baseBox = new THREE.Mesh(baseGeo, material);
