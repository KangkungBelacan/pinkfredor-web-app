import {ButtonGroup, Dropdown} from "react-bootstrap";
import React, {useState} from "react";
import {faCaretLeft, faEllipsisH, faPlay, faPlus,} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {MusicQueueItem} from "../../../interface/context/MusicQueueItem";
import useAxios from "axios-hooks";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {
    selectNowPlayingURL,
    selectQueue,
    setNowPlayingURL,
    setPlayStatus,
    setQueue,
    setSongArtistLabel,
    setSongTitleLabel,
    toggle_play
} from "../../../app/reducers/musicPlayerSlice";
import {
    fetchPlaylist,
    playlistDataSelector,
    playlistErrorSelector,
    playlistStatusSelector
} from "../../../app/reducers/playlistSlice";

const ellipsisH = <FontAwesomeIcon icon={faEllipsisH}/>;
const play = <FontAwesomeIcon className={"icons-play"} icon={faPlay}/>;
const plus = <FontAwesomeIcon className={"icons-plus"} icon={faPlus}/>;
const caretLeft = (
    <FontAwesomeIcon className={"icons-caret-left"} icon={faCaretLeft}/>
);

const tableItemActions = React.forwardRef<HTMLButtonElement,
    React.PropsWithChildren<any>>((props, ref: any) => (
    <a
        className={"table-item-actions"}
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            props.onClick(e);
        }}
    >
        {ellipsisH}
    </a>
));

interface SongObject {
    id: string;
    parents: string[];
    file_metadata: {
        song_comment: string;
        song_artistid: string;
        song_albumid: string;
        song_title: string;
        song_genreid: string;
        album_track_no: string;
        [x: string]: any;
    };
    filename: string;

    [x: string]: any;
}

interface ExampleSongActionsProps {
    songObject?: SongObject;
}

const ExampleSongActions = (props: ExampleSongActionsProps) => {
    const [dropdownPlaylistItems, setDropdownPlaylistItems] = useState<any>([]);
    const playlistData = useAppSelector(playlistDataSelector);
    const playlistStatus = useAppSelector(playlistStatusSelector);
    const playlistError = useAppSelector(playlistErrorSelector);
    // const {
    //     nowPlayingURL,
    //     setNowPlayingURL,
    //     queue,
    //     setQueue,
    //     setSongTitleLabel,
    //     setSongArtistLabel,
    // } = React.useContext(MusicPlayerContext);
    const togglePlay = useAppSelector(toggle_play);
    const nowPlayingURL = useAppSelector(selectNowPlayingURL);
    const queue = useAppSelector(selectQueue);
    const dispatch = useAppDispatch();

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

    const playlistActions = React.forwardRef<HTMLButtonElement,
        React.PropsWithChildren<any>>((props, ref: any) => (
        <a
            className={"playlist-actions"}
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                props.onClick(e);
            }}
        >
            {caretLeft}
            <div className={"add-to-playlist-text"}>Add to playlist</div>
        </a>
    ));

    const CreateNewPlaylist = (songObject: any, newPlaylistName: string) => {
        axios
            .post(
                `/api/indexes/playlists`,
                {
                    playlists: [
                        {
                            playlistid: "",
                            playlist_name: newPlaylistName,
                            playlist_tracks: [songObject.id],
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
                dispatch(fetchPlaylist());
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const AddToPlaylist = (songObject: any, playlistName: string) => {
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

    const PlayNext = (songObject: any) => {
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
            item_id: "queue_item_" + songObject.id + Date.now().toString(),
            current: false,
            playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=${songObject.id}`,
            song_title: songObject.file_metadata.song_title,
            song_artist: songObject.file_metadata.song_artist,
        };
        let newQueue = queue;
        newQueue.splice(currentPlayingSongIndex + 1, 0, newSongItem);
        dispatch(setQueue(newQueue));
    };

    const AddToQ = (songObject: any) => {
        dispatch(setQueue([
            ...queue,
            {
                item_id: "queue_item_" + songObject.id + Date.now().toString(),
                current: false,
                playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=${songObject.id}`,
                song_title: songObject.file_metadata.song_title,
                song_artist: songObject.file_metadata.song_artist,
            },
        ]));
    };


    const Play = (songObject: any) => {
        let new_queue: Array<MusicQueueItem> = [];
        let indexFilesDataKeys = Object.keys(indexFilesData.files);
        // Set queue to all songs in view
        for (let i = 0; i < indexFilesDataKeys.length; i++) {
            new_queue.push({
                item_id: "queue_item_" + indexFilesData.files[indexFilesDataKeys[i]].id,
                current: indexFilesData.files[indexFilesDataKeys[i]].id === songObject.id ? true : false,
                playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=${indexFilesData.files[indexFilesDataKeys[i]].id}`,
                song_title: indexFilesData.files[indexFilesDataKeys[i]].file_metadata.song_title,
                song_artist: indexFilesData.files[indexFilesDataKeys[i]].file_metadata.song_artist,
            });
        }
        dispatch(setQueue(new_queue));
        dispatch(setNowPlayingURL(
            `/api/driveapi/files/download?token=${localStorage.token}&fileid=${songObject.id}`
        ));
        dispatch(setSongTitleLabel(songObject.file_metadata.song_title));
        dispatch(setSongArtistLabel(songObject.file_metadata.song_artist));
        // setSongAlbumArtURL("");
        dispatch(setPlayStatus("PLAYING"));

        // console.log(rowData);
        // window.alert(
        //     "You clicked on " +
        //         (rowData as any).title +
        //         " Action: " +
        //         event.currentTarget.id
        // );
    };


    const songActions = (
        songObject: any,
        action: string,
        playlistName?: string
    ) => {
        // const possibleAction = ["AddToQ", "PlayNext", "AddToPlaylist", "Play"];
        if (playlistName === undefined) playlistName = "";

        switch (action) {
            case "AddToQ":
                AddToQ(songObject);
                break;
            case "PlayNext":
                PlayNext(songObject);
                break;
            case "CreateNewPlaylist":
                CreateNewPlaylist(songObject, playlistName);
                break;
            case "AddToPlaylist":
                AddToPlaylist(songObject, playlistName);
                break;
            case "Play":
                Play(songObject);
                break;
        }
    };

    return (
        <Dropdown
            as={ButtonGroup}
            onClick={(evt: any) => {
                evt.stopPropagation();
            }}
        >
            {/*<Button*/}
            {/*    id="Play"*/}
            {/*    onClick={(event) =>*/}
            {/*        songActions(songObject, "Play")*/}
            {/*    }*/}
            {/*    variant="success"*/}
            {/*>*/}
            {/*    Play*/}
            {/*/Button>*/}

            <Dropdown.Toggle
                as={tableItemActions}
                variant="success"
                id="dropdown-split-basic"
            />
            <Dropdown.Menu>
                <Dropdown.Item
                    id="AddToQ"
                    onClick={(event) => songActions(props.songObject, "AddToQ")}
                >
                    Add to queue
                </Dropdown.Item>
                <Dropdown.Item
                    id="PlayNext"
                    onClick={(event) =>
                        songActions(props.songObject, "PlayNext")
                    }
                >
                    Play next
                </Dropdown.Item>
                <div className="dropdown-divider"></div>
                <div className="add-to-playlist-dropdown">
                    <Dropdown
                        as={ButtonGroup}
                        onClick={(evt: any) => {
                            evt.stopPropagation();
                        }}
                        drop={"left"}
                    >
                        <Dropdown.Toggle
                            as={playlistActions}
                            variant="success"
                        />
                        <Dropdown.Menu>
                            <Dropdown.Item
                                className={"action-new-playlist"}
                                id="NewPlaylist"
                                onClick={(event) =>
                                    // TODO: Make this open a modal box to create a new playlist
                                    songActions(
                                        props.songObject,
                                        prompt(
                                            "Enter playlist name:"
                                        ) as string
                                    )
                                }
                            >
                                {plus}
                                New playlist
                            </Dropdown.Item>
                            {dropdownPlaylistItems}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default ExampleSongActions;