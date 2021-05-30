import {useState} from "react";
import { ReactSoundProps } from "react-sound";
import { MusicQueueItem } from "../interface/context/MusicQueueItem";
const MusicPlayerContextDefaultValues = () => {
    // ====================================
    // Music Player Context values
    // ====================================
    const [status, setStatus] = useState<ReactSoundProps["playStatus"]>("PAUSED");
    const [nowPlayingURL, setNowPlayingURL] = useState("");
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [queue, setQueue] = useState(([
        {
            current: false,
            playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu`,
            song_title: "Santuary",
            song_artist: "Kano"
        },
        {
            current: false,
            playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=1PlatVBCh_3yqHJAYt5BaEj_cgjnSiDMo`,
            song_title: "decide",
            song_artist: "Kano"
        },
    ] as Array<MusicQueueItem>));
    const ContextValues = {
        status, setStatus, 
        nowPlayingURL, setNowPlayingURL,
        progress, setProgress,
        volume, setVolume,
        queue, setQueue
    }; 

    return ContextValues;
    // ====================================
    // ====================================
}

export default MusicPlayerContextDefaultValues;