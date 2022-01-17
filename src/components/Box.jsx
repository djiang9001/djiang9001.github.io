import React from 'react'
import styled, { keyframes } from 'styled-components'
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
    &:hover {
        transition: opacity 0.5s;
        opacity: 100%;
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
    ${PlaceholderDiv}:hover & {
        background: linear-gradient(to bottom, white, transparent 0.5rem);
        background-clip: padding-box;
    }
`
const TopBarClickable = styled(TopBarStatic)`
    ${PlaceholderDiv}:hover & {
        transition: transform 0.5s;
        transform: translateY(0.5rem);
        background: linear-gradient(to bottom, white, transparent 1rem);
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
    ${PlaceholderDiv}:hover & {
        background: linear-gradient(to top, white, transparent 0.5rem);
        background-clip: padding-box;
    }
`
const BottomBarClickable = styled(BottomBarStatic)`
    ${PlaceholderDiv}:hover & {
        transition: transform 0.5s;
        transform: translateY(-0.5rem);
        background: linear-gradient(to top, white, transparent 1rem);
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

export function Box(props) {
    // props:
    //   state: Pass this prop to allow for animation: <Box state={props.state}>
    //   clickable: If true, will add hover and active animations
    //   Wrapper: Use to wrap the box in some element, eg. a Link or button to make the box clickable.
    //            Useful for cases where parent element needs to pass props to Box (eg. AnimatedBoxContainer)
    //   wrapperProps: A set of props to pass to the Wrapper
    const {
        state,
        clickable,
        Wrapper = React.Fragment,
        wrapperProps,
        ...restProps
    } = props;
    const TopBar = clickable ? <TopBarClickable className={`${transitionName}-${state}`}/> : <TopBarStatic className={`${transitionName}-${state}`}/>;
    const BottomBar = clickable ? <BottomBarClickable className={`${transitionName}-${state}`}/> : <BottomBarStatic className={`${transitionName}-${state}`}/>;
    return (
        <Wrapper {...wrapperProps}>
            <PlaceholderDiv className={`${transitionName}-${state}`}>
                <BoxContent className={`${transitionName}-${state}`} {...restProps}>
                    {props.children}
                </BoxContent>
                {TopBar}
                {BottomBar}
            </PlaceholderDiv>
        </Wrapper>
    );
}
export function AnimatedBox(props) {
    // A single animated box.
    const {
        inProp = true,
        appear = true,
        ...restProps
    } = props;
    return (
        <AnimatedBoxContainer appear={appear} inProp={inProp}>
            <Box {...restProps}>
                {props.children}
            </Box>
        </AnimatedBoxContainer>
    );
}

export function AnimatedBoxContainer(props) {
    // This is used to wrap multiple components (eg. Box) with a single Transition element.
    // It just passes the state prop to each child.
    // This is to facilitate page transitions (see routeRender in App.jsx)
    // since SwitchTransition accepts only one Transition child.
    // So if we have a page with multiple boxes that need to animate on route,
    // they need to all be children of a single Transition component.
    const {
        inProp = true,
        appear = true
    } = props;
    return (
        <Transition appear={appear} in={inProp} timeout={appearDuration} {...props}>
            {state => {
                const newChildren = React.Children.map(props.children, child => {
                    // Checking isValidElement is the safe way and avoids a typescript
                    // error too.
                    if (React.isValidElement(child)) {
                      return React.cloneElement(child, { state: state });
                    }
                    return child;
                  });
                return <>{newChildren}</>
            }}
        </Transition>
    );
}
