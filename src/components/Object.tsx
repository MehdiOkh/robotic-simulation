import * as THREE from "three";

// this is our wanted object which will be tracked by robot's system and our robot will try to reach for it
const sphereGeo = new THREE.SphereGeometry(0.02);
const material = new THREE.MeshNormalMaterial();
const sphere = new THREE.Mesh(sphereGeo, material);

sphere.position.set(0.13, 0.03, 0.13);

export { sphere };
