import React, { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import * as geom from "three/examples/jsm/utils/BufferGeometryUtils";
import { AxesHelper } from "three";

function App() {
	useEffect(() => {
		// init
		const camera = new THREE.PerspectiveCamera(
			70,
			window.innerWidth / window.innerHeight,
			0.01,
			10
		);
		camera.position.z = 1;

		const scene = new THREE.Scene();

		// cube
		const geometry = new THREE.BoxGeometry(0.2, 0.05, 0.2);
		const material = new THREE.MeshNormalMaterial();
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		// cylinder
		const cylinderGeometry = new THREE.CylinderGeometry(
			0.07,
			0.07,
			0.02,
			32
		);
		const cylinderMaterial = new THREE.MeshNormalMaterial();
		const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
		// cylinder.translateY(-10);
		// scene.add(cylinder);

		const cylinderGeometry2 = new THREE.CylinderGeometry(
			0.03,
			0.03,
			0.2,
			32
		);
		const cylinderMaterial2 = new THREE.MeshNormalMaterial();
		const cylinder2 = new THREE.Mesh(cylinderGeometry2, cylinderMaterial2);
		// cylinder2.rotateX(-Math.PI / 2);
		// cylinder2.translateZ(0.1);

		const cubeGeo = new THREE.BoxGeometry(0.1, 0.08, 0.08);
		const cube = new THREE.Mesh(cubeGeo, cylinderMaterial2);

		const cylinderGeometry3 = new THREE.CylinderGeometry(
			0.03,
			0.03,
			0.15,
			32
		);
		const cylinder3 = new THREE.Mesh(cylinderGeometry3, cylinderMaterial2);

		const axesHelper = new THREE.AxesHelper(0.5);
		const axesHelper1 = new THREE.AxesHelper(0.5);
		const axesHelper2 = new THREE.AxesHelper(0.5);

		const cubeGeo1 = new THREE.BoxGeometry(0.15, 0.08, 0.08);
		const cube1 = new THREE.Mesh(cubeGeo1, cylinderMaterial2);
		const cubeGeo2 = new THREE.BoxGeometry(0.4, 0.04, 0.04);
		const cube2 = new THREE.Mesh(cubeGeo2, cylinderMaterial2);

		const grp = new THREE.Group();
		cube.translateY(0.2);
		// cube.add(axesHelper1);
		grp.add(cube);
		cylinder.translateY(0.03);
		// cylinder.add(axesHelper);
		grp.add(cylinder);

		cylinder2.translateY(0.08);
		// cylinder2.add(axesHelper);
		grp.add(cylinder2);

		cylinder3
			.rotateX(Math.PI / 2)
			.rotateY(Math.PI / 2)
			.translateX(0.2);
		// .add(axesHelper2);

		grp.add(cylinder3);

		const grp1 = new THREE.Group();
		// grp1.add(cylinder3);
		// cube1.translateY(0.2).translateZ(0.1);
		// cube2.translateY(0.2).translateZ(0.1);

		// wrist
		const wristGeo1 = new THREE.CylinderGeometry(0.015, 0.015, 0.025, 32);
		const wrist1 = new THREE.Mesh(wristGeo1, cylinderMaterial2);
		wrist1.translateX(-0.02);
		wrist1.rotateZ(Math.PI / 2);

		const grp2 = new THREE.Group();
		const grp3 = new THREE.Group();
		const grp4 = new THREE.Group();
		const mrgCubeToWrist = new THREE.Group();

		const wristGeo2 = new THREE.CylinderGeometry(0.015, 0.015, 0.05, 32);
		const wrist2 = new THREE.Mesh(wristGeo2, cylinderMaterial2);
		// wrist2.translateX(0.022);
		wrist2.rotateX(Math.PI / 2);

		const wristGeo3 = new THREE.CylinderGeometry(0.015, 0.015, 0.025, 32);
		const wrist3 = new THREE.Mesh(wristGeo3, cylinderMaterial2);
		wrist3.translateX(0.02);
		wrist3.rotateZ(Math.PI / 2);
		const diskGeo1 = new THREE.BoxGeometry(0.01, 0.05, 0.05);
		const disk1 = new THREE.Mesh(diskGeo1, cylinderMaterial2);
		disk1.translateX(0.04);
		grp4.add(wrist3);
		grp4.add(disk1);
		grp3.add(wrist2);
		grp3.add(grp4);
		grp2.add(wrist1);
		grp2.add(grp3);

		grp2.position.set(0.23, 0, 0);
		mrgCubeToWrist.add(grp2);
		mrgCubeToWrist.add(cube2);
		// scene.add(grp2);

		grp1.add(cube1);
		grp1.add(mrgCubeToWrist);
		// grp1.add(grp2);
		grp1.position.set(0, 0.2, 0.1);
		grp.add(grp1);

		scene.add(grp);

		// const geo = geom.mergeBufferGeometries([
		// cube.geometry.clone().translate(0, 0.2, 0),
		// 	cylinder.geometry.clone().translate(0, 0.03, 0),
		// 	cylinder2.geometry.clone().translate(0, 0.08, 0),
		// 	cylinder3.geometry
		// 		.clone()
		// 		.rotateX(Math.PI / 2)
		// 		.rotateY(Math.PI / 2)
		// 		.translate(0, 0.2, 0),
		// ]);
		// geo.computeBoundingBox();
		// const combinedMesh = new THREE.Mesh(geo, cylinderMaterial2);
		// cylinder2.rotateX(-Math.PI / 2);
		// cylinder2.translateZ(0.1);
		// combinedMesh.add(axesHelper);
		// scene.add(cylinder2);

		const canvas = document.getElementById("myCanvas")!;
		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setAnimationLoop(animation);
		document.body.appendChild(renderer.domElement);

		// orbit control
		const controls = new OrbitControls(camera, renderer.domElement);
		const gui = new GUI();
		const cubeFolder = gui.addFolder("Cube");
		// cubeFolder.add(mesh.rotation, "x", 0, Math.PI * 2);
		// cubeFolder.add(mesh.rotation, "y", 0, Math.PI * 2);
		// cubeFolder.add(mesh.rotation, "z", 0, Math.PI * 2);
		// cubeFolder.add(mesh.scale, "z", 1, 10);
		cubeFolder.add(grp.rotation, "y", -2.5, 2.5);
		cubeFolder.add(grp1.rotation, "z", -0.8, 4);
		cubeFolder.add(mrgCubeToWrist.position, "x", -0.1, 0.1);
		cubeFolder.add(grp2.rotation, "x", -1, 1);
		// cubeFolder.add(grp2.rotation, "z", -1, 1);
		cubeFolder.add(grp3.rotation, "z", -1, 1);
		cubeFolder.add(grp4.rotation, "x", -1, 1);
		cubeFolder.open();

		// animation
		function animation(time: number) {
			// mesh.rotation.x = time / 2000;
			// mesh.rotation.y = time / 1000;
			controls.update();

			renderer.render(scene, camera);
		}
	}, []);
	return (
		<div className="App">
			<canvas id="myCanvas"></canvas>
		</div>
	);
}

export default App;
