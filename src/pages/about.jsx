import React from 'react'
import { Box } from 'components/Box'
import Content from 'components/Content'
export default (props) => (
  <Content>
  <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridGap: '1rem' }}>
  <Box state={props.state}>
      <h1>About Me</h1>
  </Box>
  <Box style={{ padding: '10% 10% 10% 10%', flexDirection: 'column'}} state={props.state}>
    <p>
      Hi. My name is Daniel Jiang. I'm a software developer currently studying at the University of Waterloo.
      I'm expecting to complete my BMath degree (double major in Computer Science and Combinatorics and Optimization, minor in Statistics)
      at the end of the 2023 winter term.
    </p>
  </Box>
  <Box state={props.state}>
      <h1>About This Site</h1>
  </Box>
  <Box style={{ padding: '10% 10% 10% 10%', flexDirection: 'column'}} state={props.state}>
    <p>
      This is my personal website. It is built on React, in particular 
      using <a href='https://github.com/react-static/react-static' target='_blank'>React-Static</a>.
      Other libraries that were used include <a href='https://styled-components.com/' target='_blank'>styled-components</a> and <a href='https://reactcommunity.org/react-transition-group/' target='_blank'>React Transition Group</a> for styling and CSS animations,
      and <a href='https://github.com/pmndrs/react-three-fiber' target='_blank'>react-three-fiber</a> and <a href='https://threejs.org/' target='_blank'>Three.js</a> for the animated background.
    </p>
    <p>
      The source code can be found on <a href='https://github.com/djiang9001/djiang9001.github.io/' target='_blank'>GitHub</a>.
    </p>
  </Box>
  </div>
  </Content>
)
