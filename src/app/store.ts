import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import musicPlayerReducer from './reducers/musicPlayerSlice';
import playlistSlice from './reducers/playlistSlice';

export const store = configureStore({
    reducer: {
        musicPlayer: musicPlayerReducer,
        playlist: playlistSlice
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
