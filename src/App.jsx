import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import { createGlobalStyle } from 'styled-components'
//
import { Link, Router, Location } from 'components/Router'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Dynamic from 'containers/Dynamic'
import Content from 'components/Content'
import { AnimatedNav } from 'components/Nav'
import AnimatedBoxContainer from 'components/Box'

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

function App() {
  return (
    <Root>
      <GlobalStyle/>
      <AnimatedNav>
        <AnimatedBoxContainer Wrapper={Link} to="/">Home</AnimatedBoxContainer>
        <AnimatedBoxContainer Wrapper={Link} to="/about">About</AnimatedBoxContainer>
        <AnimatedBoxContainer Wrapper={Link} to="/blog">Blog</AnimatedBoxContainer>
        <AnimatedBoxContainer topBarProps={{style: {background: 'red'}}} Wrapper={Link} to="/dynamic">Dynamic</AnimatedBoxContainer>
      </AnimatedNav>
      <React.Suspense fallback={<em>Loading...</em>}>
        <Router>
          <Dynamic path="dynamic" />
          <Routes path="*" />
        </Router>
      </React.Suspense>
    </Root>
  )
}

export default App
