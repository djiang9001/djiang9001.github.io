import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { Transition } from "react-transition-group";


export function Box(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (ref.current.rotation.y += 0.01))
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={ref}
        scale={clicked ? 1.5 : 1}
        onClick={(event) => click(!clicked)}
        onPointerOver={(event) => hover(true)}
        onPointerOut={(event) => hover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}

function createCircleTexture(color, size) {
    if (typeof document !== 'undefined') {
        var matCanvas = document.createElement('canvas');
        matCanvas.width = matCanvas.height = size;
        var matContext = matCanvas.getContext('2d');
        // create texture object from canvas.
        var texture = new THREE.Texture(matCanvas);
        // Draw a circle
        var center = size / 2;
        matContext.beginPath();
        matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
        matContext.closePath();
        matContext.fillStyle = color;
        matContext.fill();
        // need to set needsUpdate
        texture.needsUpdate = true;
        // return a texture made from the canvas
        return texture;
    }
  }

const circleTexture = createCircleTexture('white', 64);

export function CircleSprite(props) {
    const { point, shouldShow } = props;
    const ref = useRef();
    useFrame((state, delta) => {
        ref.current.position.lerp(point, 0.01);
    });
    return(
        <sprite
            {...props}
            ref={ref}>
            <spriteMaterial map={circleTexture}/>
        </sprite>
    );
}
function randomSpherePoint(x0,y0,z0,radius,vector){
    var u = Math.random();
    var v = Math.random();
    var theta = 2 * Math.PI * u;
    var phi = Math.acos(2 * v - 1);
    var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
    var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
    var z = z0 + (radius * Math.cos(phi));
    vector.set(x,y,z);
 }
const numPoints=300;
const sphereRadius=1;
const points = Array.from({length: numPoints}, () => new THREE.Vector3(0,0,0).clampLength(0,sphereRadius));
points.map((point) => (randomSpherePoint(0,0,0,sphereRadius,point)));
const circles = points.map((point, index) => (<CircleSprite key={index} point={point} position={point} scale={0.005} center={[0.5, 0.5]}/>));
const oldPoints = points.map((point) => (point.clone()));
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial({ color: 0x171717 });

export function newPoints() {
    points.map((point) => (randomSpherePoint(0,0,0,sphereRadius,point)));
}

function Sphere(props) {
    useFrame((state, delta) => {
        oldPoints.map((point, index) => point.lerp(points[index], 0.01));
        geometry.setFromPoints(oldPoints);
    });
    return <>{circles}</>;
}

// fit width 2.2 on screen
// 2 * Math.atan((sphereRadius + 0.1)/2) gives horizontal fov in radians
// given hfov: Math.tan(hfov)/aspect = width/aspect/dist = height/dist
// then atan(height/dist) = vfov

// returns in radians
function hfovToVfov(hfov, aspect) {
    return Math.atan(Math.tan(hfov) / aspect);
}
function DefaultCamera() {
    const { camera, viewport } = useThree();
    useEffect(() => {
        const z = sphereRadius + 1;
        camera.lookAt(0,0,0);
        camera.position.set(0,0,z);
        const hfov = 2 * Math.atan((sphereRadius)/2); //radians
        camera.fov = hfovToVfov(hfov, viewport.aspect) * (180 / Math.PI);//convert to degrees
        camera.updateProjectionMatrix();
    }, []);
    var oldpos = 0;
    useFrame((state, delta) => {
        var axisX = new THREE.Vector3(1,0,0);
        state.camera.position.applyAxisAngle(camera.up, -0.0005);
        if (typeof window !== 'undefined') {
            if (window.pageYOffset > oldpos) {
                state.camera.position.applyAxisAngle(axisX, 0.02);
            } else if (window.pageYOffset < oldpos) {
                state.camera.position.applyAxisAngle(axisX, -0.02);
            }
            oldpos = window.pageYOffset;
        }
        state.camera.lookAt(0,0,0);
        state.camera.updateProjectionMatrix();
    });
    return null;
}

const BackgroundContainer = React.memo(styled.div`
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
`)

export function Background(props) {
    return (
        <BackgroundContainer>
            <Canvas>
                <DefaultCamera/>
                <Sphere/>
                <lineLoop geometry={geometry} material={material}/>
            </Canvas>
        </BackgroundContainer>
    );
}
