import type { FC } from 'react';

import { Typography } from '@mui/material';

import { Panel } from '@app/components/Panel';

export const AboutPage: FC = () => {

  return (
    <Panel>
      <Typography variant={"h4"} component="h1">
        About
      </Typography>
      <Typography variant={"body2"}>
        Hi there. My name is Daniel Jiang. I am a software engineer. I enjoy solving problems, learning new things, and making stuff.
      </Typography>
    </Panel>
  )
}