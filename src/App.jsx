import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
import styled, { createGlobalStyle } from 'styled-components'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'
import Content from 'components/Content'
import Nav from 'components/Nav'
import Box from 'components/Box'

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
    background: #303170;
    color: #ffc6a0;
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
      <Nav>
        <Box><Link to="/">Home</Link></Box>
        <Box><Link to="/about">About</Link></Box>
        <Box><Link to="/blog">Blog</Link></Box>
        <Box><Link to="/dynamic">Dynamic</Link></Box>
        <Box>Menu Icon Here</Box>
      </Nav>
      <Content>
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </Content>
    </Root>
  )
}

export default App