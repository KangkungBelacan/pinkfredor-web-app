import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStepBackward, faStepForward, faForward, faBackward, faBars, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { useWindowSize } from "../../global-imports";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import Sound, { ReactSoundProps } from "react-sound";

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
    const [width] = useWindowSize();
    const [playing, setPlaying] = useState(false);
    const [maxDuration, setMaxDuration] = useState("0:00");
    const {
        status, setStatus, 
        nowPlayingURL, setNowPlayingURL,
        progress, setProgress,
        volume, setVolume,
        queue, setQueue
    } = React.useContext(MusicPlayerContext);

    const play_song = () => {
        if(!playing) {
            setNowPlayingURL(`/api/driveapi/files/download?token=${localStorage.token}&fileid=1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu`);
            setStatus("PLAYING");
        }
        setPlaying(!playing);
    };

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
            <Sound  
                url={nowPlayingURL}
                playStatus={status}
                autoLoad={true}
                onLoading={(args?:any) => {
                    setMaxDuration(format(args.duration / 1000));
                }}
                onPlaying={(args?:any) => {
                    // console.log(args);
                    setProgress(Math.round(args.position / args.duration * 100))
                }}
                onFinishedPlaying={() => {setStatus("PAUSED")}}
                onError={() => {}}
                volume={volume}
                />
            <div className="player-root">
                <div className="player" style={{boxShadow: width >= 768 ? "" : `${-width + (width*progress/100)}px -2px red`}}>
                    {/* <div className='player-song-info' style={{ display: 'flex', alignItems: 'center', flexGrow: 1, flexBasis: 0 }}> */}
                    <div className='player-song-info col-md-3 col-7'>
                        <img className='player-song-info-cover' src={props.song_cover} alt='Example_Song_Cover'></img>
                        <div style={{display: "inline-block", paddingLeft: "10px"}}>
                            <p className="player-song-info-title">Song Title</p>
                            <p className="player-song-info-artist">Song Artist</p>
                        </div>
                    </div>
                    <div className="player-controls col-md-6 col-3">
                        <div className="player-controls-buttons">
                            <button className="player-controls-button-misc d-md-inline-block d-none">{stepBackward}</button>
                            <button className="player-controls-button-misc d-md-inline-block d-none">{backward}</button>
                            <button className="player-controls-button-play" onClick={play_song}>{playing === true ? pauseCircle : playCircle}</button>
                            <button className="player-controls-button-misc d-md-inline-block d-none">{forward}</button>
                            <button className="player-controls-button-misc">{stepForward}</button>
                            <button className="player-controls-button-misc d-md-none d-inline-block">{bars}</button>
                        </div>
                        <div className="player-controls-progress-bar d-md-flex d-none">
                            <p className="player-progress">{format(progress)}</p>
                            <div className="player-progress-slider-container">
                                <input type="range" min={min} max={max} value={progress} className="player-progress-slider" style={{ backgroundSize: (progress - min) * 100 / (max - min) + '% 100%' }} onInput={(event: any) => setProgress(event.currentTarget.value)} />
                            </div>
                            <p className="player-progress">{maxDuration}</p>
                        </div>
                    </div>
                    <div className="player-misc-controls col-md-3 d-md-flex d-none" style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <button className="player-controls-button-misc">{bars}</button>
                        <div className="player-misc-controls-volume-slider-container">
                            <input type="range" min='0' max='100' value={volume} onChange={(evt) => {setVolume(parseInt(evt.target.value))}} className="player-misc-controls-volume-slider" style={{ backgroundSize: (volume - 0) * 100 / (100 - 0) + '% 100%' }} onInput={(event: any) => setVolume(event.currentTarget.value)} />
                        </div>
                        <p style={{ color: 'white', fontSize: '15px', margin:'0 5px'}}>{volumeUp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
