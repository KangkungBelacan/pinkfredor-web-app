export interface MusicQueueItem {
    // Indicate its the current loaded url
    current: boolean;
    playingURL: string;
    song_title: string;
    song_artist: string;
    album_art_b64?: string;
}