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
    display: flex;
    justify-content: center;
    align-items: center;
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
/*
export function AnimatedBoxContainer(props) {
    const { inProp = true, clickable = true } = props;
    function clickBoxContent() {
        if (clickable) {
            console.log('click');
        }
    }
    return (
        <CSSTransition appear={true} in={inProp} timeout={appearDuration} classNames={transitionName}>
            <PlaceholderDiv {...(clickable ? {onClick: clickBoxContent} : {})}>
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
*/
export function AnimatedBoxContainer(props) {
    // inProp: true if you want the box to be visible on first mount
    // {ComponentName}Props: extra props to be passed to their respsective components
    // Wrapper: component that you want to wrap the box in
    // wrapperProps: all other props, which are passed to the Wrapper component
    const { 
        inProp = true,
        cssTransitionProps,
        placeholderDivProps,
        boxContentProps,
        topBarProps,
        bottomBarProps,
        Wrapper = React.Fragment,
        wrapperProps
    } = props;
    return (
        <Wrapper {...wrapperProps}>
            <CSSTransition appear={inProp} in={inProp} timeout={appearDuration} classNames={transitionName} {...cssTransitionProps}>
                <PlaceholderDiv {...placeholderDivProps}>
                    <CSSTransition appear={inProp} in={inProp} timeout={appearDuration} classNames={transitionName} {...cssTransitionProps}>
                    <BoxContent {...boxContentProps}>
                        {props.children}
                    </BoxContent>
                    </CSSTransition>
                    <CSSTransition appear={inProp} in={inProp} timeout={appearDuration} classNames={transitionName} {...cssTransitionProps}>
                    <TopBar {...topBarProps}/>
                    </CSSTransition>
                    <CSSTransition appear={inProp} in={inProp} timeout={appearDuration} classNames={transitionName} {...cssTransitionProps}>
                    <BottomBar {...bottomBarProps}/>
                    </CSSTransition>
                </PlaceholderDiv>
            </CSSTransition>
        </Wrapper>
    );
}

// Button box needs to: be wrapped in a button, the button needs to send click event to parent and children
// We should move the menu button into Nav completely
// Then it should be easy to send props to BoxContent on click.

export default AnimatedBoxContainer