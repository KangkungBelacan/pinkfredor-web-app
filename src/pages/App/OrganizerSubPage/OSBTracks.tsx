import MaterialTable from "material-table";

import { forwardRef, useState, useEffect } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
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
import { Icons } from "material-table";
import { axios } from "../../../global-imports";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import React from "react";
import EditTrackModal from "../../../components/MainApp/OrganizerSubComponent/EditTrackModal";
const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
        <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const OSBTracks = (props: any) => {
    const [showEditModalBox, setShowEditModalBox] = useState(false);
    const [editModalRowData, seteditModalRowData] = useState({});
    
    let files_response = props.indexesData;
    let scan_folder_response = props.folderData;
    // set_tdata(files_response.data);
    let keys = Object.keys(files_response.files);
    let t_data: any = [];
    for (let i = 0; i < keys.length; i++) {
        let file_item = files_response.files[keys[i]];
        let parent_path = "/";
        if (file_item.parents !== undefined) {
            while (file_item.parents.length !== 0) {
                parent_path +=
                    scan_folder_response[file_item.parents.pop()]
                        .folder_name + "/";
            }
        }
        t_data.push({
            rowNum: i + 1,
            driveLocation: parent_path,
            fileName: file_item.filename,
            trackTitle:
                file_item.file_metadata.song_title === undefined
                    ? "-"
                    : file_item.file_metadata.song_title,
            trackArtist:
                file_item.file_metadata.song_artistid === undefined
                    ? "-"
                    : file_item.file_metadata.song_artistid,
            trackAlbumTrNo:
                file_item.file_metadata.album_track_no === undefined
                    ? "-"
                    : file_item.file_metadata.album_track_no,
            trackAlbum:
                file_item.file_metadata.song_albumid === undefined
                    ? "-"
                    : file_item.file_metadata.song_albumid,
            trackGenre:
                file_item.file_metadata.song_genreid === undefined
                    ? "-"
                    : file_item.file_metadata.song_genreid,
        });
    }

    let artistLookUpObject:any = { "-": "-" };
    let artistIds = Object.keys(props.indexesData.artists)
    for(let i = 0; i < artistIds.length; i++) {
        artistLookUpObject[artistIds[i]] = props.indexesData.artists[artistIds[i]].artist_name;
    }

    let albumLookUpObject:any = { "-": "-" };
    let albumIds = Object.keys(props.indexesData.albums)
    for(let i = 0; i < albumIds.length; i++) {
        albumLookUpObject[albumIds[i]] = props.indexesData.albums[albumIds[i]].album_name;
    }

    let genreLookUpObject:any = { "-": "-" };
    let genreIds = Object.keys(props.indexesData.genres)
    for(let i = 0; i < genreIds.length; i++) {
        genreLookUpObject[genreIds[i]] = props.indexesData.genres[genreIds[i]].genre_name;
    }

    let playlistLookUpObject:any = { "-": "-" };
    let playlistIds = Object.keys(props.indexesData.playlists)
    for(let i = 0; i < playlistIds.length; i++) {
        playlistLookUpObject[playlistIds[i]] = props.indexesData.playlists[playlistIds[i]].playlist_name;
    }

    return (
        <div style={{ maxWidth: "100%" }}>
            <div>
                <EditTrackModal
                    row_data={editModalRowData}
                    show={showEditModalBox}
                    setShow={setShowEditModalBox}
                />
                <MaterialTable
                    icons={tableIcons}
                    columns={[
                        { title: "No.", field: "rowNum" },
                        { title: "Filename", field: "fileName" },
                        {
                            title: "Drive Location",
                            field: "driveLocation",
                        },
                        {
                            title: "Title",
                            field: "trackTitle",
                        },
                        {
                            title: "Artist",
                            field: "trackArtist",
                            lookup: artistLookUpObject
                        },
                        {
                            title: "Album Track No.",
                            field: "trackAlbumTrNo"
                        },
                        {
                            title: "Album",
                            field: "trackAlbum",
                            lookup: albumLookUpObject
                        },
                        {
                            title: "Genre",
                            field: "trackGenre",
                            lookup: genreLookUpObject
                        },
                    ]}
                    data={t_data as any}
                    title="Tracks Listing"
                    components={{
                        Action: (props) => {
                            let toggleButton = React.forwardRef(
                                ({ children, onClick }: any, ref: any) => (
                                    <button
                                        className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                                        tabIndex={0}
                                        type="button"
                                        title="More Options"
                                        ref={ref}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClick(e);
                                        }}
                                    >
                                        {children}
                                        <span className="MuiIconButton-label">
                                            <FontAwesomeIcon
                                                icon="ellipsis-v"
                                                size="xs"
                                            />
                                        </span>
                                        <span className="MuiTouchRipple-root"></span>
                                    </button>
                                )
                            );

                            let moreOptionsMenu = React.forwardRef(
                                (
                                    {
                                        children,
                                        style,
                                        className,
                                        "aria-labelledby": labeledBy,
                                    }: any,
                                    ref: any
                                ) => {
                                    return (
                                        <div
                                            ref={ref}
                                            style={style}
                                            className={
                                                className +
                                                " bootstrap-drop-down-container"
                                            }
                                            aria-labelledby={labeledBy}
                                        >
                                            <ul
                                                className="list-unstyled"
                                                style={{
                                                    marginBottom: "0",
                                                }}
                                            >
                                                {children}
                                            </ul>
                                        </div>
                                    );
                                }
                            );

                            return (
                                <Dropdown>
                                    <Dropdown.Toggle
                                        as={toggleButton}
                                        id={"id"}
                                    ></Dropdown.Toggle>
                                    <Dropdown.Menu as={moreOptionsMenu}>
                                        <Dropdown.Item
                                            onClick={() => {
                                                seteditModalRowData({
                                                    // filename: props.
                                                    // drive_location
                                                    // track_title
                                                    // track_artist
                                                    // track_album
                                                    // album_tr_no
                                                    // track_genre
                                                });
                                                setShowEditModalBox(true);
                                            }}
                                            eventKey="1"
                                        >
                                            Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item eventKey="2">
                                            Hide
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            );
                        },
                    }}
                    actions={[
                        {
                            icon: () => <FontAwesomeIcon icon="ellipsis-v" />,
                            tooltip: "More Options",
                            onClick: (event, rowData) => {},
                        },
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                    }}
                />
            </div>
        </div>
    );
};

export default OSBTracks;
