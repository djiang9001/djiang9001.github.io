import type { FC } from 'react';

import { Box, Link, Typography } from '@mui/material';

import { Panel } from '@app/components/Panel';

export const ProjectsPage: FC = () => {

  return (
    <Panel>
      <Typography variant={"h4"} component="h1">
        Projects
      </Typography>
      <Typography variant={"body2"} sx={{ width: "100%" }}>
        Some things that I've made:
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"} component="h2">
          Word Vector Visualizer
        </Typography>
        <Typography variant={"body2"} sx={{ marginLeft: 2 }}>
          A web application for plotting word vectors in 3D relative to other word vectors.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginLeft: 2 }}>
          <Link variant={"body2"} color="inherit" href="https://github.com/djiang9001/word_vector_visualizer" target="_blank" rel="noreferrer">Github</Link>
          <Link variant={"body2"} color="inherit" href="https://djiang9001.github.io/word_vector_visualizer" target="_blank" rel="noreferrer">Demo</Link>
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"} component="h2">
          This Website
        </Typography>
        <Typography variant={"body2"} sx={{ marginLeft: 2 }}>
          A personal website built using React and React Three Fiber.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, marginLeft: 2 }}>
          <Link variant={"body2"} color="inherit" href="https://github.com/djiang9001/djiang9001.github.io" target="_blank" rel="noreferrer">Github</Link>
          <Link variant={"body2"} color="inherit" href="https://djiang9001.github.io" target="_blank" rel="noreferrer">Demo</Link>
        </Box>
      </Box>
      <Typography variant={"body2"} sx={{ width: "100%" }}>
        See my <Link variant={"body2"} color="inherit" href="https://github.com/djiang9001" target="_blank" rel="noreferrer">Github</Link> for more things I've made.
      </Typography>
    </Panel>
  )
}