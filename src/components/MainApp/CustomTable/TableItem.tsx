import "./TableItem.css";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretLeft,
    faEllipsisH,
    faPlay,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";
import PlaylistContext from "../../../context/PlaylistContext";
import MusicPlayerContext from "../../../context/MusicPlayerContext";

const ellipsisH = <FontAwesomeIcon icon={faEllipsisH} />;
const play = <FontAwesomeIcon className={"icons-play"} icon={faPlay} />;
const plus = <FontAwesomeIcon className={"icons-plus"} icon={faPlus} />;
const caretLeft = (
    <FontAwesomeIcon className={"icons-caret-left"} icon={faCaretLeft} />
);

const TableItem = (props: any) => {
    const { nowPlayingURL } = React.useContext(MusicPlayerContext);
    const { playlistData } = React.useContext(PlaylistContext);
    let songData = props.songData;
    let indexFilesState = props.indexFilesState;

    let artistsDataState = props.artistsDataState;
    let songActions = props.songActions;
    const [dropdownPlaylistItems, setDropdownPlaylistItems] = useState<any>([]);
    let containerDetails: string = "";
    let isPlayingNow: boolean =
        songData.id === nowPlayingURL.split("&fileid=")[1];

    if (
        songData.file_metadata.song_artistid != "" ||
        songData.file_metadata.song_albumid != "" ||
        "song_artistid" in songData.file_metadata ||
        "song_albumid" in songData.file_metadata
    ) {
        if ("song_artistid" in songData.file_metadata) {
            if (songData.file_metadata.song_artistid !== "") {
                containerDetails =
                    artistsDataState[songData.file_metadata.song_artistid]
                        .artist_name;
            }
        }

        if (
            "song_artistid" in songData.file_metadata &&
            "song_albumid" in songData.file_metadata
        ) {
            if (
                songData.file_metadata.song_artistid !== "" &&
                songData.file_metadata.song_albumid !== ""
            ) {
                containerDetails += ", ";
            }
        }

        if ("song_albumid" in songData.file_metadata) {
            if (songData.file_metadata.song_albumid !== "") {
                containerDetails +=
                    props.albumDataState[songData.file_metadata.song_albumid]
                        .album_name;
            }
        }
    }

    const tableItemActions = React.forwardRef<
        HTMLButtonElement,
        React.PropsWithChildren<any>
    >((props, ref: any) => (
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

    const playlistActions = React.forwardRef<
        HTMLButtonElement,
        React.PropsWithChildren<any>
    >((props, ref: any) => (
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

    // Use for loop to generate a list of dropdownPlaylistItems
    const GenerateDropdownPlaylistItems = () => {
        let dropdownPlaylistItems: any[] = [];
        let playlistDataKeys = Object.keys(playlistData.playlists);
        let playlists = playlistData.playlists;
        for (let i = 0; i < playlistDataKeys.length; i++) {
            let playlistID = playlistDataKeys[i];
            dropdownPlaylistItems.push(
                <Dropdown.Item
                    key={playlistID}
                    onClick={() => {
                        songActions(songData, "AddToPlaylist", playlistID);
                    }}
                >
                    {playlists[playlistID].playlist_name}
                </Dropdown.Item>
            );
        }
        return dropdownPlaylistItems;
    };

    useEffect(() => {
        if (playlistData === undefined) return;
        setDropdownPlaylistItems(GenerateDropdownPlaylistItems());
    }, [playlistData]);

    return (
        <div
            className={
                isPlayingNow
                    ? "table-item-container table-item-playing"
                    : "table-item-container"
            }
            style={{
                gridTemplateColumns: `${
                    indexFilesState.length.toString().length + 0.5
                }em auto 1fr auto`,
            }}
            onClick={(event) => {
                songActions(songData, "Play");
            }}
        >
            <div className={"table-item-container-number"}>
                {props.position}
            </div>
            <div
                className={"table-item-container-image"}
                style={{ backgroundColor: props.imageColor }}
            >
                <div
                    className={
                        "table-item-container-image-overlay table-item-container-image-fade"
                    }
                ></div>
                <div className={"table-item-container-image-disc"}></div>
                {play}
            </div>
            <div className={"table-item-container-info"}>
                <div className={"table-item-container-info-title"}>
                    {"song_title" in songData.file_metadata &&
                    songData.file_metadata.song_title !== ""
                        ? songData.file_metadata.song_title
                        : songData.filename}
                </div>
                <div className={"table-item-container-info-details"}>
                    {containerDetails}
                </div>
            </div>
            <div className={"table-item-container-actions"}>
                <Dropdown
                    as={ButtonGroup}
                    onClick={(evt: any) => {
                        evt.stopPropagation();
                    }}
                >
                    {/*<Button*/}
                    {/*    id="Play"*/}
                    {/*    onClick={(event) =>*/}
                    {/*        songActions(songData, "Play")*/}
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
                            onClick={(event) => songActions(songData, "AddToQ")}
                        >
                            Add to queue
                        </Dropdown.Item>
                        <Dropdown.Item
                            id="PlayNext"
                            onClick={(event) =>
                                songActions(songData, "PlayNext")
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
                                                songData,
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
            </div>
        </div>
    );
};

export default TableItem;
