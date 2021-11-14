import {
    playlistStatusSelector,
    playlistDataSelector,
    playlistErrorSelector,
    fetchPlaylist,
} from "../app/reducers/playlistSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { useEffect } from "react";
const usePlaylistData = () => {
    const playlistData = useAppSelector(playlistDataSelector);
    const playlistStatus = useAppSelector(playlistStatusSelector);
    const playlistError = useAppSelector(playlistErrorSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (playlistStatus === "idle") {
            dispatch(fetchPlaylist());
            return;
        }

        if (playlistStatus === "failed") {
            console.error(playlistError);
            return;
        }
    }, [playlistStatus]);

    return [playlistData, playlistStatus, playlistError]
};

export default usePlaylistData;
