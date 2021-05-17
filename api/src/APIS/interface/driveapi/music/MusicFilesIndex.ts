import { MusicFile } from "./MusicFile";

export interface MusicFilesIndex {
    files: { [file_id: string]: MusicFile; }
}