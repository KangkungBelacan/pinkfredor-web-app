import {GenericProps} from "../../GenericProps";
export default interface NowPlayingQueuePopUpRowProps extends GenericProps {
    song_title: string;
    song_artist: string;
    is_playing: boolean;
    playingURL: string;
    change_song_in_queue: (playingURL: string)=>{};
}