import React, { useRef } from "react";
import "./LinkGDrive.css";
import MaterialTable from "material-table";
import TABLE_ICONS from "../../components/generic/MaterialTableIcons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAxiosPOST } from "../../global-imports";
const LinkGDrive = () => {
    const tableRef = useRef<any>();
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

    const { data: driveApiUrl, loading: driveApiUrlLoading } = useAxiosPOST(
        "/api/driveapi/authurl",
        {},
        localStorage.token
    );
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
                        Status: Unknown
                    </div>
                    {driveApiUrlLoading || !driveApiUrl ? (
                        ""
                    ) : (
                        <Button
                            variant="success"
                            style={{ marginLeft: "10px" }}
                            size="sm"
                            href={(driveApiUrl as any).url}
                            target="_blank"
                        >
                            <FontAwesomeIcon
                                icon="link"
                                style={{ marginRight: "5px" }}
                            />
                            Link
                        </Button>
                    )}
                    <Button
                        variant="danger"
                        style={{ marginLeft: "10px" }}
                        size="sm"
                    >
                        <FontAwesomeIcon
                            icon="link"
                            style={{ marginRight: "5px" }}
                        />
                        Unlink
                    </Button>
                    <Button
                        variant="secondary"
                        style={{
                            marginLeft: "10px",
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
                        Linking
                    </Button>
                </div>
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
                        }}
                    >
                        <FontAwesomeIcon
                            icon="download"
                            style={{ marginRight: "5px" }}
                        />
                        Load
                    </Button>
                </div>
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
                        data={[
                            {
                                filename: "Song A.mp3",
                                path: "/music/",
                                date_uploaded: "1/1/2021",
                            },
                            {
                                filename: "Song B.mp3",
                                path: "/music/",
                                date_uploaded: "1/1/2021",
                                very_complicated_data: {
                                    so_complicated: {
                                        omg: "pogger",
                                    },
                                },
                            },
                        ]}
                        options={{
                            selection: true,
                            selectionProps: (rowData: any) => ({
                                color: "primary",
                            }),
                        }}
                        title="Detected Music Files"
                    />
                </div>
            </div>
        </div>
    );
};

export default LinkGDrive;
