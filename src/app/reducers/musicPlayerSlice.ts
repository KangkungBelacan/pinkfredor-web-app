import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ReactSoundProps } from "react-sound";
import { MusicQueueItem } from "../../interface/context/MusicQueueItem";
import example_song_cover from "../../images/example-song-cover.png"
export interface MusicPlayerState {
    playStatus: ReactSoundProps["playStatus"];
    nowPlayingURL: string;
    volume: number;
    queue: Array<MusicQueueItem>;
    songTitleLabel: string;
    songArtistLabel: string;
    songAlbumArtURL: string;
    isLoadingSong: boolean;
    isLoop: boolean;
    isShuffle: boolean;
}

const initialState: MusicPlayerState = {
    playStatus: "STOPPED",
    nowPlayingURL: "",
    volume: 100,
    queue: [],
    songTitleLabel: "",
    songArtistLabel: "",
    songAlbumArtURL: example_song_cover,
    isLoadingSong: false,
    isLoop: true,
    isShuffle: true
};

export const musicPlayerSlice = createSlice({
    name: "musicPlayer",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPlayStatus: (
            state,
            action: PayloadAction<ReactSoundProps["playStatus"]>
        ) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.playStatus = action.payload;
        },
        setNowPlayingURL: (state, action: PayloadAction<string>) => {
            state.nowPlayingURL = action.payload;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        setVolume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload;
        },
        setQueue: (state, action: PayloadAction<Array<MusicQueueItem>>) => {
            state.queue = action.payload;
        },
        setSongTitleLabel: (state, action: PayloadAction<string>) => {
            state.songTitleLabel = action.payload;
        },
        setSongArtistLabel: (state, action: PayloadAction<string>) => {
            state.songArtistLabel = action.payload;
        },
        setSongAlbumArtURL: (state, action: PayloadAction<string>) => {
            state.songAlbumArtURL = action.payload;
        },
        setIsLoadingSong: (state, action: PayloadAction<boolean>) => {
            state.isLoadingSong = action.payload;
        },
        setIsLoop: (state, action: PayloadAction<boolean>) => {
            state.isLoop = action.payload;
        },
        setIsShuffle: (state, action: PayloadAction<boolean>) => {
            state.isShuffle = action.payload;
        },
        toggle_play: (state, action: PayloadAction<any>) => {
            if (state.isLoadingSong) {
                return;
            }

            if (state.playStatus !== "PLAYING") {
                if (state.nowPlayingURL === "") {
                    if (state.queue.length === 0) {
                        return;
                    }
                    state.nowPlayingURL = state.queue[0].playingURL;
                    state.songTitleLabel = state.queue[0].song_title;
                    state.songArtistLabel = state.queue[0].song_artist;
                    state.queue[0].current = true;
                }
                state.playStatus = "PLAYING";
                return;
            }
            state.playStatus = "PAUSED";
        },
        prev_song: (state) => {
            if (state.queue.length === 0) {
                return;
            }
            let next_idx = state.queue.length - 1;
            for (let i = state.queue.length - 1; i !== -1; i--) {
                if (state.queue[i].current && i !== 0) {
                    next_idx = i - 1;
                }
                state.queue[i].current = false;
            }
            state.nowPlayingURL = state.queue[next_idx].playingURL;
            state.songTitleLabel = state.queue[next_idx].song_title;
            state.songArtistLabel = state.queue[next_idx].song_artist;
            state.queue[next_idx].current = true;
            if (state.playStatus !== "PLAYING") {
                state.playStatus = "PLAYING"
            }
        },
        next_song: (state) => {
            if (state.queue.length === 0) {
                return;
            }
            let next_idx = 0;
            let loop_target = 0;
            for (let i = 0; i < state.queue.length; i++) {
                if (state.queue[i].current && i < state.queue.length - 1) {
                    if (!state.isShuffle && !state.isLoop) {
                        next_idx = i + 1;
                        loop_target = next_idx;
                    } else if (state.isShuffle && !state.isLoop) {
                        next_idx = i + Math.floor(Math.random() * state.queue.length);
                        loop_target = next_idx;
                    } else if ((!state.isShuffle && state.isLoop) || (state.isShuffle && state.isLoop)) {
                        next_idx = loop_target;
                    }
                }
                state.queue[i].current = false;
            }
            state.nowPlayingURL = state.queue[next_idx].playingURL
            state.songTitleLabel = state.queue[next_idx].song_title;
            state.songArtistLabel = state.queue[next_idx].song_artist
            state.queue[next_idx].current = true;
            if (state.playStatus !== "PLAYING") {
                state.playStatus = "PLAYING"
            }
        },
        change_song_in_queue: (state, action: PayloadAction<any>) => {
            console.log("Hmm, something is missing here...")
        },
        stop_song: (state) => {
            state.playStatus = "STOPPED"
        },
    },
});

export const {
    setPlayStatus,
    setNowPlayingURL,
    setVolume,
    setQueue,
    setSongTitleLabel,
    setSongArtistLabel,
    setSongAlbumArtURL,
    setIsLoadingSong,
    setIsLoop,
    setIsShuffle,
    toggle_play,
    prev_song,
    next_song,
    change_song_in_queue,
    stop_song
} = musicPlayerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayStatus = (state: RootState) =>
    state.musicPlayer.playStatus;
export const selectNowPlayingURL = (state: RootState) =>
    state.musicPlayer.nowPlayingURL;
export const selectVolume = (state: RootState) => state.musicPlayer.volume;
export const selectQueue = (state: RootState) => state.musicPlayer.queue;
export const selectSongTitleLabel = (state: RootState) =>
    state.musicPlayer.songTitleLabel;
export const selectSongArtistLabel = (state: RootState) =>
    state.musicPlayer.songArtistLabel;
export const selectSongAlbumArtURL = (state: RootState) =>
    state.musicPlayer.songAlbumArtURL;
export const selectIsLoadingSong = (state: RootState) =>
    state.musicPlayer.isLoadingSong;
export const selectIsLoop = (state: RootState) =>
    state.musicPlayer.isLoop;
export const selectIsShuffle = (state: RootState) =>
    state.musicPlayer.isShuffle;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//     dispatch,
//     getState
// ) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export default musicPlayerSlice.reducer;
