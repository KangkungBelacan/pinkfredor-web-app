import { useState } from 'react';
import example_song_cover from './../../images/example-song-cover.jpeg';
import Sound, { ReactSoundProps } from 'react-sound';
import Playlist from './Playlist'

//Music Player Component.
function MusicPlayer(): JSX.Element {
    //Control whether the song is playing or not.
    const [status, setStatus] = useState<ReactSoundProps['playStatus']>('STOPPED');
    //User textbox input.
    const [input, setInput] = useState('null')
    //URL of the song currently playing.
    const [playingUrl, setPlayingUrl] = useState('null')

    //Toggle song playing status.
    function togglePlayStatus() {
        setStatus(status === 'PLAYING' ? 'PAUSED' : 'PLAYING')
    }

    //Stop playing the song.
    function stopPlaying() {
        setStatus('STOPPED')
    }

    return (
        <div>
            <Sound url={playingUrl} playStatus={status}/>
            <Playlist />
            <div className="player" style={{backgroundColor:"white"}}>
                <img className='player-song-cover' src={example_song_cover} alt='Example_Song_Cover'></img>
                <div className="player-now-playing">
                    <h5>Now playing: Song Name</h5>
                    <div style={{display:"inline-block"}}>
                        <button onClick={togglePlayStatus}>{(status === 'PLAYING') ? 'Pause' : 'Play'}</button>
                        <button onClick={stopPlaying}>Stop</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
