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
            <div className="player">
                <div className="player-song-info">
                    <img className='player-song-info-cover' src={props.song_cover} alt='Example_Song_Cover'></img>
                    <div style={{display:'inline-block', margin:'auto', width:'10%', position:'relative', top:'10px'}}>
                        <p className="player-song-info-title">Song Title</p>
                        <p className="player-song-info-artist">Song Artist</p>
                    </div>
                </div>
                <div className="player-controls">
                    <div className="player-controls-buttons">
                    </div>
                    <div className="player-controls-progress-bar">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
