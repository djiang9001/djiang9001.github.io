import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
const flicker = keyframes`
    0% {
        opacity: 50%;
    }
    75% {
        opacity: 50%;
    }
    85% {
        opacity: 100%;
    }
    95% {
        opacity: 50%;
    }
    100% {
        opacity: 80%;
    }
`
const appearTop = keyframes`
  0% {
    transform: scaleX(0) translateY(100%) translateY(-2px);
  }

  50% {
    transform: scaleX(1) translateY(100%) translateY(-2px);
  }

  75% {
    transform: scaleX(1) translateY(0);
  }

  100% {
    transform: scaleX(1) translateY(0);
  }
`;
const appearBottom = keyframes`
  0% {
    transform: scaleX(0) translateY(-100%) translateY(2px);
  }

  50% {
    transform: scaleX(1) translateY(-100%) translateY(2px);
  }

  75% {
    transform: scaleX(1) translateY(0);
  }

  100% {
    transform: scaleX(1) translateY(0);
  }
`;
const appearMiddle = keyframes`
    0% {
        transform: scaleX(0) scaleY(0);
    }

    50% {
        transform: scaleX(1) scaleY(0);
    }

    75% {
        transform: scaleX(1) scaleY(1);
    }

    100% {
        transform: scaleX(1) scaleY(1);
    }
`

export const PlaceholderDiv = styled.div`
    position: relative;
    display: grid;
    opacity: 80%;
    animation: ${flicker} 0.5s linear;
`

export const TopBar = styled.div`
    //background: red;
    border-top: 2px solid white;
    box-sizing: border-box;
    grid-area: 1/1;
    animation: ${appearTop} 0.5s linear;
    pointer-events: none;
`
export const BottomBar = styled.div`
    //background: blue;
    border-bottom: 2px solid white;
    box-sizing: border-box;
    grid-area: 2/1;
    animation: ${appearBottom} 0.5s linear;
    pointer-events: none;
`

export const BoxContent = styled.div`
  padding: 1rem;
  margin: 1rem;
  background: #272727;
  grid-area: 1/1/3/1;
  animation: ${appearMiddle} 0.5s linear;
`

export function AnimatedBoxContainer(props) {
    return <PlaceholderDiv><BoxContent>{props.children}</BoxContent><TopBar/><BottomBar/></PlaceholderDiv>
}

export default AnimatedBoxContainer