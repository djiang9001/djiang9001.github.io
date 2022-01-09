import React from 'react'

export default () => (
  <div>
    This is a dynamic page! It will not be statically exported, but is available
    at runtime
  </div>
)

/*
export default function () {
  return (
    <SwitchTransition mode={'out-in'}>
      <AnimatedBoxContainer key={routePath}>
      <div>
        This is a dynamic page! It will not be statically exported, but is available
        at runtime
      </div>
      </AnimatedBoxContainer>
    </SwitchTransition>
  );
}
*/
