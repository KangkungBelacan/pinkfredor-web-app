import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import EditArtistModal from "../../../components/MainApp/OrganizerSubComponent/EditArtistModal";
import useAxios from "axios-hooks";
const OSBArtists = (props: any) => {
    const [showModal, setshowModal] = useState(false);
    const [rowData, setRowData] = useState<{
        artist_id: string;
        artist_name: string;
        artist_art?: any;
    }>({ artist_id: "", artist_name: "" });
    const [t_data, set_t_data] = useState<any>([]);
    const [{data: artistsData, loading: artistsLoading, error: artistsError}, artistsRefetch] = useAxios({
        url: "/api/indexes/artists",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`
        }
    });
    useEffect(() => {
        if(artistsLoading) {
            return;
        }
        let inner_t_data: any = [];
        let artistIds = Object.keys(artistsData.artists);
        for (let i = 0; i < artistIds.length; i++) {
            inner_t_data.push({
                artist_id: artistIds[i],
                rowNum: i + 1,
                artistName:
                    artistsData.artists[artistIds[i]]
                        .artist_name,
                artist_art: JSON.stringify(
                    artistsData.artists[artistIds[i]]
                        .artist_art
                ),
            });
        }
        if (t_data.length === 0) {
            set_t_data(inner_t_data);
        }
    }, [t_data, artistsData, artistsLoading]);

    return artistsLoading ? (
        <div>Loading...</div>
    ) : (
        <div
            className={props.className === undefined ? "" : props.className}
            style={props.style ? props.style : {}}
        >
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
                    { title: "Albums", field: "albumCount" },
                    { title: "Tracks", field: "trackCount" },
                ]}
                data={t_data}
                title="Artists"
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
