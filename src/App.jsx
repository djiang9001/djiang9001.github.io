import React, { useState, useEffect } from 'react'
import { Root, Routes } from 'react-static'
import { createGlobalStyle } from 'styled-components'
//
import { Link, Router, Wrap } from 'components/Router'
import { SwitchTransition, Transition } from "react-transition-group";
import { AnimatedNav } from 'components/Nav'
import { AnimatedBox, AnimatedBoxContainer } from 'components/Box'
import { Background, newPoints } from 'components/BackgroundCanvas'

const GlobalStyle = createGlobalStyle`
  * {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 18px;
    margin: 0;
    padding: 0;
    background: black;
    color: white;
  }
  a {
    text-decoration: none;
    color: #00C8C8;
    font-weight: bold;
    &:hover {
      color: cyan;
    }
  }
  img {
    max-width: 100%;
  }
`

function routeRender({routePath, getComponentForPath}) {
  // The routePath is used to retrieve the component for that path
  const element = getComponentForPath(routePath);
  newPoints();
  return (
    <SwitchTransition mode={'out-in'}>
      <AnimatedBoxContainer key={routePath}>
        {element}
      </AnimatedBoxContainer>
    </SwitchTransition>
  );
}

function App() {
  return (
    <Root>
      <GlobalStyle/>
      <Background/>
      <AnimatedNav>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/'}} clickable>Home</AnimatedBox>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/about'}} clickable>About</AnimatedBox>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/projects'}} clickable>Projects</AnimatedBox>
      </AnimatedNav>
      <Wrap>
        <React.Suspense fallback={<em></em>}>
          <Routes render={routeRender}/>
        </React.Suspense>
      </Wrap>
    </Root>
  )
}

export default App
