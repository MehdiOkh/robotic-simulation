import * as THREE from "three";
import { secondGrp } from "./PrismaticJoint";

// create our revolute joint
const jointGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 32);
const material = new THREE.MeshNormalMaterial();
const joint = new THREE.Mesh(jointGeo, material);

// create our stem which attached to our revolute joint
const stemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 32);
const stem = new THREE.Mesh(stemGeo, material);

// create a box for second revolute joint
const cubeGeo = new THREE.BoxGeometry(0.1, 0.08, 0.08);
const cube = new THREE.Mesh(cubeGeo, material);

const secondJointGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.15, 32);
const secondJoint = new THREE.Mesh(secondJointGeo, material);
const axesHelper = new THREE.AxesHelper(0.5);

// group our created joints together
const grp = new THREE.Group();
cube.add(axesHelper);

cube.translateY(0.2);
grp.add(cube);

joint.translateY(0.03);
grp.add(joint);

stem.translateY(0.08);
grp.add(stem);

secondJoint
  .rotateX(Math.PI / 2)
  .rotateY(Math.PI / 2)
  .translateX(0.2);
grp.add(secondJoint);
grp.add(secondGrp);

export default grp;
