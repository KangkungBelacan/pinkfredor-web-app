import { useState } from 'react';
import example_song_cover from './../../images/example-song-cover.jpeg';
import Sound, { ReactSoundProps } from 'react-sound';
import Song from './Song'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

const playButton = <FontAwesomeIcon icon={faPlayCircle} />
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />
const stopButton = <FontAwesomeIcon icon={faStopCircle} />

interface SongsProperties {
    id: number;
    url: string;
}

//Music Player Component.
function MusicPlayer(props: any): JSX.Element {
    const checkCircle = <FontAwesomeIcon icon={faCheckCircle} />
    //Control whether the song is playing or not.
    const [status, setStatus] = useState<ReactSoundProps['playStatus']>('STOPPED');
    //User textbox input.
    const [input, setInput] = useState('null')
    //URL of the song currently playing.
    const [playingUrl, setPlayingUrl] = useState('null')

    const [songs, setSongs] = useState<SongsProperties[]>([]);

    const [inputValue, setInputValue] = useState('')

    //Toggle song playing status.
    function togglePlayStatus() {
        setStatus(status === 'PLAYING' ? 'PAUSED' : 'PLAYING')
    }

    //Stop playing the song.
    function stopPlaying() {
        setStatus('STOPPED')
    }

    function addSong() {
        if (songs.length === 0) {
            let newSongs = [
                {
                    id: songs.length,
                    url: inputValue
                },
            ]
            setSongs(newSongs);
        }

        else {
            let newSongs = [
                ...songs,
                {
                    id: songs.length,
                    url: inputValue
                }

            ]
            setSongs(newSongs);

        }

        setInputValue('')

        console.log(songs[0])
    }

    let songsList = songs.map((song) => <Song key={song.id} index={song.id + 1} song_name={song.url} />);

    return (
        <div>
            <Sound url={playingUrl} playStatus={status} autoLoad={true} />
            <div>
                <div style={{ display: 'inline-block' }}>
                    <input value={inputValue} onChange={(event) => setInputValue(event.currentTarget.value)} />
                    <button onClick={addSong} className='player-button' style={{ marginLeft: '5px' }}>{checkCircle}</button>
                </div>
                <div>
                    <h1 className="playlist">Playlist:</h1>
                    <div>
                        {songsList}
                    </div>
                </div>
            </div>
            <div className="player" style={{ borderRadius: "0px 25px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <img className='player-song-cover' src={example_song_cover} alt='Example_Song_Cover'></img>
                <div className="player-now-playing">
                    <h5>Now playing: Song Name</h5>
                    <div style={{ display: "inline-block" }}>
                        <button className="player-button" onClick={togglePlayStatus}>{(status === 'PLAYING') ? pauseButton : playButton}</button>
                        <button className="player-button" onClick={stopPlaying}>{stopButton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
