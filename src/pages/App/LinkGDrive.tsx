import React, { useEffect, useRef, useState } from "react";
import "./LinkGDrive.css";
import MaterialTable from "material-table";
import TABLE_ICONS from "../../components/generic/MaterialTableIcons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAxiosPOST } from "../../global-imports";
import useAxios from "axios-hooks";
import useUnindexedDriveFiles from "../../custom-hooks/useUnindexedDriveFiles";
import MusicPlayerContext from "../../context/MusicPlayerContext";
const LinkGDrive = () => {
    const tableRef = useRef<any>();
    const [statusText, setStatusText] = useState<string>("");
    const [driveLinkState, setDriveLinkState] = useState<
        "" | "linked" | "linking" | "unlinked" | "unlinking"
    >("");
    const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
    const [loadText, setLoadText] = useState<string>("Load");
    const [loadAllText, setLoadAllText] = useState<string>("Load All");
    const {
        setStatus,
        setNowPlayingURL,
        setProgress,
        queue,
        setQueue,
        setSongTitleLabel,
        setSongArtistLabel,
    } = React.useContext(MusicPlayerContext);
    /**
     *
     * @param getAll (Optional) set to true to get all row's data ignoring if its checked or not
     * @returns
     */
    const getSelectedRowsData = (getAll = false) => {
        let selected_row_data = [];
        let row_data = tableRef.current.props.data;
        if (getAll) {
            return tableRef.current.dataManager.data;
        }
        for (let i = 0; i < row_data.length; i++) {
            let item = row_data[i];
            if (
                item.tableData.checked !== undefined &&
                item.tableData.checked
            ) {
                selected_row_data.push(
                    tableRef.current.dataManager.data[item.tableData.id]
                );
            }
        }
        return selected_row_data;
    };

    const [
        {
            data: driveApiUrl,
            loading: driveApiUrlLoading,
            error: driveApiUrlErr,
        },
        _,
    ] = useAxios(
        {
            url: "/api/driveapi/authurl",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        },
        { useCache: false }
    );

    const [
        {
            data: driveUserInfoData,
            loading: driveUserInfoLoading,
            error: driveUserInfoErr,
        },
        driveUserInfoRefetch,
    ] = useAxios(
        {
            url: "/api/driveapi/user_info",
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        },
        { useCache: false }
    );

    const [filesData, folderData, filesLoading] = useUnindexedDriveFiles();
    const [t_data, set_t_data] = useState<any>(null);
    useEffect(() => {
        if (driveUserInfoLoading) {
            return;
        }

        if (
            driveUserInfoErr?.response?.status === 404 ||
            driveUserInfoErr?.response?.status === 401
        ) {
            setStatusText("Status: Unlinked");
            setDriveLinkState("unlinked");
        } else {
            setStatusText(
                `Status: Linked (Account: ${driveUserInfoData.email})`
            );
            setDriveLinkState("linked");
        }

        if (filesLoading) {
            return;
        }
        set_t_data(getFilesDataTableDisplayData());
    }, [driveUserInfoLoading, filesLoading]);

    const unlinkGDrive = () => {
        setDriveLinkState("unlinking");
        fetch("/api/driveapi/deauth", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
            .then((response: any) => {
                alert("Successfully unlinked");
                setStatusText("Status: Unlinked");
                setDriveLinkState("unlinked");
                set_t_data([]);
            })
            .catch((err: any) => {
                alert("Something went wrong.");
            });
    };

    const getFilePathString = (fileid: string) => {
        let file_item = filesData.files[fileid];
        let parent_path = "/";
        if (file_item.parents !== undefined) {
            let _parents = [...file_item.parents];
            while (_parents.length !== 0) {
                let parent_id = _parents.pop();
                if (folderData[parent_id] !== undefined) {
                    parent_path += folderData[parent_id].folder_name + "/";
                }
            }
        }
        return parent_path;
    };

    /**
     * Get table data needed to be output into the table
     */
    const getFilesDataTableDisplayData = () => {
        let t_data = [];
        if (filesData == undefined || filesData.files == undefined) {
            return [];
        }
        let keys = Object.keys(filesData.files);
        for (let i = 0; i < keys.length; i++) {
            let fileItem = filesData.files[keys[i]];
            t_data.push({
                id: fileItem.id,
                filename: fileItem.filename,
                path: getFilePathString(fileItem.id),
                date_uploaded: fileItem.createdTime,
            });
        }
        return t_data;
    };

    const loadFilesOnClick = async (loadAll: boolean) => {
        // Get file id of the selected rows
        let selectedRows: any = [];
        if (loadAll) {
            selectedRows = getSelectedRowsData(true);
        } else {
            selectedRows = getSelectedRowsData();
        }

        if(selectedRows.length === 0) {
            alert("There is no files to load")
            return;
        }

        let files_payload: any = { files: {} };
        for (let i = 0; i < selectedRows.length; i++) {
            files_payload.files[selectedRows[i].id] =
                filesData.files[selectedRows[i].id];
        }

        try {
            await fetch("/api/indexes/files", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.token}`,
                },
                body: JSON.stringify(files_payload),
            });
        } catch (err: any) {
            console.error(err);
            return;
        }

        let fileid = selectedRows.map((e: any) => e.id);
        // Remove data from display table
        let _t_data = [...t_data];
        _t_data = _t_data.filter((e: any) => !fileid.includes(e.id));
        set_t_data(_t_data);
        alert(`Successfully loaded ${selectedRows.length} file(s)`)
    };

    return (
        <div className="mainapp-content-container">
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "5fr 1fr",
                    gridTemplateRows: "auto auto 1fr",
                    rowGap: "10px",
                    color: "white",
                    paddingTop: "10px",
                }}
            >
                {driveUserInfoLoading || driveApiUrlLoading ? (
                    <div
                        style={{
                            gridColumn: "span 2",
                        }}
                    >
                        Loading...
                    </div>
                ) : (
                    <div
                        style={{
                            gridColumn: "span 2",
                        }}
                    >
                        <div
                            style={{
                                display: "inline",
                                fontSize: "large",
                            }}
                        >
                            {statusText}
                        </div>
                        <Button
                            variant="success"
                            style={{
                                marginLeft: "10px",
                                display:
                                    driveLinkState === "unlinked"
                                        ? "inline-block"
                                        : "none",
                            }}
                            size="sm"
                            href={(driveApiUrl as any).url}
                            target="_blank"
                        >
                            <FontAwesomeIcon
                                icon="link"
                                style={{ marginRight: "5px" }}
                                onClick={() => {
                                    setDriveLinkState("linking");
                                }}
                            />
                            Link
                        </Button>

                        <Button
                            variant="danger"
                            style={{
                                marginLeft: "10px",
                                display:
                                    driveLinkState === "linked"
                                        ? "inline-block"
                                        : "none",
                            }}
                            size="sm"
                            onClick={unlinkGDrive}
                        >
                            <FontAwesomeIcon
                                icon="unlink"
                                style={{ marginRight: "5px" }}
                            />
                            Unlink
                        </Button>
                        <Button
                            variant="secondary"
                            style={{
                                marginLeft: "10px",
                                display:
                                    driveLinkState === "linking" ||
                                    driveLinkState === "unlinking"
                                        ? "inline-block"
                                        : "none",
                            }}
                            size="sm"
                        >
                            <FontAwesomeIcon
                                icon="spinner"
                                style={{
                                    marginRight: "5px",
                                    animation: "spin 1s linear infinite",
                                }}
                            />
                            {driveLinkState === "linking"
                                ? "Linking"
                                : "Unlinking"}
                        </Button>
                    </div>
                )}

                <div></div>
                <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                    <Button
                        variant={isLoadingFiles ? "secondary" : "success"}
                        onClick={() => {
                            if (isLoadingFiles) return;
                            setIsLoadingFiles(true)
                            setLoadAllText("Loading");
                            loadFilesOnClick(true).then((_) => {
                                setLoadAllText("Load All");
                                setIsLoadingFiles(false)
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={loadAllText === "Loading" ? "spinner" : "angle-double-down"}
                            style={{ marginRight: "5px", animation: loadAllText === "Loading" ? "spin 1s linear infinite" : "none" }}
                        />
                        {loadAllText}
                    </Button>
                    <Button
                        variant={isLoadingFiles ? "secondary" : "success"}
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                            if (isLoadingFiles) return;
                            setIsLoadingFiles(true)
                            setLoadText("Loading");
                            loadFilesOnClick(false).then((_) => {
                                setLoadText("Load");
                                setIsLoadingFiles(false)
                            });
                        }}
                    >
                        <FontAwesomeIcon
                            icon={loadText === "Loading" ? "spinner" : "download"}
                            style={{ marginRight: "5px", animation: loadText === "Loading" ? "spin 1s linear infinite" : "none" }}
                        />
                        {loadText}
                    </Button>
                </div>
                {t_data === null ? (
                    <div
                        style={{
                            gridColumn: "span 2",
                        }}
                    >
                        Loading...
                    </div>
                ) : (
                    <div
                        style={{
                            gridColumn: "span 2",
                        }}
                    >
                        <MaterialTable
                            tableRef={tableRef}
                            icons={TABLE_ICONS}
                            columns={[
                                { title: "id", field: "id", hidden: true },
                                {
                                    title: "Filename",
                                    field: "filename",
                                },
                                {
                                    title: "Path",
                                    field: "path",
                                },
                                {
                                    title: "Date uploaded",
                                    field: "date_uploaded",
                                    type: "date",
                                },
                            ]}
                            data={t_data}
                            options={{
                                selection: true,
                                selectionProps: (rowData: any) => ({
                                    color: "primary",
                                }),
                                // paging: false,
                            }}
                            title={`Detected ${t_data.length} Music Files`}
                            actions={[
                                {
                                    icon: () => (
                                        <FontAwesomeIcon
                                            size="xs"
                                            icon="play"
                                        />
                                    ),
                                    tooltip: "Preview",
                                    position: "row",
                                    onClick: (event, rowData) => {
                                        // console.log((rowData as any).id);
                                        console.log(
                                            `/api/driveapi/files/download?token=${localStorage.getItem(
                                                "token"
                                            )}&fileid=${(rowData as any).id}`
                                        );
                                        setNowPlayingURL(
                                            `/api/driveapi/files/download?token=${localStorage.getItem(
                                                "token"
                                            )}&fileid=${(rowData as any).id}`
                                        );
                                        setSongTitleLabel(
                                            (rowData as any).filename
                                        );
                                        setSongArtistLabel(
                                            (rowData as any).path
                                        );
                                        setStatus("PLAYING");
                                    },
                                },
                            ]}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default LinkGDrive;
