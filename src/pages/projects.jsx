import React from 'react'
import { Box } from 'components/Box'
import Content from 'components/Content'

function Project (props) {
  const {
    name,
    desc,
    demoLink,
    gitLink
  } = props;
  return (
    <Box style={{ flexDirection: 'column' }} state={props.state}>
        <h3>{name}</h3>
        <p>{desc}</p>
        {demoLink && <a style={{display: 'inline-block', marginBottom: '1rem' }} href={demoLink} target='_blank'>Demo</a>}
        {gitLink && <a style={{display: 'inline-block', marginBottom: '1rem' }} href={gitLink} target='_blank'>GitHub</a>}
        {props.children}
    </Box>
  );
}

export default (props) => (
  <Content>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto', gridGap: '1rem' }}>
      <Box state={props.state}>
        <h1>Projects</h1>
      </Box>
      <Box state={props.state}>
        <p>Here are some personal side projects I have done. Check my <a href='https://github.com/djiang9001/' target='_blank'>GitHub</a> for more.</p>
      </Box>
      <Project state={props.state}
      name={'Youtube Video Downloader'}
      desc={'A web application for downloading media from Youtube.'}
      demoLink={'https://djiang9001.github.io/client_side_youtube_downloader/'}
      gitLink={'https://github.com/djiang9001/client_side_youtube_downloader/'}/>
      <Project state={props.state}
      name={'WaveformPlayer'}
      desc={'A terminal based application for playing and visualizing WAV files.'}
      demoLink={'https://djiang9001.github.io/sound_project/'}
      gitLink={'https://github.com/djiang9001/sound_project/'}/>
      <Project state={props.state}
      name={'This Website'}
      desc={'A personal website built using React.'}
      demoLink={'/'}
      gitLink={'https://github.com/djiang9001/djiang9001.github.io/'}/>
    </div>
  </Content>
)
