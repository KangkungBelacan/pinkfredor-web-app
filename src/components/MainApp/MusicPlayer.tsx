import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPauseCircle, faStepBackward, faStepForward, faForward, faBackward, faBars, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { useWindowSize } from "../../global-imports";
import MusicPlayerContext from "../../context/MusicPlayerContext";
import Sound, { ReactSoundProps } from "react-sound";
import VolumeBar from './MusicPlayerSubComponent/VolumeBar';

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
    const [playingTitle, setPlayingTitle] = useState("Song Title");
    const [playingArtist, setPlayingArtist] = useState("Song Artist");
    // const [currentPos, setCurrentPos] = useState("0:00");
    const [maxDuration, setMaxDuration] = useState("0:00");
    const [progressSlidermin]  = useState(0);
    const [progressSlidermax, setProgressSlidermax]  = useState(1);
    const {
        status, setStatus, 
        nowPlayingURL, setNowPlayingURL,
        progress, setProgress,
        volume, setVolume,
        queue, setQueue
    } = React.useContext(MusicPlayerContext);

    const play_song = () => {
        if(status !== "PLAYING") {
            if(nowPlayingURL === "") {
                if(queue.length === 0) {
                    return;
                }
                setNowPlayingURL(queue[0].playingURL);
                setPlayingTitle(queue[0].song_title);
                setPlayingArtist(queue[0].song_artist);
                queue[0].current = true;
                setQueue(queue);
            }
            setStatus("PLAYING");
            return;
        } 
        setStatus("PAUSED");
    };

    const next_song = () => {
        if(queue.length === 0) {
            return;
        }
        let next_idx = 0;
        for(let i = 0; i < queue.length; i++) {
            if(queue[i].current && i < (queue.length-1)) {
                next_idx = i+1;
                queue[i].current = false;
            }
        }
        setNowPlayingURL(queue[next_idx].playingURL);
        setPlayingTitle(queue[next_idx].song_title);
        setPlayingArtist(queue[next_idx].song_artist);
        queue[next_idx].current = true;
        if(status !== "PLAYING") {
            setStatus("PLAYING");
        }
    };

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
                    setProgressSlidermax(Math.round(args.duration / 1000))
                }}
                onPlaying={(args?:any) => {
                    // console.log(args);
                    // setCurrentPos(format(args.position / 1000));
                    setProgress(Math.round(args.position / args.duration * Math.round(args.duration / 1000)))
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
                            <p className="player-song-info-title">{playingTitle}</p>
                            <p className="player-song-info-artist">{playingArtist}</p>
                        </div>
                    </div>
                    <div className="player-controls col-md-6 col-3">
                        <div className="player-controls-buttons">
                            <button className="player-controls-button-misc d-md-inline-block d-none">{stepBackward}</button>
                            <button className="player-controls-button-misc d-md-inline-block d-none">{backward}</button>
                            <button className="player-controls-button-play" onClick={play_song}>{status === "PLAYING" ? pauseCircle : playCircle}</button>
                            <button className="player-controls-button-misc d-md-inline-block d-none">{forward}</button>
                            <button className="player-controls-button-misc" onClick={next_song}>{stepForward}</button>
                            <button className="player-controls-button-misc d-md-none d-inline-block">{bars}</button>
                        </div>
                        <div className="player-controls-progress-bar d-md-flex d-none">
                            <p className="player-progress">{format(progress)}</p>
                            <div className="player-progress-slider-container">
                                <input type="range" min={progressSlidermin} max={progressSlidermax} value={progress} className="player-progress-slider" style={{ backgroundSize: (progress / progressSlidermax * 100) + '% 100%' }} onInput={(event: any) => setProgress(event.currentTarget.value)} />
                            </div>
                            <p className="player-progress">{maxDuration}</p>
                        </div>
                    </div>
                    <div className="player-misc-controls col-md-3 d-md-flex d-none" style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <button className="player-controls-button-misc">{bars}</button>
                        <div className="player-misc-controls-volume-slider-container">
                            <VolumeBar setVolume={setVolume}/>
                        </div>
                        <p style={{ color: 'white', fontSize: '15px', margin:'0 5px'}}>{volumeUp}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
