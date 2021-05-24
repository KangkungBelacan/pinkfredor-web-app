import { Item } from "../Item";

export interface ArtistItem extends Item {
    artistid: string;
    artist_name: string;
    artist_art?:string;
}