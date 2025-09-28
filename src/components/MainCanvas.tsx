import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { CanvasProps } from '@react-three/fiber';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, MeshDiscardMaterial, MeshTransmissionMaterial, Outlines, PerformanceMonitor, PerspectiveCamera } from '@react-three/drei';

import { Box, ThemeProvider, useColorScheme, useTheme } from '@mui/material';
import { BoxGeometry, InstancedMesh, MathUtils, Matrix4, MeshBasicMaterial, Plane, Vector3 } from 'three';

import { Route, useLocation, useRoute } from 'wouter';

import { AboutPage } from '@app/pages/AboutPage';
import { CareerPage } from '@app/pages/CareerPage';
import { ContactPage } from '@app/pages/ContactPage';
import { HomePage } from '@app/pages/HomePage';
import { ProjectsPage } from '@app/pages/ProjectsPage';

import { degreeToRad, radToDegree, roundVector3AwayFromZero, useWindowDimensions } from '@app/helpers/helpers';

import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

type CubeParticle = {
  velocity: number;
  index: number;
  position: Matrix4;
}

const Background: FC = () => {
  const theme = useTheme();

  // Background cube mesh geometry and material
  const cubeGeo = new BoxGeometry();
  const cubeMat = new MeshBasicMaterial({ color: theme.palette.primary.main });

  // Max number of cubes in background at once
  const count = 500;

  // Number of frames cubes will exist
  const lifespan = 15;

  // Constant unit vectors
  const neighbours = [
    new Vector3(1, 0, 0),
    new Vector3(-1, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(0, -1, 0),
    new Vector3(0, 0, 1),
    new Vector3(0, 0, -1),
  ];
  const identity = new Vector3(1, 1, 1);
  const zero = new Vector3(0, 0, 0);

  // Ref for tracking time since last animation step
  const timeSinceLastStep = useRef<number>(0);
  const timePerStep = 1 / 60;

  // Plane where cubes will spawn from
  const planeDist = 25;
  const plane = new Plane(new Vector3(0, 0, 1), planeDist);

  // Constant vector to be added to pointer intersect position to ensure cubes spawn in middle of grid
  const adjustmentVector = new Vector3(0.5, 0.5, 0);

  // This is needed to prevent cube instances from being visible when cube material changes, i.e. on dark mode toggle
  useEffect(() => {
    if (instancesRef.current) {
      instancesRef.current.count = count;
      for (let i = 0; i < count; i++) {
        instancesRef.current!.setMatrixAt(i, new Matrix4().scale(zero));
      }
      instancesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [cubeMat]);

  // Ref used to prevent cubes from spawning on initial page load
  const detectedFirstMove = useRef<boolean>(false);

  // life[i] contains all CubeParticles with lifespan i remaining
  const life = useRef<CubeParticle[][]>(Array(lifespan).fill([]));

  // Indices of instances that are available to spawn cubes
  const availableInstances = useRef<number[]>(Array(count).fill(0).map((_v, i) => i));

  // Ref to instancedMesh object
  const instancesRef = useRef<InstancedMesh>(null);

  // Vectors for tracking pointer position
  const oldTarget = useRef<Vector3>(new Vector3());
  const target = new Vector3(undefined, undefined, undefined);

  // Vectors to hold values here to be reused, so we don't need to allocate new vectors every time
  const velocity = new Vector3();
  const matrix = new Matrix4();
  const translationMatrix = new Matrix4();
  const displacement = new Vector3();

  // Prevent any cubes from spawning initially
  if (instancesRef.current) {
    instancesRef.current.count = 0;
  }

  // Per frame logic
  useFrame(( state, delta ) => {
    timeSinceLastStep.current = timeSinceLastStep.current + delta;
    if (timeSinceLastStep.current > timePerStep) {
      // Remove instances at end of life, recycle available instances
      while (life.current[0].length > 0) {
        let cube = life.current[0].pop();
        if (cube) {
          availableInstances.current.push(cube.index);
          instancesRef.current!.setMatrixAt(cube.index, cube.position.scale(zero));
        }
        instancesRef.current!.instanceMatrix.needsUpdate = true;
      }
      // Move all instances by one time step
      for (let i = 0; i < lifespan - 1; i++) {
        life.current[i] = life.current[i+1];
        life.current[i].forEach(({velocity, position}) => {
          position.multiply(translationMatrix.makeTranslation(
            roundVector3AwayFromZero(
              displacement.copy(
                neighbours[Math.floor(Math.random() * 6)])
                .multiplyScalar(timePerStep / 3 * velocity))));
        });
      }
      life.current[lifespan - 1] = [];
      timeSinceLastStep.current = 0;
    }

    // Check if we need to add a new instance
    const ray = state.raycaster.ray;
    ray.intersectPlane(plane, target);
    // Force target to grid
    target.floor().add(adjustmentVector).setZ(0);
    if (!detectedFirstMove.current) {
      oldTarget.current = new Vector3().copy(target);
    }
    if (!target.equals(adjustmentVector)) {
      detectedFirstMove.current = true;
    }
    if (oldTarget.current && !oldTarget.current.equals(target) && detectedFirstMove.current) {
      // Calculate velocity
      velocity.copy(target).sub(oldTarget.current).divideScalar(delta);
      // Add new instance
      neighbours.forEach((neighbour) => {
        const newInstance = availableInstances.current.pop();
        if (newInstance !== undefined) {
          matrix.setPosition(displacement.copy(target).add(neighbour));
          matrix.scale(identity);
          life.current[lifespan - 1].push({velocity: velocity.length(), index: newInstance, position: matrix.clone()});
        }
      });
      oldTarget.current.copy(target);
    }

    // Render all instances in life
    if (instancesRef.current) {
      life.current.forEach((stage) => {
        stage.forEach(({index, position}) => {
          instancesRef.current!.setMatrixAt(index, position);
          instancesRef.current!.instanceMatrix.needsUpdate = true;
        });
      });
    }
  });

  return(
    <instancedMesh
      ref={instancesRef}
      count={count} // Optional: max amount of items (for calculating buffer size)
      // range={1000} // Optional: draw-range
      position={[0, 0, -planeDist]}
      geometry={cubeGeo}
      material={cubeMat}
      args={[cubeGeo, cubeMat, count]}
    >
      <Outlines thickness={3} color={theme.palette.primary.contrastText} />
      {/* <CubeInstances count={count}/> */}
    </instancedMesh>
  );
}

export const MainCanvas: FC<CanvasProps> = (props: CanvasProps) => {

  const theme = useTheme();
  const backgroundColor = theme.palette.background.default;

  // Ensure all interactable cubes stay on screen
  const dimensions = useWindowDimensions();
  const aspectRatio = dimensions.width / dimensions.height;
  if (aspectRatio < 1) {
    var minVerticalFov = 55;
    var minHorizontalFov = 40;
  } else {
    var minVerticalFov = 40;
    var minHorizontalFov = 65;
  }
  const vFOV = Math.max(radToDegree(2 * Math.atan(Math.tan(degreeToRad(minHorizontalFov) / 2) / aspectRatio)), minVerticalFov);

  return (<>
    <Canvas {...props} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', zIndex: -1 }}>
      <color attach="background" args={[backgroundColor]} />
      {/* <gridHelper position={[0, 0, -100]} rotation={[Math.PI/2, 0, 0]} args={[500, 500, "grey", "grey"]}/>
      <Line points={[[0, 0, 0], [1, 0, 0]]} color="red" linewidth={2}/>
      <Line points={[[0, 0, 0], [0, 1, 0]]} color="green" linewidth={2}/>
      <Line points={[[0, 0, 0], [0, 0, 1]]} color="blue" linewidth={2}/>
      <OrbitControls/> */}
      <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={vFOV}/>
      <ambientLight intensity={10}/>
      <Background/>
      <ContentCube />
    </Canvas>
  </>)
}

const ContentCube: FC = () => {
  const theme = useTheme();
  const [location, navigate] = useLocation();
  const { mode, systemMode, setMode } = useColorScheme();
  var actualMode = mode;
  if (mode === "system") {
    actualMode = systemMode;
  }

  const contentCubeRef = useRef<any>(null);
  const currentContentRef = useRef<any>(null);

  // Possible rotations for the cube to do on page navigation
  const neighbourRotations = [
    [new Vector3(0, 1, 0), Math.PI/2],
    [new Vector3(0, 1, 0), -Math.PI/2],
    [new Vector3(1, 0, 0), Math.PI/2],
    [new Vector3(1, 0, 0), -Math.PI/2],
  ];
  // Selected rotation
  const targetRotation = useRef<any[]>([]);

  // Function for checking if current route matches target string
  const routeMatch = (targetLocation: string) => {
    const [isMatch] = useRoute(targetLocation);
    return isMatch;
  }

  // Duration of cube spin
  const duration = 0.2;
  // Ref for tracking if spin is finished
  const elapsedTime = useRef<number>(0);
  const rotationDone = useRef<boolean>(true);
  // Ref for preventing spin on first render
  const firstRender = useRef<boolean>(true);

  // Determines if the page layout should be horizontal or vertical
  const dimensions = useWindowDimensions();
  const aspectRatio = dimensions.width / dimensions.height;
  const isVertical = aspectRatio < 1;

  // Performance tuning variables
  const [cubeRes, setCubeRes] = useState<number|undefined>(undefined);
  const [useTransmissionSampler, setUseTransmissionSampler] = useState<boolean>(false);

  // Rotate on page navigation
  useEffect(() => {
    if (!firstRender.current) {
      var random = Math.floor(Math.random() * 4);
      targetRotation.current = neighbourRotations[random];
      elapsedTime.current = 0;
      rotationDone.current = false;
      currentContentRef.current.rotateOnWorldAxis(targetRotation.current[0], -targetRotation.current[1]);
    }
    firstRender.current = false;
  }, [location]);

  useFrame((_state, delta) => {
    if (!rotationDone.current && contentCubeRef.current) {
      elapsedTime.current += delta;
      const toRotate = MathUtils.lerp(0, targetRotation.current[1], MathUtils.clamp(elapsedTime.current / duration, 0, 1));
      contentCubeRef.current.setRotationFromAxisAngle(targetRotation.current[0], toRotate);
      currentContentRef.current.setRotationFromAxisAngle(targetRotation.current[0], toRotate - targetRotation.current[1]);
      if (elapsedTime.current >= duration) {
        contentCubeRef.current.setRotationFromAxisAngle(targetRotation.current[0], 0);
        currentContentRef.current.setRotationFromAxisAngle(targetRotation.current[0], 0);
        rotationDone.current = true;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
    <mesh ref={contentCubeRef} scale={12}>
      <boxGeometry />
      <MeshTransmissionMaterial color={'#ffffff'} transmission={1} backside backsideThickness={3} thickness={3} resolution={cubeRes} backsideResolution={cubeRes} transmissionSampler={useTransmissionSampler}/>
    </mesh>
    <group ref={currentContentRef}>
      <Html center transform position={[0, 0, 6.1]} scale={1} occlude="blending" material={<MeshTransmissionMaterial transmission={1} transmissionSampler/>}>
        <ThemeProvider theme={theme}>
          <Route path="/">
            <HomePage/>
          </Route>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/projects">
            <ProjectsPage/>
          </Route>
          <Route path="/career">
            <CareerPage/>
          </Route>
          <Route path="/contact">
            <ContactPage/>
          </Route>
        </ThemeProvider>
      </Html>
    </group>
    <CubeButton positionX={-10} positionY={4} flipXYPos={isVertical} onClick={() => navigate("/")} outlined={routeMatch("/")}>
      Home
    </CubeButton>
    <CubeButton positionX={-10} positionY={0} flipXYPos={isVertical} onClick={() => navigate("/about")} outlined={routeMatch("/about")}>
      About
    </CubeButton>
    <CubeButton positionX={-10} positionY={-4} flipXYPos={isVertical} onClick={() => navigate("/projects")} outlined={routeMatch("/projects")}>
      Projects
    </CubeButton>
    <CubeButton positionX={10} positionY={4} flipXYPos={isVertical} onClick={() => navigate("/career")} outlined={routeMatch("/career")}>
      Career
    </CubeButton>
    <CubeButton positionX={10} positionY={0} flipXYPos={isVertical} onClick={() => navigate("/contact")} outlined={routeMatch("/contact")}>
      Contact
    </CubeButton>
    <CubeButton positionX={10} positionY={-4} flipXYPos={isVertical} outlined={routeMatch("/bomb")}
      onClick={() => {
        if (actualMode === "dark") {
          setMode("light");
        } else {
          setMode("dark");
        }
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {actualMode === "dark" ? <LightModeIcon/> : <DarkModeIcon/>}
      </Box>
    </CubeButton>
    <PerformanceMonitor
      bounds={(refreshrate) => ([30, refreshrate])}
      onIncline={() => {
        if (useTransmissionSampler) {
          setUseTransmissionSampler(false);
          console.log("disable transmissionSampler")
          return;
        }
        if (cubeRes !== undefined) {
          if (cubeRes >= 512) {
            setCubeRes(undefined);
            console.log("disable meshTransmissionMaterial res");
          } else {
            setCubeRes(cubeRes * 2);
            console.log("increase meshTransmissionMaterial res to " + cubeRes)
          }
        }
      }}
      onDecline={() => {
        if (cubeRes === undefined) {
          setCubeRes(512);
          console.log("decrease meshTransmissionMaterial res to " + cubeRes)
        } else if (cubeRes <= 32) {
          setCubeRes(32);
          setUseTransmissionSampler(true);
          console.log("enable transmissionSampler")
        } else {
          setCubeRes(cubeRes / 2);
          console.log("decrease meshTransmissionMaterial res to " + cubeRes)
        }
      }}/>
    </group>
  );
}

type CubeButtonProps = {
  positionX: number;
  positionY: number;
  outlined: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  flipXYPos?: boolean;
}

const CubeButton: FC<CubeButtonProps> = ({positionX, positionY, outlined, onClick, children, flipXYPos = false}) => {
  const theme = useTheme();
  const [hover, setHover] = useState<boolean>(false);
  if (flipXYPos) {
    const temp = -(positionX * 0.8);
    positionX = -positionY;
    positionY = temp;
  }
  return (
  <group  position={[positionX, positionY, 0]}>
    <mesh onClick={onClick} scale={hover ? 3 : 2.4} position={[0, 0, 4.8]} onPointerOver={() => { document.body.style.cursor = 'pointer'; setHover(true); }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; setHover(false); } }
    >
      <boxGeometry />
      <MeshTransmissionMaterial color={theme.palette.secondary.main} transmission={1} backside backsideThickness={3} thickness={3} transmissionSampler/>
      {outlined && <Outlines thickness={20} color={theme.palette.primary.main}/>}
    </mesh>
    <Html style={{ userSelect: "none", pointerEvents: "none", display: "flex", alignItems: "center", justifyContent: "center" }} center transform position={[0, 0, 6.1]} scale={1} occlude="blending" material={<MeshDiscardMaterial/>}>
      <ThemeProvider theme={theme}>
        <button onClick={onClick} style={{
          background: "none",
          color: "inherit",
          border: "none",
          padding: 0,
          font: "inherit",
          cursor: "pointer",
          // outline: "inherit",
        }}>
          {children}
        </button>
      </ThemeProvider>
    </Html>
  </group>
  );
}
