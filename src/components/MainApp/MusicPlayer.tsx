import { useState } from 'react';
import example_song_cover from './../../images/example-song-cover.jpeg';
import Sound, { ReactSoundProps } from 'react-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

const playButton = <FontAwesomeIcon icon={faPlayCircle} />
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />
const stopButton = <FontAwesomeIcon icon={faStopCircle} />

//Music Player Component.
function MusicPlayer(props: any): JSX.Element {
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
            <div className="player" style={{borderRadius:"0px 25px 0px 0px",backgroundColor:"rgba(0, 0, 0, 0.5)"}}>
                <img className='player-song-cover' src={example_song_cover} alt='Example_Song_Cover'></img>
                <div className="player-now-playing">
                    <h5>Now playing: Song Name</h5>
                    <div style={{display:"inline-block"}}>
                        <button className="player-button" onClick={togglePlayStatus}>{(status === 'PLAYING') ? pauseButton : playButton}</button>
                        <button className="player-button" onClick={stopPlaying}>{stopButton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
