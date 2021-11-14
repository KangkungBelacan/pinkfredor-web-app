import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {ReactSoundProps} from "react-sound";
import {MusicQueueItem} from "../../interface/context/MusicQueueItem";

export interface MusicPlayerState {
    playStatus: ReactSoundProps["playStatus"];
    nowPlayingURL: string;
    volume: number;
    queue: Array<MusicQueueItem>;
    songTitleLabel: string;
    songArtistLabel: string;
    songAlbumArtURL: string;
    isLoadingSong: boolean;
}

const initialState: MusicPlayerState = {
    playStatus: "STOPPED",
    nowPlayingURL: "",
    volume: 100,
    queue: [],
    songTitleLabel: "",
    songArtistLabel: "",
    songAlbumArtURL: "",
    isLoadingSong: false,
};


export const musicPlayerSlice = createSlice({
    name: 'musicPlayer',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPlayStatus: (state, action: PayloadAction<ReactSoundProps["playStatus"]>) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.playStatus = action.payload;
        },
        setNowPlayingURL: (state, action: PayloadAction<string>) => {
            state.nowPlayingURL = `/api/driveapi/files/download?token=${localStorage.token}&fileid=${action.payload}`;
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
} = musicPlayerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayStatus = (state: RootState) => state.musicPlayer.playStatus;
export const selectNowPlayingURL = (state: RootState) => state.musicPlayer.nowPlayingURL;
export const selectVolume = (state: RootState) => state.musicPlayer.volume;
export const selectQueue = (state: RootState) => state.musicPlayer.queue;
export const selectSongTitleLabel = (state: RootState) => state.musicPlayer.songTitleLabel;
export const selectSongArtistLabel = (state: RootState) => state.musicPlayer.songArtistLabel;
export const selectSongAlbumArtURL = (state: RootState) => state.musicPlayer.songAlbumArtURL;
export const selectIsLoadingSong = (state: RootState) => state.musicPlayer.isLoadingSong;

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
