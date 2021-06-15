import { Redirect } from "react-router-dom";
import axios from "axios";
import useAxios from "axios-hooks";
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

const song_columns = [{ title: "Name", field: "file_metadata.song_title" }];

const LinkGDrive = () => {
    const [tableData, setTableData] = useState<any>([]);

    const { data, loading } = useAxiosPOST(
        "/api/driveapi/authurl",
        {},
        localStorage.token
    );

    const [
        {
            data: driveFilesData,
            loading: driveFilesLoading,
            error: driveFilesError,
        },
        driveFilesRefetch,
    ] = useAxios({
        url: "/api/driveapi/files/scan",
        method: "POST",
        data: {
            folder_only: false,
        },
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

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

    function updateUserIndex(data: any) {
        if (data.length === 0) return;

        let formattedData = {};
        for (let i = 0; i < data.length; i++) {
            let currentID = data[i].id;
            formattedData = {
                ...formattedData,
                [currentID]: data[i],
            };
        }
        formattedData = {
            files: { ...formattedData },
        };
        axios.post("/api/indexes/files", formattedData, {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        });
    }

    useEffect(() => {
        if (
            driveFilesLoading ||
            driveFilesError ||
            indexFilesLoading ||
            indexFilesError
        )
            return;
        let driveFiles = driveFilesData.files;
        let indexFiles = indexFilesData.files;
        let newTableData = []; //Reformat data so it can be put into table and updated to user index.
        let driveFilesKeys = Object.keys(driveFiles);
        let indexFilesKeys = Object.keys(indexFiles);
        let onlyNewFiles = true;
        for (let i = 0; i < driveFilesKeys.length; i++) {
            if (
                indexFilesKeys.includes(driveFiles[driveFilesKeys[i]].id) &&
                onlyNewFiles
            ) {
                continue;
            }
            let currentItem = driveFiles[driveFilesKeys[i]];
            let formattedItem = {
                ...currentItem,
                file_metadata: {
                    album_track_no: 0,
                    song_title: currentItem.filename.split(".")[0],
                    song_artistid: "",
                    song_albumid: "",
                    song_genreid: "",
                    song_comment: "",
                },
            };
            newTableData.push(formattedItem);
        }
        setTableData(newTableData);
    }, [driveFilesData, driveFilesLoading, indexFilesData, indexFilesLoading]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data == null || typeof (data as any).url === "undefined") {
        return <Redirect to="/" />;
    }

    return (
        <div>
            <a href={(data as any).url} target="_blank" rel="noreferrer">
                <button>Click here to link GDrive</button>
            </a>
            <button onClick={() => driveFilesRefetch()}>
                Update GDrive data
            </button>
            <button
                onClick={() => {
                    updateUserIndex(tableData);
                }}
            >
                Update user index with new GDdrive data
            </button>
            <div
                className="add-songs"
                style={{ display: "flex", flexDirection: "column" }}
            >
                <MaterialTable
                    icons={tableIcons}
                    columns={song_columns}
                    data={tableData}
                    title="New Music files in your google drive that don't exist in your file index"
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
