import React, { useEffect, useState } from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { createGlobalStyle } from 'styled-components'
//
import { Link, Router } from 'components/Router'
import { SwitchTransition } from "react-transition-group";
import Dynamic from 'containers/Dynamic'
import { AnimatedNav } from 'components/Nav'
import { AnimatedBox, AnimatedBoxContainer } from 'components/Box'
//import { Background } from 'components/Background'
import { Background, newPoints } from 'components/BackgroundCanvas'

//import './app.css'
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

// Any routes that start with 'dynamic' will be treated as non-static routes
//addPrefetchExcludes(['dynamic'])

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
        {/*<AnimatedBox Wrapper={Link} wrapperProps={{to:'/dynamic'}} clickable>Dynamic</AnimatedBox>*/}
      </AnimatedNav>
      <React.Suspense fallback={<em></em>}>
          <Router>
            {/*<Dynamic path="dynamic"/>*/}
            <Routes path="*" render={routeRender}/>
          </Router>
      </React.Suspense>
    </Root>
  )
}

export default App
