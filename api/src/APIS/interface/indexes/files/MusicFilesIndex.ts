import { MusicFile } from "./MusicFile";

export interface MusicFilesIndex {
    files: {[fileid: string]: MusicFile}
}