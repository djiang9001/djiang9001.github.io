import type { FC } from 'react';

import { Box, Link, Typography } from '@mui/material';

import { Panel } from '@app/components/Panel';

import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const HomePage: FC = () => {

  return (
    <Panel>
      <Typography variant={"h4"} component="h1">
        Daniel Jiang
      </Typography>
      <Box sx={{ padding: 1, display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "100%" }}>
        <Link sx={{ display: "flex", justifyContent: "center" }} color="inherit" href="https://github.com/djiang9001" target="_blank" rel="noreferrer"><GitHubIcon/></Link>
        <Link sx={{ display: "flex", justifyContent: "center" }} color="inherit" href="https://www.linkedin.com/in/djiang9001" target="_blank" rel="noreferrer"><LinkedInIcon/></Link>
        <Link sx={{ display: "flex", justifyContent: "center" }} color="inherit" href="mailto:danieljng2005@gmail.com"><EmailIcon/></Link>
      </Box>
    </Panel>
  )
}