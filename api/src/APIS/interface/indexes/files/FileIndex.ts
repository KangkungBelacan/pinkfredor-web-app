import { FileItem } from "./FileItem";

export interface FileIndex {
    files: {[fileid: string]: FileItem}
}