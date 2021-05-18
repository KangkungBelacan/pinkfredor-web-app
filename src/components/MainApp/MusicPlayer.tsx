import { useState } from 'react';
import example_song_cover from './../../images/example-song-cover.jpeg';
import Sound, { ReactSoundProps } from 'react-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

const playButton = <FontAwesomeIcon icon={faPlayCircle} />
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />
const stopButton = <FontAwesomeIcon icon={faStopCircle} />

interface SongsProperties {
    id: number;
    url: string;
}

interface Element {

}

var songs = new Array<SongsProperties>();

//Music Player Component.
function MusicPlayer(props: any): JSX.Element {
    const checkCircle = <FontAwesomeIcon icon={faCheckCircle} />
    //Control whether the song is playing or not.
    const [status, setStatus] = useState<ReactSoundProps['playStatus']>('STOPPED');
    //URL of the song currently playing.
    const [playingUrl, setPlayingUrl] = useState('null')

    const [inputValue, setInputValue] = useState('')

    const [playlist, setPlaylist] = useState<Element>([])

    //Toggle song playing status.
    function togglePlayStatus() {
        setStatus(status === 'PLAYING' ? 'PAUSED' : 'PLAYING')
    }

    //Stop playing the song.
    function stopPlaying() {
        setStatus('STOPPED')
    }

    function updateSongsList() {
        let songsList = songs.map((song) => <p key={song.id}> {(song.id + 1) + ' | ' + song.url} </p>);
        setPlaylist(songsList)
    }

    function setDemoPlaylist() {
        songs = [
            {
                id: 0,
                url: 'https://www.kozco.com/tech/piano2.wav'
            },
            {
                id: 1,
                url: 'https://www.kozco.com/tech/WAV-MP3.wav'
            },
            {
                id: 2,
                url: 'https://www.kozco.com/tech/organfinale.mp3'
            },
            {
                id: 3,
                url: 'https://www.kozco.com/tech/32.mp3'
            },
            {
                id: 4,
                url: 'https://www.kozco.com/tech/c304-2.wav'
            }
        ]

        updateSongsList()
        setPlayingUrl(songs[0].url)
    }

    function addSong() {
        let newSongs = [
            ...songs,
            {
                id: songs.length,
                url: inputValue
            }

        ]
        songs = newSongs;

        setInputValue('')
        updateSongsList()

        if (songs.length === 1 && status != 'PLAYING') {
            setPlayingUrl(songs[0].url)
            // togglePlayStatus()
        }
    }

    function removeFirstSong() {
        songs.shift()
        let i;
        for (i = 0; i < songs.length; i++) {
            songs[i].id -= 1
        }
    }

    function playNextSong() {
        if (songs.length === 1) {
            removeFirstSong()
            setStatus('STOPPED')
            updateSongsList()
            return
        }
        else if (songs.length === 0) {
            return
        }
        else {
            removeFirstSong()
            setPlayingUrl(songs[0].url)
            updateSongsList()
        }
    }

    return (
        <div>
            {/*https://www.npmjs.com/package/react-sound*/}
            <Sound url={playingUrl} playStatus={status} autoLoad={true} onFinishedPlaying={playNextSong} onError={playNextSong} />
            <div>
                <div style={{ display: 'inline-block' }}>
                    <button style={{ marginLeft: '5px', marginRight: '5px' }} onClick={setDemoPlaylist}>Set Demo Playlist</button>
                    <input value={inputValue} onChange={(event) => setInputValue(event.currentTarget.value)} />
                    <button onClick={addSong} className='player-button' style={{ marginLeft: '5px' }}>{checkCircle}</button>
                </div>
                <div>
                    <h1 className="playlist">Playlist:</h1>
                    <div>
                        {playlist}
                    </div>
                </div>
            </div>
            <div className="player" style={{ borderRadius: "0px 25px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <img className='player-song-cover' src={example_song_cover} alt='Example_Song_Cover'></img>
                <div className="player-now-playing">
                    <h5>Now playing: {playingUrl === 'null' ? 'No songs playing.' : playingUrl}</h5>
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
