import { Redirect } from "react-router-dom";
import { useAxiosPOST } from "./../../global-imports";
import { forwardRef, useState, useEffect } from "react";
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

import PlayArrow from "@material-ui/icons/PlayArrow";
import Queue from "@material-ui/icons/Queue";

import { Icons } from "material-table";

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

const song_columns = [
    { title: "Name", field: "title" },
    { title: "File size", field: "size" },
    { title: "Parent directory", field: "parentDirectory" },
    { title: "Format", field: "format" },
];

const LinkGDrive = () => {
    useEffect(() => {
        getGDriveData(false);
    }, []);

    const axios = require("axios").default;
    const [gDriveData, setGDriveData] = useState<any[]>([]);

    const { data, loading } = useAxiosPOST(
        "/api/driveapi/authurl",
        {},
        localStorage.token
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data == null || typeof (data as any).url === "undefined") {
        return <Redirect to="/" />;
    }

    function getGDriveData(shouldReturn: boolean) {
        return new Promise((resolve) => {
            let postData = {
                folder_only: false,
            };

            let axiosConfig = {
                headers: {
                    accept: "*/*",
                    Authorization: "Bearer " + localStorage.token,
                    "Content-Type": "application/json; charset=utf-8",
                },
            };

            axios
                .post("/api/driveapi/files/scan", postData, axiosConfig)
                .then(async (response: any) => {
                    postData.folder_only = true;
                    let folderData = await axios.post(
                        "/api/driveapi/files/scan",
                        postData,
                        axiosConfig
                    );
                    let data: any = response.data.files;
                    let dataKeys = Object.keys(data);
                    for (let i = 0; i < dataKeys.length; i++) {
                        let parentDirectory = "/";
                        if (data[dataKeys[i]].parents.length != 0) {
                            for (
                                let j = data[dataKeys[i]].parents.length - 1;
                                j > -1;
                                j--
                            ) {
                                if (
                                    data[dataKeys[i]].parents[j] !== undefined
                                ) {
                                    parentDirectory +=
                                        folderData.data[
                                            data[dataKeys[i]].parents[j]
                                        ].folder_name + "/";
                                }
                            }
                        }
                        let titleSplit = data[dataKeys[i]].filename.split(".");
                        data[dataKeys[i]] = {
                            ...data[dataKeys[i]],
                            title: titleSplit[0],
                            mbSize:
                                (data[dataKeys[i]].size / 1024 / 1024).toFixed(
                                    2
                                ) + " MB",
                            parentDirectory: parentDirectory,
                            format: titleSplit[1],
                        };
                    }

                    if (shouldReturn) {
                        resolve(data);
                    } else {
                        let dataValues: any = [];
                        for (let i = 0; i < dataKeys.length; i++) {
                            dataValues.push(data[dataKeys[i]]);
                        }
                        setGDriveData(dataValues);
                    }
                });
        });
    }

    function updateUserIndex() {
        axios({
            url: "/api/indexes/files",
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
            .then(async (response: any) => {
                let existingIndexFiles = response.data.files;
                let existingIndexFilesKeys = Object.keys(existingIndexFiles);

                getGDriveData(true)
                    .then((response: any) => {
                        let driveFiles = response;
                        let driveFilesKeys = Object.keys(driveFiles as any);
                        let newFiles = [];
                        for (let i = 0; i < driveFilesKeys.length; i++) {
                            if (
                                existingIndexFilesKeys.includes(
                                    driveFilesKeys[i]
                                )
                            ) {
                                // If file is already in index
                                continue;
                            } else if (
                                !existingIndexFilesKeys.includes(
                                    driveFilesKeys[i]
                                )
                            ) {
                                // If file does not exist in index
                                newFiles.push(driveFiles[driveFilesKeys[i]]);
                            }
                        }
                        let newFilesObject = {};
                        for (let i = 0; i < newFiles.length; i++) {
                            let driveFile = newFiles[i];
                            newFilesObject = {
                                ...newFilesObject,
                                [driveFile.id]: {
                                    id: driveFile.id,
                                    filename: driveFile.filename,
                                    parents: driveFile.parents,
                                    size: driveFile.size,
                                    file_metadata: {
                                        album_track_no: 0,
                                        song_title: driveFile.title,
                                        song_artistid: "",
                                        song_albumid: "",
                                        song_genreid: "",
                                        song_comment: "",
                                    },
                                },
                            };
                        } // for loop ends
                        newFilesObject = {
                            files: {
                                ...newFilesObject,
                            },
                        };
                        axios({
                            url: "/api/indexes/files",
                            method: "POST",
                            headers: {
                                Authorization: `Bearer ${localStorage.token}`,
                            },
                            data: newFilesObject,
                        })
                            .then((response: any) => {
                                console.log(response);
                            })
                            .catch((error: any) => {
                                console.log(error);
                            });
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            })
            .catch((error: any) => {
                getGDriveData(true).then((response: any) => {
                    let driveFiles = response;
                    let driveFilesKeys = Object.keys(driveFiles as any);
                    let newFiles: any = [];
                    let newFilesObject = {};
                    for (let i = 0; i < newFiles.length; i++) {
                        let driveFile = driveFiles[driveFilesKeys[i]];
                        newFilesObject = {
                            ...newFilesObject,
                            [driveFile.id]: {
                                id: driveFile.id,
                                filename: driveFile.filename,
                                parents: driveFile.parents,
                                size: driveFile.size,
                                file_metadata: {
                                    album_track_no: 0,
                                    song_title: driveFile.title,
                                    song_artistid: "",
                                    song_albumid: "",
                                    song_genreid: "",
                                    song_comment: "",
                                },
                            },
                        };
                    } // for loop ends
                    newFilesObject = {
                        files: {
                            ...newFilesObject,
                        },
                    };
                    axios({
                        url: "/api/indexes/files",
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.token}`,
                        },
                        data: newFilesObject,
                    })
                        .then((response: any) => {
                            console.log(response);
                        })
                        .catch((error: any) => {
                            console.log(error);
                        });
                });
            });
    }

    return (
        <div>
            <a href={(data as any).url} target="_blank" rel="noreferrer">
                <button>Click here to link GDrive</button>
            </a>
            <button onClick={() => getGDriveData(false)}>
                Update GDrive data
            </button>
            <button onClick={updateUserIndex}>
                Update user index with new GDdrive data
            </button>
            <div
                className="add-songs"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <MaterialTable
                    icons={tableIcons}
                    columns={song_columns}
                    data={gDriveData}
                    title="Music files in your google drive"
                    actions={[
                        {
                            icon: MoreVert,
                            tooltip: "More Options",
                            onClick: (event, rowData) => {
                                console.log(rowData);
                                window.alert(
                                    "You clicked on " +
                                        (rowData as any).filename +
                                        " Action: " +
                                        event.currentTarget.id
                                );
                            },
                        },
                    ]}
                    components={{
                        Action: (props) => (
                            <Dropdown as={ButtonGroup}>
                                <Button
                                    id="addtoindex"
                                    onClick={(event) =>
                                        props.action.onClick(event, props.data)
                                    }
                                    variant="success"
                                >
                                    Add
                                </Button>

                                <Dropdown.Toggle
                                    split
                                    variant="success"
                                    id="dropdown-split-basic"
                                />

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        id="hide"
                                        onClick={(event) =>
                                            props.action.onClick(
                                                event,
                                                props.data
                                            )
                                        }
                                    >
                                        Hide from view
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
    );
};

export default LinkGDrive;
