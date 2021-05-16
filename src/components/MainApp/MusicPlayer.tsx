import { useState } from 'react';
import Sound, { ReactSoundProps } from 'react-sound';
import "./../../pages/App/App.css";

//Music Player Component.
function MusicPlayer() {
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
        setStatus("STOPPED")
    }

    return (
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            <div>
                {/*Sound module*/}
                <Sound
                    url={playingUrl}
                    playStatus={status}
                />
                <form>
                    <p>URL To play music from:</p>
                    <input
                        type="text"
                        onChange={event => setInput(event.target.value)}
                    />
                    <button style={{
                        margin: '15px'
                    }} className="button"
                        onClick={() => setPlayingUrl(input)}
                        type="button">
                        Confirm
            </button>
                </form>
            </div>
            <div>
                <button className="button" onClick={togglePlayStatus}>
                    {(status === 'PLAYING') ? "Pause" : "Play"}
                </button>
                <button className="button" onClick={stopPlaying}>Stop</button>
            </div>
        </div>
    );
}

export default MusicPlayer;
