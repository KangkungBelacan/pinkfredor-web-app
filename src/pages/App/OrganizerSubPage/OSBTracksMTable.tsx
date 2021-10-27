import MaterialTable from "material-table";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import React from "react";

const OSBTracksMTable = (mtableProps: any) => {
    return (
        <MaterialTable
            icons={TABLE_ICONS}
            columns={[
                {
                    title: "file_id",
                    field: "file_id",
                    hidden: true,
                },
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
                    lookup: mtableProps.passedData.artistLookUpObject,
                },
                {
                    title: "Album Track No.",
                    field: "trackAlbumTrNo",
                },
                {
                    title: "Album",
                    field: "trackAlbum",
                    lookup: mtableProps.passedData.albumLookUpObject,
                },
                {
                    title: "Genre",
                    field: "trackGenre",
                    lookup: mtableProps.passedData.genreLookUpObject,
                },
            ]}
            data={mtableProps.t_data as any}
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
                                id={`DropdownEditTrack-${props.data.rowNum}`}
                            ></Dropdown.Toggle>
                            <Dropdown.Menu as={moreOptionsMenu}>
                                <Dropdown.Item
                                    onClick={() => {
                                        mtableProps.passedData.seteditModalRowData(
                                            {
                                                file_id: props.data.file_id,
                                                filename: props.data.fileName,
                                                drive_location:
                                                    props.data.driveLocation,
                                                track_title:
                                                    props.data.trackTitle,
                                                track_artist:
                                                    props.data.trackArtist,
                                                track_album:
                                                    props.data.trackAlbum,
                                                album_tr_no:
                                                    props.data.trackAlbumTrNo,
                                                track_genre:
                                                    props.data.trackGenre,
                                            }
                                        );
                                        mtableProps.passedData.setShowEditModalBox(
                                            true
                                        );
                                    }}
                                    eventKey="1"
                                >
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2">Hide</Dropdown.Item>
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
    );
};

export default OSBTracksMTable;
