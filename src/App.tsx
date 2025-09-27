import { useRef } from 'react';
import { Container, CssBaseline, ThemeProvider } from '@mui/material';

import { setupTheme } from '@app/theme.ts';
import '@fontsource/old-standard-tt';

import { MainCanvas } from '@app/components/MainCanvas.tsx';

function App() {

  const theme = setupTheme();
  const ref = useRef<any>(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>
      <Container ref={ref} disableGutters maxWidth={false} sx={{ height: "100vh", width: "100vw", m: 0, padding: 0 }}>
        <MainCanvas eventSource={ref} eventPrefix="client"/>
      </Container>
    </ThemeProvider>
  )
}

export default App
