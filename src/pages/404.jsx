import React from 'react'
import AnimatedBoxContainer from 'components/Box'

export default function NotFound() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    setReady(true)
  }, [])

  return ready ? (
    <AnimatedBoxContainer>
      <h1>404 - Oh no's! We couldn't find that page :(</h1>
    </AnimatedBoxContainer>
  ) : null
}