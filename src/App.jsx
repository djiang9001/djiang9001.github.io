import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { createGlobalStyle } from 'styled-components'
//
import { Link, Router } from 'components/Router'
import { SwitchTransition } from "react-transition-group";
import Dynamic from 'containers/Dynamic'
import { AnimatedNav } from 'components/Nav'
import { AnimatedBox, AnimatedBoxContainer } from 'components/Box'

//import './app.css'
const GlobalStyle = createGlobalStyle`
  * {
    scroll-behavior: smooth;
  }
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
    Helvetica, Arial, 'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
    background: black;//#303170;
    color: white;//#ffc6a0;
  }
  a {
    text-decoration: none;
    color: #108db8;
    font-weight: bold;
  }
  img {
    max-width: 100%;
  }
`

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function routeRender({routePath, getComponentForPath}) {
  // The routePath is used to retrieve the component for that path
  const element = getComponentForPath(routePath)
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
      <AnimatedNav>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/'}} clickable>Home</AnimatedBox>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/about'}} clickable>About</AnimatedBox>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/blog'}} clickable>Blog</AnimatedBox>
        <AnimatedBox Wrapper={Link} wrapperProps={{to:'/dynamic'}} clickable>Dynamic</AnimatedBox>
      </AnimatedNav>
      <React.Suspense fallback={<em></em>}>
          <Router>
            <Dynamic path="dynamic"/>
            <Routes path="*" render={routeRender}/>
          </Router>
      </React.Suspense>
    </Root>
  )
}

export default App
