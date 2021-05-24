import { ArtistItem } from "./ArtistItem";

export interface ArtistIndex {
    artists: {[artistid: string]: ArtistItem}
}