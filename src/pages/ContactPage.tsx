import type { FC } from 'react';

import { Box, Link, Typography } from '@mui/material';

import { Panel } from '@app/components/Panel';

import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const ContactPage: FC = () => {

  return (
    <Panel sx={{ overflow: "visible" }}>
      <Typography variant={"h4"} component="h1">
        Contact
      </Typography>
      <Typography variant={"body2"} sx={{ width: "100%" }}>
        Ways to reach me:
      </Typography>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
        <EmailIcon/>
        <Link variant={"body2"} color="inherit" href="mailto:danieljng2005@gmail.com">danieljng2005@gmail.com</Link>
      </Box>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", width: "100%" }}>
        <LinkedInIcon/>
        <Link variant={"body2"} color="inherit" href="https://www.linkedin.com/in/djiang9001" target="_blank" rel="noreferrer">https://www.linkedin.com/in/djiang9001</Link>
      </Box>
    </Panel>
  )
}