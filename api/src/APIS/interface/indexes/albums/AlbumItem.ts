import { AlbumTrackEntry } from "./AlbumTrackEntry";

export interface AlbumItem {
    albumid: string;
    album_name: string;

    /**
     * Base64 encoded album art
     */
    album_art?: string;

    tracks: Array<AlbumTrackEntry>,

    total_tracks: number

    year_released?: number

    /**
     * Hmm
     */
    artistid: string
}