import type { FC } from 'react';

import { Box, Link, Typography } from '@mui/material';

import { Panel } from '@app/components/Panel';

import Resume from '@app/assets/resume.pdf'

export const CareerPage: FC = () => {

  return (
    <Panel>
      <Typography variant={"h4"} component="h1">
        Career
      </Typography>
      <Typography variant={"body2"}>
        A brief overview of my professional experience. Download my full resume <Link color="inherit" href={Resume} target="_blank" rel="noreferrer">here</Link>.
      </Typography>

      <Typography variant={"h5"} component="h2">
        Overview
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"}>
          Yugabyte
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant={"body2"}>
            Software Engineer
          </Typography>
          <Typography variant={"body2"}>
            2023-2025
          </Typography>
        </Box>
        <Typography variant={"body2"}>
          Mainly worked on a <Link color="inherit" href={"https://github.com/yugabyte/yugabyte-db/tree/master/yugabyted-ui"} target="_blank" rel="noreferrer">UI dashboard</Link> for YugabyteDB with React/Typescript front end and Go back end.
        </Typography>
      </Box>
            <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"}>
          Yugabyte
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant={"body2"}>
            Software Engineer Co-op
          </Typography>
          <Typography variant={"body2"}>
            2022
          </Typography>
        </Box>
      </Box>


      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"}>
          NextRoll
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant={"body2"}>
            Software Engineer Co-op
          </Typography>
          <Typography variant={"body2"}>
            2021
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"}>
          Fundserv
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant={"body2"}>
            Software Engineer Co-op
          </Typography>
          <Typography variant={"body2"}>
            2021
          </Typography>
        </Box>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"}>
          FLIR Systems
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between"}}>
          <Typography variant={"body2"}>
            Applications Test Associate Co-op
          </Typography>
          <Typography variant={"body2"}>
            2019
          </Typography>
        </Box>
      </Box>

      <Typography variant={"h5"} component="h2">
        Education
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Typography variant={"body1"}>
          University of Waterloo
        </Typography>
        <Typography variant={"body2"}>
          Bachelor of Mathematics (May 2023)
        </Typography>
        <Typography variant={"body2"} sx={{ marginLeft: 2 }}>
          Major in Computer Science<br/>
          Major in Combinatorics and Optimization<br/>
          Minor in Statistics<br/>
        </Typography>
      </Box>

      <Typography variant={"h5"} component="h2">
        Skills
      </Typography>
      <Box>
        <Typography variant={"body1"}>
          Languages
        </Typography>
        <Typography variant={"body2"} sx={{ marginLeft: 2 }}>
          Go, Typescript, Javascript, Java, C++, C, Python, HTML, CSS, R, GDScript
        </Typography>
      </Box>
      <Box>
        <Typography variant={"body1"}>
          Frameworks/Tools
        </Typography>
        <Typography variant={"body2"} sx={{ marginLeft: 2 }}>
          React, Vite, MUI, Docker, Node.js, RMarkdown, WebAssembly, Three.js, Godot
        </Typography>
      </Box>
    </Panel>
  )
}