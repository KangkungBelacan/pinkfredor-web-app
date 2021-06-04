import MaterialTable from "material-table";

import { forwardRef } from "react";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import React, {useRef, useEffect} from "react";

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

function useTraceUpdate(props:any) {
    const prev = useRef(props);
    useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps:any, [k, v]:any) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.log("Changed props:", changedProps);
        }
        prev.current = props;
    });
}

const OSBTracksMTable = (mtableProps: any) => {
    useTraceUpdate(mtableProps);
    return (
        <MaterialTable
            icons={tableIcons}
            columns={[
                {
                    title: "file_id",
                    field: "file_id",
                    hidden: true
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
                                                drive_location: props.data.driveLocation,
                                                track_title: props.data.trackTitle,
                                                track_artist:props.data.trackArtist ,
                                                track_album: props.data.trackAlbum,
                                                album_tr_no: props.data.trackAlbumTrNo,
                                                track_genre: props.data.trackGenre,
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
