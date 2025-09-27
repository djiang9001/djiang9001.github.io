import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import type { CanvasProps } from '@react-three/fiber';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, MeshDiscardMaterial, MeshTransmissionMaterial, Outlines, PerspectiveCamera } from '@react-three/drei';

import { Box, ThemeProvider, useColorScheme, useTheme } from '@mui/material';
import { BoxGeometry, InstancedMesh, MathUtils, Matrix4, MeshBasicMaterial, Plane, Vector3 } from 'three';

import { Route, useLocation, useRoute } from 'wouter';
import { AboutPage } from '@app/pages/AboutPage';
import { CareerPage } from '@app/pages/CareerPage';
import { ContactPage } from '@app/pages/ContactPage';
import { HomePage } from '@app/pages/HomePage';
import { ProjectsPage } from '@app/pages/ProjectsPage';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

type CubeParticle = {
  velocity: number;
  index: number;
  position: Matrix4;
}

const roundAwayFromZero = (num: number): number => {
  if (num > 0) {
    return Math.ceil(num);
  } else {
    return Math.floor(num);
  }
}

const roundVector3AwayFromZero = (vec: Vector3): Vector3 => {
  vec.setX(roundAwayFromZero(vec.x));
  vec.setY(roundAwayFromZero(vec.y));
  vec.setZ(roundAwayFromZero(vec.z));
  return vec;
}

const Background: FC = () => {
  const theme = useTheme();
  const cubeGeo = new BoxGeometry();
  const cubeMat = new MeshBasicMaterial({ color: theme.palette.primary.main });

  const count = 500;
  const lifespan = 15;
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
  const timeSinceLastStep = useRef<number>(0);
  const timePerStep = 1 / 60;
  const planeDist = 25;
  useEffect(() => {
    if (instancesRef.current) {
      instancesRef.current.count = count;
      for (let i = 0; i < count; i++) {
        instancesRef.current!.setMatrixAt(i, new Matrix4().scale(zero));
      }
      instancesRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [cubeMat])
  const detectedFirstMove = useRef<boolean>(false);
  // Life stores 5 arrays of tuples [i, v] where i is the instance index and v is the speed
  const life = useRef<CubeParticle[][]>(Array(lifespan).fill([]));
  const availableInstances = useRef<number[]>(Array(count).fill(0).map((_v, i) => i));
  const instancesRef = useRef<InstancedMesh>(null);
  const oldTarget = useRef<Vector3>(new Vector3());
  const target = new Vector3(undefined, undefined, undefined);
  const velocity = new Vector3();
  const plane = new Plane(new Vector3(0, 0, 1), planeDist);
  const adjustmentVector = new Vector3(0.5, 0.5, 0);
  const matrix = new Matrix4();
  const translationMatrix = new Matrix4();
  const displacement = new Vector3();
  if (instancesRef.current) {
    instancesRef.current.count = 0;
  }

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

  return (<>
    <Canvas {...props} style={{ position: 'fixed', top: 0, bottom: 0, left: 0, right: 0, overflow: 'hidden', zIndex: -1 }}>
      <color attach="background" args={[backgroundColor]} />
      {/* <gridHelper position={[0, 0, -100]} rotation={[Math.PI/2, 0, 0]} args={[500, 500, "grey", "grey"]}/>
      <Line points={[[0, 0, 0], [1, 0, 0]]} color="red" linewidth={2}/>
      <Line points={[[0, 0, 0], [0, 1, 0]]} color="green" linewidth={2}/>
      <Line points={[[0, 0, 0], [0, 0, 1]]} color="blue" linewidth={2}/> */}
      <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={40}/>
      {/* <OrbitControls/> */}
      <ambientLight intensity={10}/>
      <Background/>
      <ContentCube />
    </Canvas>
  </>)
}

const ContentCube: FC = () => {
  const theme = useTheme();
  const { mode, systemMode, setMode } = useColorScheme();
  var actualMode = mode;
  if (mode === "system") {
    actualMode = systemMode;
  }

  const contentCubeRef = useRef<any>(null);
  const currentContentRef = useRef<any>(null);
  const neighbourRotations = [
    [new Vector3(0, 1, 0), Math.PI/2],
    [new Vector3(0, 1, 0), -Math.PI/2],
    [new Vector3(1, 0, 0), Math.PI/2],
    [new Vector3(1, 0, 0), -Math.PI/2],
  ];
  const targetRotation = useRef<any[]>([]);
  const [location, navigate] = useLocation();
  const routeMatch = (targetLocation: string) => {
    const [isMatch] = useRoute(targetLocation);
    return isMatch;
  }
  const duration = 0.2;
  const elapsedTime = useRef<number>(0);
  const rotationDone = useRef<boolean>(true);
  const firstRender = useRef<boolean>(true);

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
      <MeshTransmissionMaterial color={'#ffffff'} transmission={1} backside backsideThickness={3} thickness={3}/>
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
    <CubeButton positionX={-10} positionY={4} onClick={() => navigate("/")} outlined={routeMatch("/")}>
      Home
    </CubeButton>
    <CubeButton positionX={-10} positionY={0} onClick={() => navigate("/about")} outlined={routeMatch("/about")}>
      About
    </CubeButton>
    <CubeButton positionX={-10} positionY={-4} onClick={() => navigate("/projects")} outlined={routeMatch("/projects")}>
      Projects
    </CubeButton>
    <CubeButton positionX={10} positionY={4} onClick={() => navigate("/career")} outlined={routeMatch("/career")}>
      Career
    </CubeButton>
    <CubeButton positionX={10} positionY={0} onClick={() => navigate("/contact")} outlined={routeMatch("/contact")}>
      Contact
    </CubeButton>
    <CubeButton positionX={10} positionY={-4} outlined={routeMatch("/bomb")}
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
    </group>
  );
}

type CubeButtonProps = {
  positionX: number;
  positionY: number;
  outlined: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const CubeButton: FC<CubeButtonProps> = ({positionX, positionY, outlined, onClick, children}) => {
  const theme = useTheme();
  const [hover, setHover] = useState<boolean>(false);
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
