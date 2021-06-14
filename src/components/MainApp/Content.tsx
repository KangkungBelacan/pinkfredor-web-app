// import ReactDOM from 'react-dom'
import React, { forwardRef, useState, useEffect } from "react";
import "./Content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MaterialTable from "material-table";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

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
import MoreVert from "@material-ui/icons/MoreVert";

// import PlayArrow from "@material-ui/icons/PlayArrow";
// import Queue from "@material-ui/icons/Queue";

import { Icons } from "material-table";
import MusicPlayerContext from "../../context/MusicPlayerContext";

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
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

interface Element {}

function Content(props: any): JSX.Element {
    useEffect(() => {
        getUserIndex(false);
    }, []);

    const axios = require("axios").default;

    const {
        status,
        setStatus,
        nowPlayingURL,
        setNowPlayingURL,
        progress,
        setProgress,
        volume,
        setVolume,
        queue,
        setQueue,
    } = React.useContext(MusicPlayerContext);

    const song_columns = [
        { title: "file_id", field: "file_id", hidden: true },
        { title: "Title", field: "title" },
        { title: "Length", field: "length", editable: "never" as const },
        { title: "Artist", field: "artist" },
        { title: "Album", field: "album" },
    ];

    function getUserIndex(shouldReturn: boolean) {
        return new Promise((resolve) => {
            axios({
                url: "/api/indexes/files",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            })
                .then(async (response: any) => {
                    let data: any = response.data.files;
                    let dataKeys = Object.keys(data);
                    for (let i = 0; i < dataKeys.length; i++) {
                        let titleSplit = data[dataKeys[i]].filename.split(".");
                        data[dataKeys[i]] = {
                            ...data[dataKeys[i]],
                            title: titleSplit[0],
                            mbSize:
                                (data[dataKeys[i]].size / 1024 / 1024).toFixed(
                                    2
                                ) + " MB",
                            format: titleSplit[1],
                        };
                    }

                    if (shouldReturn) {
                        resolve(data);
                    } else {
                        let dataValues: any = [];
                        for (let i = 0; i < dataKeys.length; i++) {
                            let insert_this_data = data[dataKeys[i]];
                            insert_this_data.file_id = dataKeys[i];
                            dataValues.push(insert_this_data);
                        }
                        setSongsTableData(dataValues);
                        console.log(dataValues);
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                });
        });
    }

    const [topBarSelection, setTopBar] = useState(0);
    const [songsTableData, setSongsTableData] = useState([]);

    return (
        <div
            className="container-fluid mainapp-content-container
            style={{ color: "#ffffff" }}
        >
            <div className="row content-top-bar col-12">
                {/* Only show when screen size is small */}
                <div className="d-sm-block d-md-none col-sm-2 col-12">
                    <div
                        style={{ padding: "10px", cursor: "pointer" }}
                        onClick={() => props.setNavBar(!props.navBarState)}
                    >
                        <FontAwesomeIcon icon="align-justify" />
                    </div>
                </div>
                <div className="col-sm-8 col-md-10 col-12">
                    <div
                        className={
                            topBarSelection === 1
                                ? "content-top-bar-items-container selected"
                                : "content-top-bar-items-container"
                        }
                        onClick={() => {
                            setTopBar(1);
                        }}
                    >
                        All songs
                    </div>
                    <div
                        className={
                            topBarSelection === 2
                                ? "content-top-bar-items-container selected"
                                : "content-top-bar-items-container"
                        }
                        onClick={() => {
                            setTopBar(2);
                        }}
                    >
                        Artists
                    </div>
                    <div
                        className={
                            topBarSelection === 3
                                ? "content-top-bar-items-container selected"
                                : "content-top-bar-items-container"
                        }
                        onClick={() => {
                            setTopBar(3);
                        }}
                    >
                        Albums
                    </div>
                    <div
                        className={
                            topBarSelection === 4
                                ? "content-top-bar-items-container selected"
                                : "content-top-bar-items-container"
                        }
                        onClick={() => {
                            setTopBar(4);
                        }}
                    >
                        Genres
                    </div>
                </div>
                <div
                    className="songs-section"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <MaterialTable
                        icons={tableIcons}
                        columns={song_columns}
                        data={songsTableData}
                        title="Songs"
                        actions={[
                            {
                                icon: MoreVert,
                                tooltip: "More Options",
                                onClick: (event, rowData: any) => {
                                    const possibleAction = [
                                        "addToQ",
                                        "playNext",
                                        "addToPlaylist",
                                        "play",
                                    ];

                                    setProgress(0);
                                    setNowPlayingURL(
                                        `/api/driveapi/files/download?token=${localStorage.token}&fileid=${rowData.file_id}`
                                    );
                                    setStatus("PLAYING");

                                    // console.log(rowData);
                                    // window.alert(
                                    //     "You clicked on " +
                                    //         (rowData as any).title +
                                    //         " Action: " +
                                    //         event.currentTarget.id
                                    // );
                                },
                            },
                        ]}
                        components={{
                            Action: (props) => (
                                <Dropdown as={ButtonGroup}>
                                    <Button
                                        id="play"
                                        onClick={(event) =>
                                            props.action.onClick(
                                                event,
                                                props.data
                                            )
                                        }
                                        variant="success"
                                    >
                                        Play
                                    </Button>

                                    <Dropdown.Toggle
                                        split
                                        variant="success"
                                        id="dropdown-split-basic"
                                    />

                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            id="addToQ"
                                            onClick={(event) =>
                                                props.action.onClick(
                                                    event,
                                                    props.data
                                                )
                                            }
                                        >
                                            Add to queue
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            id="playNext"
                                            onClick={(event) =>
                                                props.action.onClick(
                                                    event,
                                                    props.data
                                                )
                                            }
                                        >
                                            Play next
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                            id="addToPlaylist"
                                            onClick={(event) =>
                                                props.action.onClick(
                                                    event,
                                                    props.data
                                                )
                                            }
                                        >
                                            Add to playlist
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            ),
                        }}
                        options={{
                            actionsColumnIndex: -1,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
export default Content;
