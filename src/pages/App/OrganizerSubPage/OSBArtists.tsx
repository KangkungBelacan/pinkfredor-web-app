import MaterialTable from "material-table";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
const OSBArtists = (props: any) => {
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
            />
        </div>
    );
};

export default OSBArtists;
