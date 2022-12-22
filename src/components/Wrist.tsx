import * as THREE from "three";

// our wrist's first revolute joint
const wristGeo1 = new THREE.CylinderGeometry(0.015, 0.015, 0.025, 32);
const material = new THREE.MeshNormalMaterial();

const wrist1 = new THREE.Mesh(wristGeo1, material);
wrist1.translateX(-0.02);
wrist1.rotateZ(Math.PI / 2);

// our wrist's second revolute joint
const wristGeo2 = new THREE.CylinderGeometry(0.015, 0.015, 0.05, 32);
const wrist2 = new THREE.Mesh(wristGeo2, material);

// our wrist's first revolute joint
const wristGeo3 = new THREE.CylinderGeometry(0.015, 0.015, 0.025, 32);
const wrist3 = new THREE.Mesh(wristGeo3, material);

// our wrist's gripper
const diskGeo1 = new THREE.BoxGeometry(0.01, 0.05, 0.05);
const disk1 = new THREE.Mesh(diskGeo1, material);
// const axesHelper = new THREE.AxesHelper(0.5);
// grp2.add(axesHelper);

wrist2.rotateX(Math.PI / 2);
wrist3.translateX(0.02);
wrist3.rotateZ(Math.PI / 2);
disk1.translateX(0.04);

// group our joints and our gripper together
const grp4 = new THREE.Group();
grp4.add(wrist3);
grp4.add(disk1);

const grp2 = new THREE.Group();
const grp3 = new THREE.Group();
grp3.add(wrist2);
grp3.add(grp4);
grp2.add(wrist1);
grp2.add(grp3);
grp2.position.set(0.23, 0, 0);

export { grp2 as thirdGrp };
