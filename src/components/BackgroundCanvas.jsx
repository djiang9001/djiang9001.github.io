import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

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
        ref.current.position.set(point.x, point.y, point.z);
    });
    return(
        <sprite
            {...props}
            position={point}
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
const oldPoints = points.map((point) => (point.clone()));
points.map((point) => (randomSpherePoint(0,0,0,sphereRadius,point)));
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const material = new THREE.LineBasicMaterial({ color: 0x171717 });
const circles = oldPoints.map((point, index) => (<CircleSprite key={index} point={point} scale={0.005} center={[0.5, 0.5]}/>));

export function newPoints() {
    points.map((point) => (randomSpherePoint(0,0,0,sphereRadius,point)));
}

function Sphere(props) {
    useFrame((state, delta) => {
        oldPoints.map((point, index) => point.lerp(points[index], delta));
        geometry.setFromPoints(oldPoints);
    });
    return <>{circles}</>;
}
var axisX = new THREE.Vector3(1,0,0);
var axisY = new THREE.Vector3(0,1,0);
const dist = sphereRadius + 1; // distance from center of sphere (ie. the origin)
function DefaultCamera() {
    const { camera } = useThree();
    camera.position.clampLength(1.9,2.1);
    useEffect(() => {
        camera.position.set(0,0,dist);
    }, []);
    var oldpos = 0;
    useFrame((state, delta) => {
        axisY.set(0,1,0);
        axisY.copy(state.camera.localToWorld(axisY).sub(state.camera.position));
        state.camera.position.applyAxisAngle(axisY, -0.03 * delta);
        if (typeof window !== 'undefined') {
            if (window.pageYOffset != oldpos) {
                // -camera.pos cross camera up gives local x axis
                axisX.set(1,0,0);
                state.camera.position.applyAxisAngle(state.camera.localToWorld(axisX).sub(state.camera.position), 0.001 * (window.pageYOffset - oldpos));
            }
            oldpos = window.pageYOffset;
        }
        state.camera.up.copy(axisY);
        state.camera.lookAt(0,0,0);
        // make sphere fit inside screen width, with some extra space
        state.camera.fov = 2 * Math.atan((1.2* sphereRadius) / state.viewport.aspect / dist) * (180 / Math.PI);
        state.camera.updateProjectionMatrix();
    });
    return null;
}

const BackgroundContainer = styled.div`
    position: fixed;
    z-index: 0;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
`

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
