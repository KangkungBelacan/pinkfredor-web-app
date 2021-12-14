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
import { useAppSelector } from "../../../app/hooks";
import { selectNowPlayingURL } from "../../../app/reducers/musicPlayerSlice";

import {
    playlistStatusSelector,
    playlistDataSelector,
    playlistErrorSelector,
    fetchPlaylist,
} from "../../../app/reducers/playlistSlice";

const play = <FontAwesomeIcon className={"icons-play"} icon={faPlay}/>;

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

const TableItem = (props: any) => {
    const nowPlayingURL = useAppSelector(selectNowPlayingURL);
    const playlistsData = useAppSelector(playlistDataSelector);
    let songData = props.songData;
    let indexFilesState = props.indexFilesState;

interface TableItemProps {
    songObject: SongObject;
    allSongs: SongObject[];
    artistsData: any;
    albumsData: any;
    customAction: any;
    albumArtEnabled: boolean;
    tableItemOnClick?: any;
}

const EvaluateContainerDetails = (props: TableItemProps) => {
    let songObject = props.songObject;
    let artistsDataState = props.artistsData;
    let albumsDataState = props.albumsData;
    let containerDetails = "";
    if (
        songObject.file_metadata.song_artistid != "" ||
        songObject.file_metadata.song_albumid != "" ||
        "song_artistid" in songObject.file_metadata ||
        "song_albumid" in songObject.file_metadata
    ) {
        if ("song_artistid" in songObject.file_metadata) {
            if (songObject.file_metadata.song_artistid !== "") {
                containerDetails =
                    artistsDataState[songObject.file_metadata.song_artistid]
                        .artist_name;
            }
        }

        if (
            "song_artistid" in songObject.file_metadata &&
            "song_albumid" in songObject.file_metadata
        ) {
            if (
                songObject.file_metadata.song_artistid !== "" &&
                songObject.file_metadata.song_albumid !== ""
            ) {
                containerDetails += ", ";
            }
        }

        if ("song_albumid" in songObject.file_metadata) {
            if (songObject.file_metadata.song_albumid !== "") {
                containerDetails +=
                    albumsDataState[songObject.file_metadata.song_albumid]
                        .album_name;
            }
        }
    }

    return containerDetails;
}

const TableItem = (props: TableItemProps) => {
    const {nowPlayingURL} = React.useContext(MusicPlayerContext);
    const {playlistData} = React.useContext(PlaylistContext);
    let songObject = props.songObject;

    let songActions = props.customAction;
    let containerDetails: string = "";
    let isPlayingNow: boolean =
        songObject.id === nowPlayingURL.split("&fileid=")[1];

    const albumArt = () => {
        return (
            <div
                className={"table-item-container-image"}
                style={{backgroundColor: "#" + ((Math.random() * 0xffffff) << 0).toString(16)}}
            >
                <div
                    className={
                        "table-item-container-image-overlay table-item-container-image-fade"
                    }
                ></div>
                <div className={"table-item-container-image-disc"}></div>
                {play}
            </div>
        )
    }
    // Use for loop to generate a list of dropdownPlaylistItems
    const GenerateDropdownPlaylistItems = () => {
        if (playlistsData === null) return;
        let dropdownPlaylistItems: any[] = [];
        let playlistDataKeys = Object.keys(playlistsData.playlists);
        let playlists = playlistsData.playlists;
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
        if (playlistsData === undefined) return;
        setDropdownPlaylistItems(GenerateDropdownPlaylistItems());
    }, [playlistsData]);

    return (
        <div
            className={
                isPlayingNow
                    ? "table-item-container table-item-playing"
                    : "table-item-container"
            }
            style={{
                gridTemplateColumns: `${
                    props.allSongs.length.toString().length + 0.5
                }em auto 1fr auto`,
            }}
            onClick={() => props.tableItemOnClick?.(songObject)}
        >
            <div className={"table-item-container-number"}>
                {props.allSongs.indexOf(songObject) + 1}
            </div>
            {props.albumArtEnabled ? albumArt() : null}
            <div className={"table-item-container-info"}>
                <div className={"table-item-container-info-title"}>
                    {"song_title" in songObject.file_metadata &&
                    songObject.file_metadata.song_title !== ""
                        ? songObject.file_metadata.song_title
                        : songObject.filename}
                </div>
                <div className={"table-item-container-info-details"}>
                    {EvaluateContainerDetails(props)}
                </div>
            </div>
            <div className={"table-item-container-actions"}>
                {props.customAction}
            </div>
        </div>
    );
};

export default TableItem;
