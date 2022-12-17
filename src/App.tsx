import React, { useEffect } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import * as geom from "three/examples/jsm/utils/BufferGeometryUtils";
import { AxesHelper } from "three";
import buildStanfordRobot from "./components/Stanford";

function App() {
	useEffect(() => {
		// const axesHelper = new THREE.AxesHelper(0.5);
		// const axesHelper1 = new THREE.AxesHelper(0.5);
		// const axesHelper2 = new THREE.AxesHelper(0.5);

		// init

		// cylinder2.rotateX(-Math.PI / 2);
		// cylinder2.translateZ(0.1);

		// cube.add(axesHelper);

		// cube1.add(axesHelper1);

		// const grp1 = new THREE.Group();
		// grp1.add(cylinder3);
		// cube1.translateY(0.2).translateZ(0.1);
		// cube2.translateY(0.2).translateZ(0.1);

		// wrist

		// wrist2.translateX(0.022);

		// mrgCubeToWrist.add(axesHelper2);

		// scene.add(grp2);

		// grp1.updateMatrixWorld();
		// cube1.updateMatrixWorld();

		// scene.add(grp);

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

		// const gui = new GUI();
		// gui.close();
		// const cubeFolder = gui.addFolder("Cube");
		// // cubeFolder.add(mesh.rotation, "x", 0, Math.PI * 2);
		// // cubeFolder.add(mesh.rotation, "y", 0, Math.PI * 2);
		// // cubeFolder.add(mesh.rotation, "z", 0, Math.PI * 2);
		// // cubeFolder.add(mesh.scale, "z", 1, 10);
		// cubeFolder.add(grp.rotation, "y", -2.5, 2.5);
		// cubeFolder.add(grp1.rotation, "z", -0.8, 4);
		// cubeFolder.add(mrgCubeToWrist.position, "x", -0.1, 0.1);
		// cubeFolder.add(grp2.rotation, "x", -1, 1);
		// // cubeFolder.add(grp2.rotation, "z", -1, 1);
		// cubeFolder.add(grp3.rotation, "z", -1, 1);
		// cubeFolder.add(grp4.rotation, "x", -1, 1);
		// cubeFolder.open();
		buildStanfordRobot();
	}, []);
	return (
		<div className="App">
			<canvas id="myCanvas"></canvas>
		</div>
	);
}

export default App;
