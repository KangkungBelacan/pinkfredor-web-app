import React, { useState } from 'react';
import Sound, { ReactSoundProps } from 'react-sound';

function MusicPlayer() {
  const [status, setStatus] = useState<ReactSoundProps['playStatus']>('STOPPED');

  function togglePlayStatus() {
    setStatus(status => status === 'PAUSED' ? 'PLAYING' : 'PAUSED')
  }

  function stopPlaying() {
    setStatus(status => status = 'STOPPED')
  }

  function statusLabel(status: ReactSoundProps['playStatus']): string {
    switch(status) {
      case 'STOPPED':
        return 'PLAY';
      case 'PLAYING':
        return 'STOP';
      default:
        return 'STOP';
    }
  }
    return (
      <div>
        <Sound
            url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
            playStatus={status}
          />
        <button onClick={togglePlayStatus}>Play/Pause</button>
        <button onClick={stopPlaying}>Stop</button>
      </div>
    );
}

export default MusicPlayer;
