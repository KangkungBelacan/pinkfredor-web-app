import { Item } from "../Item";

export interface AlbumItem extends Item {
    albumid: string;
    album_name: string;

    /**
     * Base64 encoded album art
     */
    album_art?: {
        b64?: string,
        mimeType?: string
    };

    year_released?: number

    /**
     * Hmm
     */
    artistid?: string
}