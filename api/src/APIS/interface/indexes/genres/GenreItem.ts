import { Item } from "../Item";

export interface GenreItem extends Item {
    genreid: string,
    genre_name:string   
}