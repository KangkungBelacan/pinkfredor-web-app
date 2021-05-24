import { PlaylistItem } from "./PlaylistItem";

export interface PlaylistIndex {
    playlists: { [playlistid: string]: PlaylistItem };
}
