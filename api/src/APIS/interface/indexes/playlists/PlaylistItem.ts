import { Item } from "../Item";

export interface PlaylistItem extends Item {
    playlistid: string;
    playlist_name: string;

    // Array of fileids
    playlist_tracks: Array<string>;
}