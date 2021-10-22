import { Item } from "../Item";
import { FileMetadata } from "./FileMetadata";

export interface FileItem extends Item {
    id: string;
    filename: string;
    parents: any[];
    size: number;
    file_metadata: FileMetadata,
    createdTime: number
}
