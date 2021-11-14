import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface PlaylistData {
    status: "loading" | "succeeded" | "failed" | "idle";
    error: string | undefined;
    playlist: any;
}

const initialState: PlaylistData = {
    status: "idle",
    error: "",
    playlist: null,
};

export const fetchPlaylist = createAsyncThunk("fetchPlaylist", async () => {
    let fetch_obj = await fetch("/api/indexes/playlists", {
        method: "GET",
        headers: {
            "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
    let response = await fetch_obj.json()
    return response
});

export const playlistSlice = createSlice({
    name: "playlistSlice",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchPlaylist.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPlaylist.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.playlist = action.payload;
            })
            .addCase(fetchPlaylist.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const playlistStatusSelector = (state: RootState) => state.playlist.status;
export const playlistDataSelector = (state: RootState) => state.playlist.playlist;
export const playlistErrorSelector = (state: RootState) => state.playlist.error;


export default playlistSlice.reducer;
