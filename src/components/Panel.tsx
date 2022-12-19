import { Paper, Box, Typography, Slider, Input, Button } from "@mui/material";
import { useState, ChangeEvent, useEffect } from "react";
import * as THREE from "three";
import grp from "./FirstAndSecRevJoint";
import { sphere } from "./Object";
import { secondGrp, mrgCubeToWrist } from "./PrismaticJoint";
import { smoothTransition, prismaticJointSize } from "./Stanford";
import { thirdGrp } from "./Wrist";

const Panel = () => {
  const [xState, setXState] = useState<number>(50);
  const [yState, setYState] = useState<number>(50);
  const [zState, setZState] = useState<number>(50);

  const [inverseData, setInverseData] = useState<{
    firstAngle: number;
    secondAngle: number;
    s: number;
    r: number;
  }>();

  const [step, setStep] = useState(1);

  const calculateCoordinate = (value: number) => {
    return (value - 50) * 0.008;
  };
  const calculatePercentage = (val: number) => {
    return val / 0.008 + 50;
  };
  const handleXChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value as unknown as number;
    if (val > 0.4) val = 0.4;
    if (val < -0.4) val = -0.4;
    e.target.value = val.toString();
    setXState(calculatePercentage(val));
  };
  const handleYChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value as unknown as number;
    if (val > 0.4) val = 0.8;
    if (val < -0.4) val = 0;
    e.target.value = val.toString();
    setYState(calculatePercentage(val) - 50);
  };
  const handleZChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value as unknown as number;
    if (val > 0.4) val = 0.4;
    if (val < -0.4) val = -0.4;
    e.target.value = val.toString();
    setZState(calculatePercentage(val));
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

    const secondAngle = Math.atan2(secondGrp.position.z, r);
    return { firstAngle, secondAngle, s, r };
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
    smoothTransition(
      mrgCubeToWrist.position.x,
      -0.1,
      mrgCubeToWrist,
      "position",
      "x"
    );
  };
  const thirdJointMovement = () => {
    var target = new THREE.Vector3();
    thirdGrp.getWorldPosition(target);
    const x = sphere.position.x - target.x;
    const z = sphere.position.z - target.z;
    const y = sphere.position.y - target.y;
    const dis = Math.sqrt(x ** 2 + z ** 2);
    const prismaticDis = Math.sqrt(y ** 2 + dis ** 2);

    smoothTransition(
      mrgCubeToWrist.position.x,
      mrgCubeToWrist.position.x + prismaticJointSize(prismaticDis),
      mrgCubeToWrist,
      "position",
      "x"
    );
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
        setStep(1);
    }
  };

  return (
    <Paper
      sx={{
        position: "absolute",
        background: "#061824",
        zIndex: 10,
        width: 224,
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
            marginRight: "6px",
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
        <Input
          sx={{
            color: "white",
            backgroundColor: "#193640",
          }}
          size="small"
          onChange={handleXChange}
          value={calculateCoordinate(xState)}
          inputProps={{
            step: 0.01,
            min: -0.4,
            max: 0.4,
            style: { textAlign: "center", width: 48 },
          }}
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
        <Input
          sx={{
            color: "white",
            backgroundColor: "#193640",
          }}
          size="small"
          onChange={handleYChange}
          value={calculateCoordinate(yState + 50)}
          inputProps={{
            step: 0.01,
            min: -0.4,
            max: 0.4,
            style: { textAlign: "center", width: 48 },
          }}
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
        <Input
          sx={{
            color: "white",
            backgroundColor: "#193640",
          }}
          size="small"
          onChange={handleZChange}
          value={calculateCoordinate(zState)}
          inputProps={{
            step: 0.01,
            min: -0.4,
            max: 0.4,
            style: { textAlign: "center", width: 48 },
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
        {`Step ${step}`}
      </Button>
    </Paper>
  );
};

export default Panel;
