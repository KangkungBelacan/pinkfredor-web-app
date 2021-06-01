import {GenericProps} from "../../GenericProps";
export default interface NowPlayingQueuePopUpRowProps extends GenericProps {
    item_id: string;
    song_title: string;
    song_artist: string;
    is_playing: boolean;
    playingURL: string;

    // Index of the queue?
    index: number;

    // Music controls from MusicPlaying.tsx
    parent_controls: any;
}