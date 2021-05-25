import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStepBackward, faStepForward, faForward, faBackward, faBars, faVolumeUp } from '@fortawesome/free-solid-svg-icons'

const stepBackward = <FontAwesomeIcon icon={faStepBackward} />
const stepForward = <FontAwesomeIcon icon={faStepForward} />
const forward = <FontAwesomeIcon icon={faForward} />
const backward = <FontAwesomeIcon icon={faBackward} />
const playCircle = <FontAwesomeIcon icon={faPlayCircle} />
const pauseCircle = <FontAwesomeIcon icon={faPauseCircle} />
const bars = <FontAwesomeIcon icon={faBars} />
const volumeUp = <FontAwesomeIcon icon={faVolumeUp} />

//Music Player Component.
function MusicPlayer(props: any): JSX.Element {
    const [playing, setPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(100)

    let min = 0
    let max = 90

    function format(time: any) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }

    return (
        <div>
            <div className="player-root">
                <div className="player">
                    <div className='player-song-info' style={{ display: 'flex', alignItems: 'center', flexGrow: 1, flexBasis: 0 }}>
                        <img className='player-song-info-cover' src={props.song_cover} alt='Example_Song_Cover'></img>
                        <div>
                            <p className="player-song-info-title">Song Title</p>
                            <p className="player-song-info-artist">Song Artist</p>
                        </div>
                    </div>
                    <div className="player-controls">
                        <div className="player-controls-buttons">
                            <button className="player-controls-button-misc">{stepBackward}</button>
                            <button className="player-controls-button-misc">{backward}</button>
                            <button className="player-controls-button-play" onClick={() => setPlaying(!playing)}>{playing === true ? pauseCircle : playCircle}</button>
                            <button className="player-controls-button-misc">{forward}</button>
                            <button className="player-controls-button-misc">{stepForward}</button>
                        </div>
                        <div className="player-controls-progress-bar">
                            <p className="player-progress">{format(progress)}</p>
                            <div className="player-progress-slider-container">
                                <input type="range" min={min} max={max} value={progress} className="player-progress-slider" style={{ backgroundSize: (progress - min) * 100 / (max - min) + '% 100%' }} onInput={(event: any) => setProgress(event.currentTarget.value)} />
                            </div>
                            <p className="player-progress">1:30</p>
                        </div>
                    </div>
                    <div className="player-misc-controls" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', alignContent:'center' ,flexGrow: 1, flexBasis: 0, flexDirection: 'row'}}>
                        <button className="player-controls-button-misc">{bars}</button>
                        <div className="player-misc-controls-volume-slider-container">
                            <input type="range" min='0' max='100' value={volume} className="player-misc-controls-volume-slider" style={{ backgroundSize: (volume - 0) * 100 / (100 - 0) + '% 100%' }} onInput={(event: any) => setVolume(event.currentTarget.value)} />
                        </div>
                        <p style={{ color: 'white', fontSize: '15px', margin:'0 5px'}}>{volumeUp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
