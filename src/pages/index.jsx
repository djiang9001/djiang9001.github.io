import React from 'react'
import { Box } from 'components/Box'

export default (props) => (
  <div style={{ padding: '10vh 20vw 10vh 20vw' }}>
    <Box state={props.state}>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to React-Static</h1>
      </div>
    </Box>
  </div>
)
