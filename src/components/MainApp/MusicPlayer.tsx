import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons'

const playButton = <FontAwesomeIcon icon={faPlayCircle} />
const pauseButton = <FontAwesomeIcon icon={faPauseCircle} />
const stopButton = <FontAwesomeIcon icon={faStopCircle} />

//Music Player Component.
function MusicPlayer(props:any): JSX.Element {

    return (
        <div>
            <div className="player" style={{ borderRadius: "0px 25px 0px 0px", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <img className='player-song-cover' src={props.song_cover} alt='Example_Song_Cover'></img>
                <div className="player-now-playing">
                    <h5>Now playing: Song Name</h5>
                    <div style={{ display: "inline-block" }}>
                        <button className="player-button">{(status === 'PLAYING') ? pauseButton : playButton}</button>
                        <button className="player-button">{stopButton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
