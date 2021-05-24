import { AlbumItem } from "./AlbumItem";

export interface AlbumIndex {
    albums: {[albumid: string]: AlbumItem}
}