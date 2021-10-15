import React from "react";
import "./LinkGDrive.css";
import MaterialTable from "material-table";
import TABLE_ICONS from "../../components/generic/MaterialTableIcons";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LinkGDrive = () => {
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
                    <Button
                        variant="success"
                        style={{ marginLeft: "10px" }}
                        size="sm"
                    >
                        <FontAwesomeIcon
                            icon="link"
                            style={{ marginRight: "5px" }}
                        />
                        Link
                    </Button>
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
                    <Button variant="success">
                        <FontAwesomeIcon
                            icon="angle-double-down"
                            style={{ marginRight: "5px" }}
                        />
                        Load All
                    </Button>
                    <Button variant="success" style={{ marginLeft: "10px" }}>
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
                        icons={TABLE_ICONS}
                        columns={[
                            // { title: "Name", field: "name" },
                            // { title: "Surname", field: "surname" },
                            // {
                            //     title: "Birth Year",
                            //     field: "birthYear",
                            //     type: "numeric",
                            // },
                            // {
                            //     title: "Birth Place",
                            //     field: "birthCity",
                            //     lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
                            // },
                            {
                                title: "Filename",
                                field: "filename",
                            },
                            {
                                title: "Path",
                                field: "path",
                            },
                        ]}
                        data={[
                            {
                                filename: "Song A.mp3",
                                path: "/music/",
                            },
                            {
                                filename: "Song B.mp3",
                                path: "/music/",
                            },
                        ]}
                        options={{
                            selection: true,
                            selectionProps: (rowData: any) => ({
                                color: "primary",
                            })
                        }}
                        title="Detected Music Files"
                    />
                </div>
            </div>
        </div>
    );
};

export default LinkGDrive;
