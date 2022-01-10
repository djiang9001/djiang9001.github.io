import React from 'react'
import { Box } from 'components/Box'

export default (props) => (
  <>
  <Box state={props.state}>
    <p>React Static is a progressive static site generator for React.</p>
  </Box>
  <div style={{ padding: '10vh 20vw 10vh 20vw' }}>
    <Box state={props.state}>
      <p>React Static is a progressive static site generator for React.</p>
    </Box>
  </div>
  <Box>
    <p>Not animated</p>
  </Box>
  </>
)
