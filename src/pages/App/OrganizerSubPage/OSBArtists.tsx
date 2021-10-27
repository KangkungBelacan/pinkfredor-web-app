import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import EditArtistModal from "../../../components/MainApp/OrganizerSubComponent/EditArtistModal";
import useAxios from "axios-hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddArtistModal from "../../../components/MainApp/OrganizerSubComponent/AddArtistModal";
import { Button } from "react-bootstrap";
import { axios } from "../../../global-imports";
const OSBArtists = (props: any) => {
    const [showModal, setshowModal] = useState(false);
    const [showAddModalBox, setshowAddModalBox] = useState(false);
    const [rowData, setRowData] = useState<{
        artist_id: string;
        artist_name: string;
        artist_art?: any;
    }>({ artist_id: "", artist_name: "" });
    const [t_data, set_t_data] = useState<any>([]);
    const [
        { data: artistsData, loading: artistsLoading, error: artistsError },
        artistsRefetch,
    ] = useAxios({
        url: "/api/indexes/artists",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    },
    { useCache: false });
    useEffect(() => {
        if (artistsLoading) {
            return;
        }
        let inner_t_data: any = [];
        let artistIds = Object.keys(artistsData.artists);
        for (let i = 0; i < artistIds.length; i++) {
            inner_t_data.push({
                artist_id: artistIds[i],
                rowNum: i + 1,
                artistName: artistsData.artists[artistIds[i]].artist_name,
                artist_art: JSON.stringify(
                    artistsData.artists[artistIds[i]].artist_art
                ),
            });
        }
        
        set_t_data(inner_t_data);
    }, [artistsData, artistsLoading]);

    return artistsLoading ? (
        <div>Loading...</div>
    ) : artistsError ? (
        <div>
            An error occured
            <br />
            Please try again later
        </div>
    ) : (
        <div
            className={props.className === undefined ? "" : props.className}
            style={props.style ? props.style : {}}
        >
            <AddArtistModal
                show={showAddModalBox}
                setShow={setshowAddModalBox}
                t_data={t_data}
                set_t_data={set_t_data}
            />
            <EditArtistModal
                show={showModal}
                setShow={setshowModal}
                row_data={rowData}
                artists_indexes={artistsData.artists}
                artist_t_data_display={t_data}
                set_artist_t_data_display={set_t_data}
            />
            <MaterialTable
                columns={[
                    {
                        title: "artist_id",
                        field: "artist_id",
                        hidden: true,
                    },
                    {
                        title: "artist_art",
                        field: "artist_art",
                        hidden: true,
                    },
                    { title: "No.", field: "rowNum" },
                    {
                        title: "Artist Name",
                        field: "artistName",
                    },
                ]}
                data={t_data}
                editable={{
                    onRowDelete: (oldData: any) =>
                        new Promise((resolve, reject) => {
                            let aid = oldData.artist_id;
                            axios({
                                url: `/api/indexes/artists/${aid}`,
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${localStorage.token}`,
                                },
                            })
                                .then((response: any) => {
                                    const dataDelete = [...t_data];
                                    const index = oldData.tableData.id;
                                    dataDelete.splice(index, 1);
                                    set_t_data([...dataDelete]);
                                    resolve(true);
                                })
                                .catch((error: any) => {
                                    console.error(error);
                                    alert("Unable to remove this artist");
                                    reject();
                                });
                        }),
                }}
                title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h6
                            className="MuiTypography-root MuiTypography-h6"
                            style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "inline",
                            }}
                        >
                            Artist
                        </h6>
                        <Button
                            size="sm"
                            style={{ marginLeft: "10px" }}
                            onClick={() => {
                                setshowAddModalBox(true);
                            }}
                        >
                            <FontAwesomeIcon size="xs" icon={"plus"} />
                        </Button>
                    </div>
                }
                // title="Artist"
                icons={TABLE_ICONS}
                onRowClick={(event, rowData, togglePanel) => {
                    setRowData({
                        artist_id: rowData?.artist_id,
                        artist_name: rowData?.artistName,
                        artist_art: rowData?.artist_art,
                    });
                    setshowModal(true);
                }}
            />
        </div>
    );
};

export default OSBArtists;
