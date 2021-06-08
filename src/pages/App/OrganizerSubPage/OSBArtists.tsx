import MaterialTable from "material-table";
import { useEffect, useState } from "react";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import EditArtistModal from "../../../components/MainApp/OrganizerSubComponent/EditArtistModal";
const OSBArtists = (props: any) => {
    const [showModal, setshowModal] = useState(false);
    const [rowData, setRowData] = useState<{
        artist_id: string;
        artist_name: string;
        artist_art?: any;
    }>({ artist_id: "", artist_name: "" });
    const [t_data, set_t_data] = useState<any>([]);
    useEffect(() => {
        let inner_t_data:any = [];
        let artistIds = Object.keys(props.API_DATA.indexesData.artists);
        for (let i = 0; i < artistIds.length; i++) {
            inner_t_data.push({
                artist_id: artistIds[i],
                rowNum: i + 1,
                artistName: props.API_DATA.indexesData.artists[artistIds[i]].artist_name,
                artist_art: JSON.stringify(
                    props.API_DATA.indexesData.artists[artistIds[i]].artist_art
                ),
            });
        }
        if (t_data.length === 0) {
            set_t_data(inner_t_data);
        }
    }, [t_data, props.API_DATA.indexesData.artists]);

    let artistIds = Object.keys(props.API_DATA.indexesData.artists);
    let artistLookUpObject: any = {};
    for (let i = 0; i < artistIds.length; i++) {
        artistLookUpObject[artistIds[i]] =
            props.API_DATA.indexesData.artists[artistIds[i]].artist_name;
    }
    return (
        <div
            className={props.className === undefined ? "" : props.className}
            style={props.style ? props.style : {}}
        >
            <EditArtistModal
                show={showModal}
                setShow={setshowModal}
                row_data={rowData}
                files_indexes={props.API_DATA.indexesData.files}
                artists_indexes={props.API_DATA.indexesData.artists}
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
                        field: "artistName"
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
