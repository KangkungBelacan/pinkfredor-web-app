import "./CustomTable.css";
import React from "react";
import TableItem from "./TableItem";

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

// 1. i dont want album art (the color thing on the LHS)
// 2. Add additional options in actions
// 3. drag and drop (optional)
interface CustomTableProps {
    songs: SongObject[]; // Array of songs you want to display
    artists?: string[]; // Optional. Provide an array of artists to lookup the artist name with the artist id. Artist display will be disabled if not provided.
    albums?: string[]; // Optional. Provide an array of albums to lookup the album name with the album id. Album display will be disabled if not provided.
    albumArtEnabled?: boolean; // Enable album art, defaults to true
    customAction?: any; // Optional. Provide a custom action to be displayed in the actions column. No action will be displayed if not provided. Passes the song object as a prop.
    tableItemOnClick?: (song: SongObject) => void; // Optional. Provide a callback function to be called when a song is clicked.
}

const CustomTable = (props: CustomTableProps) => {
    let tbl_items = [];
    let songs = props.songs;
    for (let i = 0; i < songs.length; i++) {
        tbl_items.push(
            <TableItem
                key={i}
                songObject={songs[i]}
                allSongs={songs}
                artistsData={props.artists}
                albumsData={props.albums}
                customAction={props.customAction ? React.cloneElement(props.customAction, {songObject: songs[i]}) : null}
                albumArtEnabled={props.albumArtEnabled === undefined ? true : props.albumArtEnabled}
                tableItemOnClick={props.tableItemOnClick ? props.tableItemOnClick : null}
            />
        );
    }

    return (
        <div className={"table-container"}>
            <div className={"table-body"}>
                <div className={"table-column-titles"}>
                    <div className={"table-column-title-all-songs"}>
                        All Songs
                    </div>
                    {/*<div className={"table-column-title-albums"}>Albums</div>*/}
                    {props.customAction ? <div className={"table-column-title-action"}>Actions</div> : null}
                </div>
                {tbl_items}
            </div>
        </div>
    );
};

export default CustomTable;
