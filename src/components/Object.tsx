import * as THREE from "three";

const sphereGeo = new THREE.SphereGeometry(0.02);
const material = new THREE.MeshNormalMaterial();
const sphere = new THREE.Mesh(sphereGeo, material);

sphere.position.set(0.13, 0.03, 0.13);

export { sphere };
