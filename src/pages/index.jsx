import React from 'react'
import { AnimatedBox, Box } from 'components/Box'
import Content from 'components/Content'
import { Link, Router } from 'components/Router'

export default (props) => (
  <>
  <Content>
    <Box style={{ fontSize: '2rem' }} state={props.state}>
      <h1>Daniel Jiang</h1>
    </Box>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridGap: '1rem', marginTop: '1rem' }}>
      <Box state={props.state} Wrapper={'a'} wrapperProps={{href:'https://github.com/djiang9001', target:'_blank'}} clickable>
        <h3>GitHub</h3>
      </Box>
      <Box state={props.state} Wrapper={'a'} wrapperProps={{href:'https://www.linkedin.com/in/djiang9001', target:'_blank'}} clickable>
        <h3>LinkedIn</h3>
      </Box>
      <Box state={props.state} Wrapper={'a'} wrapperProps={{href:'https://djiang9001.github.io/res/Daniel_Jiang_Resume.pdf', target:'_blank'}} clickable>
        <h3>Resume</h3>
      </Box>
    </div>
  </Content>
  </>
)
