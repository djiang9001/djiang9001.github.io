import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Transition } from "react-transition-group";

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
const flickerTop = keyframes`
    0% {
        opacity: 50%;
    }
    75% {
        opacity: 50%;
    }
    85% {
        opacity: 100%;
        background: linear-gradient(to top, transparent, 80%, white);
    }
    95% {
        opacity: 50%;
        background: linear-gradient(to top, transparent, 80%, white);
    }
    100% {
        opacity: 80%;
        background: linear-gradient(to top, transparent, 80%, white);
    }
`
const flickerBottom = keyframes`
    0% {
        opacity: 50%;
    }
    75% {
        opacity: 50%;
    }
    85% {
        opacity: 100%;
        background: linear-gradient(to bottom, transparent, 80%, white);
    }
    95% {
        opacity: 50%;
        background: linear-gradient(to bottom, transparent, 80%, white);
    }
    100% {
        opacity: 80%;
        background: linear-gradient(to bottom, transparent, 80%, white);
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
    &.${transitionName}-entering {
        animation: ${flicker} 0.5s linear;
    }
    &.${transitionName}-exiting {
        animation: ${flicker} 0.5s linear reverse;
    }
    &.${transitionName}-exited {
        visibility: hidden;
    }
`

const TopBarStatic = styled.div`
    border-top: 2px solid white;
    box-sizing: border-box;
    grid-area: 1/1;
    pointer-events: none;
    &.${transitionName}-entering {
        animation: ${appearTop} 0.5s linear, ${flickerTop} 0.5s linear;
    }
    &.${transitionName}-exiting {
        animation: ${appearTop} 0.5s linear reverse, ${flickerTop} 0.5s linear reverse;
    }
    &.${transitionName}-exited {
        visibility: hidden;
    }
`
const TopBarClickable = styled(TopBarStatic)`
    ${PlaceholderDiv}:hover & {
        transition: transform 0.5s;
        transform: translateY(0.5rem);
        background: linear-gradient(to top, transparent, 80%, white);
        background-clip: padding-box;
    }
    ${PlaceholderDiv}:active & {
        transform: translateY(0);
        transition: none;
    }
`
const BottomBarStatic = styled.div`
    border-bottom: 2px solid white;
    box-sizing: border-box;
    grid-area: 2/1;
    pointer-events: none;
    &.${transitionName}-entering {
        animation: ${appearBottom} 0.5s linear, ${flickerBottom} 0.5s linear;
    }
    &.${transitionName}-exiting {
        animation: ${appearBottom} 0.5s linear reverse, ${flickerBottom} 0.5s linear reverse;
    }
    &.${transitionName}-exited {
        visibility: hidden;
    }
`
const BottomBarClickable = styled(BottomBarStatic)`
    ${PlaceholderDiv}:hover & {
        transition: transform 0.5s;
        transform: translateY(-0.5rem);
        background: linear-gradient(to bottom, transparent, 80%, white);
        background-clip: padding-box;
    }
    ${PlaceholderDiv}:active & {
        transform: translateY(0);
        transition: none;
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
    &.${transitionName}-entering {
        animation: ${appearMiddle} 0.5s linear;
    }
    &.${transitionName}-exiting {
        animation: ${appearMiddle} 0.5s linear reverse;
    }
    &.${transitionName}-exited {
        visibility: hidden;
    }
`

function Box(props) {
    const {
        state,
        clickable
    } = props;
    const TopBar = clickable ? <TopBarClickable className={`box-${state}`}/> : <TopBarStatic className={`box-${state}`}/>;
    const BottomBar = clickable ? <BottomBarClickable className={`box-${state}`}/> : <BottomBarStatic className={`box-${state}`}/>;
    return (
        <PlaceholderDiv className={`box-${state}`}>
            <BoxContent className={`box-${state}`}>
                {props.children}
            </BoxContent>
            {TopBar}
            {BottomBar}
        </PlaceholderDiv>
    );
}
export function AnimatedBoxContainer(props) {
    // inProp: true if you want to show the component
    // appear: true if you want the box to be visible on first mount
    // clickable: pass this prop to get animations on hover and click
    // Wrapper: component that you want to wrap the box in
    // wrapperProps: all other props, which are passed to the Wrapper component
    // restProps: additional props, passed to the Transition component
    const { 
        inProp = true,
        appear = true,
        clickable, 
        Wrapper = React.Fragment,
        wrapperProps,
        ...restProps
    } = props;
    return (
        <Transition appear={appear} in={inProp} timeout={appearDuration} {...restProps}>
            {state => (
                <Wrapper {...wrapperProps}>
                    <Box state={state} clickable={clickable}>
                        {props.children}
                    </Box>
                </Wrapper>
            )}
        </Transition>
    );
}

export default AnimatedBoxContainer