import React from 'react'
import { Box } from 'components/Box'

export default function NotFound(props) {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return ready ? (
    <Box state={props.state}>
      <h1>404 - Oh no's! We couldn't find that page :(</h1>
    </Box>
  ) : null
}