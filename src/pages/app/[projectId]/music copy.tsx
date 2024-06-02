import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Importando ReactPlayer dinamicamente sem SSR
const ReactPlayer = dynamic(() => import('react-player/youtube'), { ssr: false });

export default function PlayerMusicYT({ url, playing = true, mutedAudio, volume = 1 }: any) {


  return (
    <div style={{marginTop: 45}}>
      <ReactPlayer
        url={url}
        playing={playing}
        volume={volume}
        muted={mutedAudio}
      />
    </div>
  );
}
