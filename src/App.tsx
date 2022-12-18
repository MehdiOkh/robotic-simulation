import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";
import * as geom from "three/examples/jsm/utils/BufferGeometryUtils";
import { AxesHelper } from "three";
import buildStanfordRobot, {
	prismaticJointSize,
	smoothTransition,
} from "./components/Stanford";
import Paper from "@mui/material/Paper";
import { Box, Button, Slider, Typography } from "@mui/material";
import { sphere } from "./components/Object";
import grp from "./components/FirstAndSecRevJoint";
import { mrgCubeToWrist, secondGrp } from "./components/PrismaticJoint";
import { thirdGrp } from "./components/Wrist";

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
	const [xState, setXState] = useState<number>(50);
	const [yState, setYState] = useState<number>(50);
	const [zState, setZState] = useState<number>(50);
	const [inverseData, setInverseData] = useState<{
		firstAngle: number;
		secondAngle: number;
		s: number;
		r: number;
		prismaticDis: number;
	}>();
	const [step, setStep] = useState(1);
	const calculateCoordinate = (value: number) => {
		return (value - 50) * 0.008;
	};
	useEffect(() => {
		const x = calculateCoordinate(xState);
		const y = calculateCoordinate(yState + 50);
		const z = calculateCoordinate(zState);

		sphere.position.set(x, y, z);
		setInverseData(onObjectCoordinatesChange());
		setStep(1);
	}, [xState, yState, zState]);

	const onObjectCoordinatesChange = () => {
		const firstAngle = -Math.atan2(sphere.position.z, sphere.position.x);
		const r = Math.sqrt(
			sphere.position.x ** 2 +
				sphere.position.z ** 2 -
				secondGrp.position.z ** 2
		);
		const s = sphere.position.y - secondGrp.position.y;

		var target = new THREE.Vector3();
		secondGrp.getWorldPosition(target);
		// console.log(target);

		const x = sphere.position.x - target.x;
		const z = sphere.position.z - target.z;
		// const dis = Math.sqrt(x ** 2 + z ** 2);
		const dis = target.distanceTo(sphere.position);
		const prismaticDis = Math.sqrt(s ** 2 + dis ** 2);
		const secondAngle = Math.atan2(secondGrp.position.z, r);
		return { firstAngle, secondAngle, s, r, prismaticDis };
	};

	const firstJointMovement = () => {
		smoothTransition(
			grp.rotation.y,
			inverseData!.firstAngle + inverseData!.secondAngle,
			grp,
			"rotation",
			"y"
		);
	};
	const secondJointMovement = () => {
		smoothTransition(
			secondGrp.rotation.z,
			Math.atan2(inverseData!.s, inverseData!.r),
			secondGrp,
			"rotation",
			"z"
		);
		mrgCubeToWrist.position.x = -0.1;
	};
	const thirdJointMovement = () => {
		var target = new THREE.Vector3();
		thirdGrp.getWorldPosition(target);
		const x = sphere.position.x - target.x;
		const z = sphere.position.z - target.z;
		const y = sphere.position.y - target.y;
		const dis = Math.sqrt(x ** 2 + z ** 2);
		// const dis = target.distanceTo(sphere.position);
		const prismaticDis = Math.sqrt(y ** 2 + dis ** 2);
		// setInverseData((prevState) => {
		// 	return {
		// 		firstAngle: prevState!.firstAngle,
		// 		secondAngle: prevState!.secondAngle,
		// 		r: prevState!.r,
		// 		s: prevState!.s,
		// 		prismaticDis,
		// 	};
		// });
		console.log(prismaticDis);
		// console.log(dis, x, z);
		mrgCubeToWrist.position.set(
			mrgCubeToWrist.position.x + prismaticJointSize(prismaticDis),
			0,
			0
		);
		// smoothTransition(
		// 	mrgCubeToWrist.position.x,
		// 	prismaticJointSize(prismaticDis),
		// 	mrgCubeToWrist,
		// 	"position",
		// 	"x"
		// );
	};

	const onBtnClick = () => {
		switch (step) {
			case 1:
				firstJointMovement();
				setStep((prevState) => prevState + 1);
				break;
			case 2:
				secondJointMovement();
				setStep((prevState) => prevState + 1);
				break;
			case 3:
				thirdJointMovement();
				setStep((prevState) => prevState + 1);
		}
	};

	return (
		<div className="App">
			<canvas id="myCanvas"></canvas>

			<Paper
				sx={{
					position: "absolute",
					background: "#061824",
					zIndex: 10,
					width: 224,
					// height: 328,
					top: "10px",
					right: "10px",
				}}
				elevation={3}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: "24px 24px",
					}}
				>
					<Typography
						sx={{ margin: "0 6px" }}
						color={"white"}
						variant="subtitle2"
						gutterBottom
					>
						x
					</Typography>
					<Slider
						sx={{
							marginLeft: "6px",
							marginRight: "12px",
							marginTop: "2px",
							color: "#6FB2E0",
						}}
						size="small"
						value={xState}
						onChange={(_, newVal) => {
							setXState(newVal as number);
						}}
						defaultValue={50}
						aria-label="Default"
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: "24px 24px",
					}}
				>
					<Typography
						sx={{ margin: "0 6px" }}
						color={"white"}
						variant="subtitle2"
						gutterBottom
					>
						y
					</Typography>
					<Slider
						sx={{
							marginLeft: "6px",
							marginRight: "12px",
							marginTop: "2px",
							color: "#6FB2E0",
						}}
						size="small"
						value={yState}
						onChange={(_, newVal) => {
							setYState(newVal as number);
						}}
						defaultValue={50}
						aria-label="Default"
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						margin: "24px 24px",
					}}
				>
					<Typography
						sx={{ margin: "0 6px" }}
						color={"white"}
						variant="subtitle2"
						gutterBottom
					>
						z
					</Typography>
					<Slider
						sx={{
							marginLeft: "6px",
							marginRight: "12px",
							marginTop: "2px",
							color: "#6FB2E0",
						}}
						size="small"
						defaultValue={50}
						aria-label="Default"
						value={zState}
						onChange={(_, newVal) => {
							setZState(newVal as number);
						}}
					/>
				</Box>
				<Button
					sx={{
						backgroundColor: "#2E89C6",
						height: 40,
						width: "100%",
						":hover": { backgroundColor: "#6FB2E0" },
					}}
					variant="contained"
					onClick={() => {
						onBtnClick();
					}}
				>
					Start
				</Button>
			</Paper>
		</div>
	);
}

export default App;
