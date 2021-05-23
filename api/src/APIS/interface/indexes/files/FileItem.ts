import { Item } from "../Item";

export interface FileItem extends Item {
    id: string;
    filename: string;
    parents: any[];
    size: number;
}
