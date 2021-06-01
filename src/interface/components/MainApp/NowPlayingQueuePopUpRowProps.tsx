import {GenericProps} from "../../GenericProps";
export default interface NowPlayingQueuePopUpRowProps extends GenericProps {
    song_title: string;
    song_artist: string;
    is_playing: boolean;
    playingURL: string;

    // Music controls from MusicPlaying.tsx
    parent_controls: any;
}