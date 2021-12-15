import React, {forwardRef, useEffect, useState} from "react";
import useAxios from "axios-hooks";
import "../Browse.css";
// import PlayArrow from "@material-ui/icons/PlayArrow";
// import Queue from "@material-ui/icons/Queue";
import {Icons} from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import {MusicQueueItem} from "../../../interface/context/MusicQueueItem";
import CustomTable from "../CustomTable/CustomTable";
import axios from "axios";
import ExampleSongActions from "../CustomTable/ExampleSongActions";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    play_song,
    selectNowPlayingURL,
    selectPlayStatus,
    selectQueue,
    setNowPlayingURL,
    setPlayStatus,
    setQueue,
    setSongArtistLabel,
    setSongTitleLabel
} from "../../../app/reducers/musicPlayerSlice";
import {playlistDataSelector, playlistErrorSelector, playlistStatusSelector} from "../../../app/reducers/playlistSlice";

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref}/>
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref}/>
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref}/>
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
};

interface Element {
}

const BrowseAllSongs = (props: any) => {
    const playStatus = useAppSelector(selectPlayStatus);
    const nowPlayingURL = useAppSelector(selectNowPlayingURL);
    const playlistsData = useAppSelector(playlistDataSelector);
    const playlistStatus = useAppSelector(playlistStatusSelector);
    const playlistError = useAppSelector(playlistErrorSelector);
    const queue = useAppSelector(selectQueue);

    const dispatch = useAppDispatch();

    const [tableItems, setTableItems] = useState<any>([]);
    const [topBarSelection, setTopBar] = useState(0);
    const [indexFilesState, setIndexFilesState] = useState<any>([]);
    const [artistsDataState, setArtistsDataState] = useState<any>([]);
    const [albumDataState, setAlbumDataState] = useState<any>([]);
    const [pageLoading, setPageLoading] = useState(true);

    const [
        {
            data: indexFilesData,
            loading: indexFilesLoading,
            error: indexFilesError,
        },
        indexFilesRefetch,
    ] = useAxios({
        url: "/api/indexes/files",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    const [
        {data: artistsData, loading: artistsLoading, error: artistsError},
        artistsRefetch,
    ] = useAxios({
        url: "/api/indexes/artists",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    const [
        {data: albumData, loading: albumLoading, error: albumError},
        albumRefetch,
    ] = useAxios({
        url: "/api/indexes/albums",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    const Play = (songData: any) => {
        let new_queue: Array<MusicQueueItem> = [];
        let indexFilesDataKeys = Object.keys(indexFilesData.files);
        // Set queue to all songs in view
        for (let i = 0; i < indexFilesDataKeys.length; i++) {
            new_queue.push({
                item_id:
                    "queue_item_" +
                    indexFilesData.files[indexFilesDataKeys[i]].id,
                current:
                    indexFilesData.files[indexFilesDataKeys[i]].id ===
                    songData.id
                        ? true
                        : false,
                playingURL: `/api/driveapi/files/download?token=${
                    localStorage.token
                }&fileid=${indexFilesData.files[indexFilesDataKeys[i]].id}`,
                song_title:
                indexFilesData.files[indexFilesDataKeys[i]].file_metadata
                    .song_title,
                song_artist:
                indexFilesData.files[indexFilesDataKeys[i]].file_metadata
                    .song_artist,
            });
        }
        setQueue(new_queue);
        setNowPlayingURL(songData.id);
        setSongTitleLabel(songData.file_metadata.song_title);
        setSongArtistLabel(songData.file_metadata.song_artist);
        // setSongAlbumArtURL("");
        setPlayStatus("PLAYING");

        // console.log(rowData);
        // window.alert(
        //     "You clicked on " +
        //         (rowData as any).title +
        //         " Action: " +
        //         event.currentTarget.id
        // );
    };

    // Use axios.post to make a POST request to the server to create a new playlist at the endpoint /api/indexes/playlists while passing in bearer token
    const CreateNewPlaylist = (songData: any, newPlaylistName: string) => {
        axios
            .post(
                `/api/indexes/playlists`,
                {
                    playlists: [
                        {
                            playlistid: "",
                            playlist_name: newPlaylistName,
                            playlist_tracks: [songData.id],
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
            .then((res) => {
                console.log("Success"); // TODO: Add notification here
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const AddToPlaylist = (songData: any, playlistName: string) => {
        // new Promise((resolve, reject) => {
        //     let payload: any = {
        //         album_name: newData.albumName,
        //         year_released: newData.yearReleased,
        //     };
        //
        //     if (newData.albumArtist !== undefined) {
        //         payload.artistid = newData.albumArtist;
        //     }
        //
        //     axios({
        //         url: `/api/indexes/albums/${oldData.album_id}`,
        //         method: "PUT",
        //         headers: {
        //             Authorization: `Bearer ${localStorage.token}`,
        //         },
        //         data: payload,
        //     })
        //         .then((response: any) => {
        //             const dataUpdate = [...t_data];
        //             const index = oldData.tableData.id;
        //             dataUpdate[index] = newData;
        //             set_t_data([...dataUpdate]);
        //             resolve(true);
        //         })
        //         .catch((error: any) => {
        //             console.error(error);
        //             reject();
        //         });
        // })
    };

    const PlayNext = (songData: any) => {
        // Get current playing song ID from playing url
        let currentPlayingSongID = nowPlayingURL.split("&fileid=")[1];
        // Get index of currently playing song
        let currentPlayingSongIndex = queue.findIndex(
            (song: any) =>
                song.playingURL.split("&fileid=")[1] === currentPlayingSongID
        );
        if (currentPlayingSongIndex === -1) {
            // TODO: Use notification toast to tell the user that there are currently no playing songs
            return;
        }
        let newSongItem = {
            item_id: "queue_item_" + songData.id + Date.now().toString(),
            current: false,
            playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=${songData.id}`,
            song_title: songData.file_metadata.song_title,
            song_artist: songData.file_metadata.song_artist,
        };
        let newQueue = queue;
        newQueue.splice(currentPlayingSongIndex + 1, 0, newSongItem);
        setQueue(newQueue);
    };

    const AddToQ = (songData: any) => {
        setQueue([
            ...queue,
            {
                item_id: "queue_item_" + songData.id + Date.now().toString(),
                current: false,
                playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=${songData.id}`,
                song_title: songData.file_metadata.song_title,
                song_artist: songData.file_metadata.song_artist,
            },
        ]);
    };

    const songActions = (
        songData: any,
        action: string,
        playlistName: string
    ) => {
        // const possibleAction = ["AddToQ", "PlayNext", "AddToPlaylist", "Play"];
        if (playlistName === undefined) playlistName = "";

        switch (action) {
            case "AddToQ":
                AddToQ(songData);
                break;
            case "PlayNext":
                PlayNext(songData);
                break;
            case "CreateNewPlaylist":
                CreateNewPlaylist(songData, playlistName);
                break;
            case "AddToPlaylist":
                AddToPlaylist(songData, playlistName);
                break;
            case "Play":
                Play(songData);
                break;
        }
    };

    useEffect(() => {
        if (
            indexFilesLoading ||
            indexFilesError ||
            artistsLoading ||
            artistsError ||
            albumLoading ||
            albumError ||
            !pageLoading
        )
            return;

        let indexFiles = Object.values(indexFilesData.files);
        setIndexFilesState(indexFiles);
        setArtistsDataState(artistsData.artists);
        setAlbumDataState(albumData.albums);
        setPageLoading(false);
    }, [
        indexFilesData,
        indexFilesLoading,
        indexFilesError,
        artistsData,
        artistsLoading,
        artistsError,
        albumData,
        albumLoading,
        albumError,
        pageLoading,
    ]);

    return (
        <div>
            {indexFilesState.length !== 0 ? (
                <CustomTable songs={indexFilesState}
                             artists={artistsDataState}
                             albums={albumDataState}
                             albumArtEnabled={false}
                             customAction={<ExampleSongActions/>}
                             tableItemOnClick={(song) => dispatch(play_song({
                                 id: song.id,
                                 title: song.file_metadata.song_title,
                                 artist: song.file_metadata.song_artistid, // TODO: GET ARTIST NAME INSTEAD OF PUTTING ID
                             }))}
                />
            ) : (
                <div style={{color: "white"}}>
                    Loading... (change this shit later)
                </div>
            )}
        </div>
    );
};

export default React.memo(BrowseAllSongs);
