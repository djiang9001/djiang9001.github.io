import React from 'react'
import { Box } from 'components/Box'
import Content from 'components/Content'

export default function NotFound(props) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return ready ? (
    <Content>
    <Box state={props.state}>
      <h1>404 - Oh no's! We couldn't find that page :(</h1>
    </Box>
    </Content>
  ) : null
}