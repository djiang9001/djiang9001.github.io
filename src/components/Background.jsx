// This background draws the dots as divs instead of using a canvas.
// Not practical for large numbers of dots, but is ok with 100 dots
// import React, { useState, useEffect } from 'react'
// import styled, { keyframes } from 'styled-components'
// import { Transition } from "react-transition-group";

// const pointRadius = 1;//px
// const sphereRadius = 40;//vw
// const transitionName = 'background';

// const move = keyframes`
//     from {
//         transform: translateZ(-100px);
//     }

//     to {
//         transform: translateZ(100px);
//     }
// `
// const rotate = keyframes`
//     from {
//         transform: rotateY(0deg);
//     }

//     to {
//         transform: rotateY(360deg);
//     }
// `
// const grow = keyframes`
//     from {
//         transform: scale(0);
//     }

//     to {
//         transform: scale(1);
//     }
// `

// const PointContainer = styled.span`
//     border-radius: 50%;
//     width: ${pointRadius * 2}px;
//     height: ${pointRadius * 2}px;
//     position: absolute;
//     transform-style: preserve-3d;
//     transform: translate3d(${props => props.x}vw, ${props => props.y}vw, ${props => props.z}vw);
// `

// const PointInner = styled.div`
//     background: white;
//     border-radius: 50%;
//     width: ${pointRadius * 2}px;
//     height: ${pointRadius * 2}px;
//     position: relative;
//     transform-style: preserve-3d;
//     animation: ${rotate} 50s linear reverse infinite;
// `

// const SphereRotateY = styled.div`
//     animation: ${rotate} 50s linear infinite;
//     transform-style: preserve-3d;
// `

// const SphereEnterExit = styled.div`
//     transform-style: preserve-3d;
//     &.${transitionName}-entering {
//         animation: ${grow} 0.5s linear;
//     }
//     &.${transitionName}-exiting {
//         animation: ${grow} 0.5s linear reverse;
//     }
//     &.${transitionName}-exited {
//         visibility: hidden;
//     }
// `

// function randomSpherePoint(x0,y0,z0,radius){
//     var u = Math.random();
//     var v = Math.random();
//     var theta = 2 * Math.PI * u;
//     var phi = Math.acos(2 * v - 1);
//     var x = x0 + (radius * Math.sin(phi) * Math.cos(theta));
//     var y = y0 + (radius * Math.sin(phi) * Math.sin(theta));
//     var z = z0 + (radius * Math.cos(phi));
//     return [x,y,z];
//  }

// const BackgroundContainer = styled.div`
//     position: fixed;
//     z-index: -1;
//     top: 0;
//     left: 0;
//     height: 100vh;
//     width: 100vw;
//     perspective: ${sphereRadius * 2}vw;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `
// const numPoints = 100;
// const points = Array.from({length: numPoints}, () => randomSpherePoint(0,0,0,sphereRadius));
// const circles = points.map((point, index) => (
//     <PointContainer x={point[0]} y={point[1]} z={point[2]} key={index}>
//         <PointInner key={index}/>
//     </PointContainer>
//     ));

// export function Sphere() {
//     return (<SphereRotateY>{circles}</SphereRotateY>);
// }

// // Background contains a sphere. Sphere contains points. Rotate the sphere (about Y axis counterclockwise), send dots between points on the sphere.
// // On exit, shrink (collapse) the sphere. On entrance, grow the sphere from center point.
// // On scroll, rotate sphere about X axis (upwards on scroll down)
// export function Background(props) {
//     const {
//         inProp = true,
//         appear = true
//     } = props;
//     return (
//         <Transition appear={appear} in={inProp} timeout={500} {...props}>
//             {state => {
//                 return <BackgroundContainer><SphereEnterExit className={`${transitionName}-${state}`}><Sphere key={'sphere'}/></SphereEnterExit></BackgroundContainer>
//             }}
//         </Transition>
//     );
// }