import MaterialTable from "material-table";
import { useState } from "react";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import EditArtistModal from "../../../components/MainApp/OrganizerSubComponent/EditArtistModal";
const OSBArtists = (props: any) => {
    const [showModal, setshowModal] = useState(false);
    const [rowData, setRowData] = useState<{
        artist_id: string;
        artist_name: string;
    }>({ artist_id: "", artist_name: "" });
    let t_data: any = [];
    let artistIds = Object.keys(props.API_DATA.indexesData.artists);
    let artistLookUpObject: any = {};
    for (let i = 0; i < artistIds.length; i++) {
        t_data.push({
            artist_id: artistIds[i],
            rowNum: i + 1,
            artistName: artistIds[i],
        });
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
                artist_t_data_display={t_data}
            />
            <MaterialTable
                columns={[
                    {
                        title: "artist_id",
                        field: "artist_id",
                        hidden: true,
                    },
                    { title: "No.", field: "rowNum" },
                    {
                        title: "Artist Name",
                        field: "artistName",
                        lookup: artistLookUpObject,
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
                        artist_name: rowData?.artistName
                    });
                    setshowModal(true);
                }}
            />
        </div>
    );
};

export default OSBArtists;
