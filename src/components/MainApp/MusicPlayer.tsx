import React, { useState } from 'react';
import Sound, { ReactSoundProps } from 'react-sound';
import "./../../pages/MainApp.css"

function MusicPlayer() {
  const [status, setStatus] = useState<ReactSoundProps['playStatus']>('STOPPED');
  const [url, setUrl] = useState('null')
  const [playingUrl, setPlayingUrl] = useState('null')

  function togglePlayStatus() {
    setStatus(status => status === 'PLAYING' ? 'PAUSED' : 'PLAYING')
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
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
          }}>
        <div>
          <Sound
              url={playingUrl}
              playStatus={status}
            />
          <form>
            <p>URL To play music from:</p>
            <input
              type="text"
              onChange={event => setUrl(event.target.value)}
            />
          <button style={{
            margin: '15px'
              }} className="button"
              onClick={() => setPlayingUrl(url)}
              type="button">
              Confirm
            </button>
          </form>
        </div>
        <div>
          <button className="button" onClick={togglePlayStatus}>
            {(status == 'PLAYING') ? "Pause" : "Play"}
          </button>
          <button className="button" onClick={stopPlaying}>Stop</button>
        </div>
      </div>
    );
}

export default MusicPlayer;
