import React, { useEffect, useRef, useState } from "react";
import "./LinkGDrive.css";
import MaterialTable from "material-table";
import TABLE_ICONS from "../../components/generic/MaterialTableIcons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAxiosPOST } from "../../global-imports";
import useAxios from "axios-hooks";
import useUnindexedDriveFiles from "../../custom-hooks/useUnindexedDriveFiles";
const LinkGDrive = () => {
    const tableRef = useRef<any>();
    const [statusText, setStatusText] = useState<string>("");
    const [driveLinkState, setDriveLinkState] = useState<
        "" | "linked" | "linking" | "unlinked" | "unlinking"
    >("");
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

        if (driveUserInfoErr?.response?.status === 404 || driveUserInfoErr?.response?.status === 401) {
            setStatusText("Status: Unlinked");
            setDriveLinkState("unlinked");
        } else {
            setStatusText(`Status: Linked (Account: ${driveUserInfoData.email})`);
            setDriveLinkState("linked");
        }

        if(filesLoading) {
            return;
        }
        set_t_data(getFilesDataTableDisplayData())

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
            })
            .catch((err: any) => {
                alert("Something went wrong.");
            });
    };

    const getFilePathString = (fileid: string) => {
        let file_item = filesData.files[fileid];
        let parent_path = "/";
        if (file_item.parents !== undefined) {
            while (file_item.parents.length !== 0) {
                let parent_id = file_item.parents.pop();
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
        let keys = Object.keys(filesData.files);
        for (let i = 0; i < keys.length; i++) {
            let fileItem = filesData.files[keys[i]];
            t_data.push({
                filename: fileItem.filename,
                path: getFilePathString(fileItem.id),
                date_uploaded: fileItem.createdTime,
            });
        }
        return t_data;
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
                        variant="success"
                        onClick={() => {
                            getSelectedRowsData(true);
                        }}
                    >
                        <FontAwesomeIcon
                            icon="angle-double-down"
                            style={{ marginRight: "5px" }}
                        />
                        Load All
                    </Button>
                    <Button
                        variant="success"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                            getSelectedRowsData();
                            console.log(filesData);
                        }}
                    >
                        <FontAwesomeIcon
                            icon="download"
                            style={{ marginRight: "5px" }}
                        />
                        Load
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
                                paging: false,
                            }}
                            title="Detected Music Files"
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
                                    onClick: (event, rowData) => {},
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
