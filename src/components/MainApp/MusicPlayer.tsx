import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStopCircle, faStepBackward, faStepForward, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'

const stepBackward = <FontAwesomeIcon icon={faStepBackward} />
const stepForward = <FontAwesomeIcon icon={faStepForward} />
const forward = <FontAwesomeIcon icon={faForward} />
const backward = <FontAwesomeIcon icon={faBackward} />
const playCircle = <FontAwesomeIcon icon={faPlayCircle} />
const pauseCircle = <FontAwesomeIcon icon={faPauseCircle} />
const stop = <FontAwesomeIcon icon={faStopCircle} />

//Music Player Component.
function MusicPlayer(props: any): JSX.Element {
    const [progress, setProgress] = useState(0)

    let min = 0
    let max = 90

    return (
        <div>
            <div className="player">
                <div style={{ display: 'inline-block' }}>
                    <img className='player-song-info-cover' src={props.song_cover} alt='Example_Song_Cover'></img>
                    <div style={{ display: 'inline-block', margin: 'auto', width: '15%', position: 'relative', top: '10px' }}>
                        <p className="player-song-info-title">Song Title</p>
                        <p className="player-song-info-artist">Song Artist</p>
                    </div>
                </div>
                <div className="player-controls">
                    <div className="player-controls-buttons">
                        <button className="player-controls-button-misc">{stepBackward}</button>
                        <button className="player-controls-button-misc">{backward}</button>
                        <button className="player-controls-button-play">{playCircle}</button>
                        <button className="player-controls-button-misc">{forward}</button>
                        <button className="player-controls-button-misc">{stepForward}</button>
                    </div>
                    <div className="player-controls-progress-bar">
                        <p className="player-progress">{(max-progress) > 60 ? progress / 60 : progress}</p>
                        <div className="slidecontainer">
                            <input type="range" min={min} max={max} value={progress} className="slider" style={{backgroundSize:(progress - min) * 100 / (max - min) + '% 100%'}} onInput={(event: any) => setProgress(event.currentTarget.value)} />
                        </div>
                            <p className="player-progress">1:30</p>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default MusicPlayer;
