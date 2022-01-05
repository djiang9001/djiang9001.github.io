import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'
import { CSSTransition } from "react-transition-group";

const appearDuration = 475;
const transitionName = `box`;

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

const PlaceholderDiv = styled.div`
    position: relative;
    display: grid;
    opacity: 80%;
    z-index: 1;
    &.${transitionName}-enter-active, &.${transitionName}-appear-active {
        animation: ${flicker} 0.5s linear;
    }
    &.${transitionName}-exit-active {
        animation: ${flicker} 0.5s linear reverse;
    }
    &.${transitionName}-exit-done {
        display: none;
    }
`

const TopBar = styled.div`
    border-top: 2px solid white;
    box-sizing: border-box;
    grid-area: 1/1;
    pointer-events: none;
    &.${transitionName}-enter-active, &.${transitionName}-appear-active {
        animation: ${appearTop} 0.5s linear;
    }
    &.${transitionName}-exit-active {
        animation: ${appearTop} 0.5s linear reverse;
    }
    &.${transitionName}-exit-done {
        display: none;
    }
`
const BottomBar = styled.div`
    border-bottom: 2px solid white;
    box-sizing: border-box;
    grid-area: 2/1;
    pointer-events: none;
    &.${transitionName}-enter-active, &.${transitionName}-appear-active {
        animation: ${appearBottom} 0.5s linear;
    }
    &.${transitionName}-exit-active {
        animation: ${appearBottom} 0.5s linear reverse;
    }
    &.${transitionName}-exit-done {
        display: none;
    }
`

const BoxContent = styled.div`
    padding: 1rem;
    margin: 1rem;
    background: #272727;
    grid-area: 1/1/3/1;
    &.${transitionName}-enter-active, &.${transitionName}-appear-active {
        animation: ${appearMiddle} 0.5s linear;
    }
    &.${transitionName}-exit-active {
        animation: ${appearMiddle} 0.5s linear reverse;
    }
    &.${transitionName}-exit-done {
        display: none;
    }
`

export function AnimatedBoxContainer(props) {
    const inProp = props.inProp;
    return (
        <CSSTransition appear={true} in={inProp} timeout={appearDuration} classNames={transitionName}>
            <PlaceholderDiv>
                <CSSTransition appear={true} in={inProp} timeout={appearDuration} classNames={transitionName}>
                <BoxContent>
                    {props.children}
                </BoxContent>
                </CSSTransition>
                <CSSTransition appear={true} in={inProp} timeout={appearDuration} classNames={transitionName}>
                <TopBar/>
                </CSSTransition>
                <CSSTransition appear={true} in={inProp} timeout={appearDuration} classNames={transitionName}>
                <BottomBar/>
                </CSSTransition>
            </PlaceholderDiv>
        </CSSTransition>
    );
}

export default AnimatedBoxContainer