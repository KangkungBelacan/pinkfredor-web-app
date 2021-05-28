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

const OSB_Tracks = () => {
    const [t_data, set_tdata] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            let config: any = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            };
            let files_response = await axios.get("/api/indexes/files", config);
            let scan_folder_response = await axios.post("/api/driveapi/files/scan", {folder_only: true}, config);
            // set_tdata(files_response.data);
            let keys = Object.keys(files_response.data.files);
            let t_data: any = [];
            for (let i = 0; i < keys.length; i++) {
                let file_item = files_response.data.files[keys[i]];
                let parent_path = "/";
                if(file_item.parents !== undefined) {
                    parent_path += scan_folder_response.data[file_item.parents.pop()].folder_name + "/";
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
            set_tdata(t_data);
            setLoading(false);
        };
        if (loading && !t_data) {
            run();
        }
    }, [loading, t_data]);

    return (
        <div style={{ maxWidth: "100%" }}>
            {loading ? (
                "Loading..."
            ) : (
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
                        },
                        {
                            title: "Album Track No.",
                            field: "trackAlbumTrNo",
                        },
                        {
                            title: "Album",
                            field: "trackAlbum",
                        },
                        {
                            title: "Genre",
                            field: "trackGenre",
                        },
                    ]}
                    data={t_data as any}
                    title="Tracks Listing"
                />
            )}
        </div>
    );
};

export default OSB_Tracks;
