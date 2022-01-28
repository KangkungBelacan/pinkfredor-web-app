import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faBackward,
    faBars,
    faForward,
    faPauseCircle,
    faPlayCircle,
    faRandom,
    faStepBackward,
    faStepForward,
    faSync,
    faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import {useWindowSize} from "../../global-imports";
import Sound from "react-sound";
import VolumeBar from "./MusicPlayerSubComponent/VolumeBar";
import NowPlayingQueuePopUp from "./MusicPlayerSubComponent/NowPlayingQueuePopUp";
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {
    next_song,
    prev_song,
    selectIsLoadingSong,
    selectIsLoop,
    selectIsShuffle,
    selectNowPlayingURL,
    selectPlayStatus,
    selectSongAlbumArtURL,
    selectSongArtistLabel,
    selectSongTitleLabel,
    selectVolume,
    setIsLoadingSong,
    setIsLoop,
    setIsShuffle,
    setVolume,
    toggle_play,
} from '../../app/reducers/musicPlayerSlice';

const stepBackward = <FontAwesomeIcon icon={faStepBackward}/>;
const stepForward = <FontAwesomeIcon icon={faStepForward}/>;
const forward = <FontAwesomeIcon icon={faForward}/>;
const backward = <FontAwesomeIcon icon={faBackward}/>;
const playCircle = <FontAwesomeIcon icon={faPlayCircle}/>;
const pauseCircle = <FontAwesomeIcon icon={faPauseCircle}/>;
const bars = <FontAwesomeIcon icon={faBars}/>;
const volumeUp = <FontAwesomeIcon icon={faVolumeUp}/>;
const ShuffleIcon = <FontAwesomeIcon icon={faRandom}/>;
const LoopIcon = <FontAwesomeIcon icon={faSync}/>;
const spinner = <FontAwesomeIcon icon="spinner"/>;

//Music Player Component.
function MusicPlayer(props: any): JSX.Element {
    const [width] = useWindowSize();
    // const [currentPos, setCurrentPos] = useState("0:00");
    const [maxDuration, setMaxDuration] = useState("0:00");
    const [curPos, setCurPos] = useState(undefined as any);
    const [showNowPlayingQueuePopup, setshowNowPlayingQueuePopup] =
        useState(false);
    const [progressSlidermin] = useState(0);
    const [progressSlidermax, setProgressSlidermax] = useState(1);
    const [isDraggingProgressBar, setisDraggingProgressBar] = useState(false);
    const [progress, setProgress] = useState(0);
    const [color1, setColor1] = useState("rgb(164, 164, 164)");
    const [color2, setColor2] = useState("rgb(164, 164, 164)");

    const isLoadingSong = useAppSelector(selectIsLoadingSong);
    const playStatus = useAppSelector(selectPlayStatus);
    const nowPlayingURL = useAppSelector(selectNowPlayingURL);
    const volume = useAppSelector(selectVolume);
    const songAlbumArtURL = useAppSelector(selectSongAlbumArtURL);
    const songTitleLabel = useAppSelector(selectSongTitleLabel);
    const songArtistLabel = useAppSelector(selectSongArtistLabel);
    const isLoop = useAppSelector(selectIsLoop);
    const isShuffle = useAppSelector(selectIsShuffle);

    const dispatch = useAppDispatch();

    const seek_back = () => {
        if (progress - 5 >= 0) {
            setCurPos(progress * 1000 - 5000);
            setProgress(progress - 5);
            return;
        }
        setCurPos(0);
        setProgress(0);
    };

    const seek_forward = () => {
        if (progress + 5 <= progressSlidermax) {
            setCurPos(progress * 1000 + 5000);
            setProgress(progress + 5);
            return;
        }
        setCurPos(progressSlidermax * 1000);
        setProgress(progressSlidermax);
    };

    const Shuffle = () => {
        if (!isShuffle) {
            setColor1("white");
            dispatch(setIsShuffle(true))
        } else {
            setColor1("rgb(164, 164, 164)");
            dispatch(setIsShuffle(false))
        }
    };

    const Loop = () => {
        if (!isLoop) {
            setColor2("white");
            dispatch(setIsLoop(true))
        } else {
            setColor2("rgb(164, 164, 164)");
            dispatch(setIsLoop(false))
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

    // Called whenever nowPlayingURL changes
    useEffect(() => {
        if (typeof nowPlayingURL !== "undefined" && nowPlayingURL !== "") {
            // Set to true because it takes time for the song to be loaded
            // It is set back to true when the song is finally loaded
            // There is a slim chance onLoad() will be called before this is called somehow, please double check in future
            setProgress(0);
            dispatch(setIsLoadingSong(true));
        }
    }, [nowPlayingURL]);

    return (
        <div
            style={{gridColumnStart: "span 2"}}
            className={props.className ? props.className : ""}
        >
            <NowPlayingQueuePopUp
                showNowPlayingQueuePopup={showNowPlayingQueuePopup}
                setshowNowPlayingQueuePopup={setshowNowPlayingQueuePopup}
            />
            <Sound
                url={nowPlayingURL}
                playStatus={playStatus}
                autoLoad={true}
                playFromPosition={curPos}
                onLoading={(args?: any) => {
                    setMaxDuration(format(args.duration / 1000));
                    setProgressSlidermax(Math.round(args.duration / 1000));
                }}
                onLoad={() => {
                    dispatch(setIsLoadingSong(false));
                }}
                onPlaying={(args?: any) => {
                    // console.log(args);
                    // setCurrentPos(format(args.position / 1000));
                    if (!isDraggingProgressBar)
                        setProgress(
                            Math.round(
                                (args.position / args.duration) *
                                Math.round(args.duration / 1000)
                            )
                        );
                }}
                onFinishedPlaying={next_song}
                onError={() => {
                }}
                volume={volume}
            />

            <div
                className="player"
                style={{
                    boxShadow:
                        width >= 768
                            ? ""
                            : `${-width + (width * progress) / 100}px -2px red`,
                }}
            >
                {/* <div className='player-song-info' style={{ display: 'flex', alignItems: 'center', flexGrow: 1, flexBasis: 0 }}> */}
                <div className="player-song-info col-md-3 col-7">
                    <img
                        className="player-song-info-cover"
                        src={songAlbumArtURL}
                        alt="Example_Song_Cover"
                    ></img>
                    <div
                        style={{display: "inline-block", paddingLeft: "10px"}}
                    >
                        <p className="player-song-info-title">
                            {songTitleLabel}
                        </p>
                        <p className="player-song-info-artist">
                            {songArtistLabel}
                        </p>
                    </div>
                </div>
                <div className="player-controls col-md-6 col-5">
                    <div className="player-controls-buttons">
                        <button
                            style={{color: color1}}
                            className="player-controls-button-toggle d-md-inline-block d-none"
                            onClick={Shuffle}
                        >
                            {ShuffleIcon}
                        </button>
                        <button
                            className="player-controls-button-misc d-md-inline-block d-none"
                            onClick={() => dispatch(prev_song())}
                        >
                            {stepBackward}
                        </button>
                        <button
                            className="player-controls-button-misc d-md-inline-block d-none"
                            onClick={seek_back}
                        >
                            {backward}
                        </button>
                        <button
                            className="player-controls-button-play"
                            onClick={() => dispatch(toggle_play())}
                            style={{
                                animation: isLoadingSong
                                    ? "spin 2s linear infinite"
                                    : "none",
                            }}
                        >
                            {isLoadingSong
                                ? spinner
                                : playStatus === "PLAYING"
                                    ? pauseCircle
                                    : playCircle}
                        </button>
                        <button
                            className="player-controls-button-misc d-md-inline-block d-none"
                            onClick={seek_forward}
                        >
                            {forward}
                        </button>
                        <button
                            className="player-controls-button-misc"
                            onClick={() => dispatch(next_song())}
                        >
                            {stepForward}
                        </button>
                        <button
                            className="player-controls-button-misc d-md-none d-inline-block"
                            onClick={() => setshowNowPlayingQueuePopup(true)}
                        >
                            {bars}
                        </button>
                        <button
                            style={{color: color2}}
                            className="player-controls-button-toggle d-md-inline-block d-none"
                            onClick={Loop}
                        >
                            {LoopIcon}
                        </button>
                    </div>
                    <div className="player-controls-progress-bar d-md-flex d-none">
                        <p className="player-progress">{format(progress)}</p>
                        <div className="player-progress-slider-container">
                            <input
                                type="range"
                                onMouseDown={() =>
                                    setisDraggingProgressBar(true)
                                }
                                onMouseUp={(evt: any) => {
                                    setCurPos(
                                        parseInt(evt.currentTarget.value) * 1000
                                    );
                                    setisDraggingProgressBar(false);
                                }}
                                min={progressSlidermin}
                                max={progressSlidermax}
                                value={progress}
                                className="player-progress-slider"
                                style={{
                                    backgroundSize:
                                        (progress / progressSlidermax) * 100 +
                                        "% 100%",
                                }}
                                onInput={(event: any) =>
                                    setProgress(event.currentTarget.value)
                                }
                            />
                        </div>
                        <p className="player-progress">{maxDuration}</p>
                    </div>
                </div>
                <div
                    className="player-misc-controls col-md-3 d-md-flex d-none"
                    style={{display: "flex", justifyContent: "flex-end"}}
                >
                    <button
                        className="player-controls-button-misc"
                        onClick={() => setshowNowPlayingQueuePopup(true)}
                    >
                        {bars}
                    </button>
                    <div className="player-misc-controls-volume-slider-container">
                        <VolumeBar setVolume={(volume: number) => dispatch(setVolume(volume))}/>
                    </div>
                    <p
                        style={{
                            color: "white",
                            fontSize: "15px",
                            margin: "0 5px",
                        }}
                    >
                        {volumeUp}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
