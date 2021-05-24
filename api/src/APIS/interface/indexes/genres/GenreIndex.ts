import { GenreItem } from "./GenreItem";

export interface GenreIndex {
    genres: {[genreid: string]: GenreItem}   
}