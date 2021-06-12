import MaterialTable from "material-table";
import useAxios from "axios-hooks";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import { useEffect, useState } from "react";
const OSBAlbums = () => {
    const [
        { data: indexesData, loading: indexesLoading, error: indexesError },
        indexesRefetch,
    ] = useAxios({
        url: "/api/indexes",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });
    const [t_data, set_t_data] = useState<any>([]);
    const [lookupObject, setLookupObject] = useState<any>({
        artists: {},
        albums: {},
        genres: {},
        files: {},
        // {albumID: [fileID1, fileID1]}
        albumID_fileID: {},
    });

    useEffect(() => {
        if (indexesLoading) {
            return;
        }

        // Create lookup objects for material table
        let lookup: any = {
            artists: {},
            albums: {},
            genres: {},
            files: {},
            // {albumID: [fileID1, fileID1]}
            albumID_fileID: {},
        };

        Object.entries(indexesData.artists).forEach(
            ([artistID, artistData]: any) => {
                lookup.artists[`${artistID}`] = artistData.artist_name;
            }
        );
        Object.entries(indexesData.genres).forEach(
            ([genreID, genreData]: any) => {
                lookup.genres[`${genreID}`] = genreData.genre_name;
            }
        );
        Object.entries(indexesData.albums).forEach(
            ([albumID, albumData]: any) => {
                lookup.albums[`${albumID}`] = albumData.album_name;
            }
        );
        Object.entries(indexesData.files).forEach(([fileID, fileData]: any) => {
            if (fileData.file_metadata.song_albumid !== undefined) {
                if (
                    lookup.albumID_fileID[
                        fileData.file_metadata.song_albumid
                    ] === undefined
                ) {
                    lookup.albumID_fileID[fileData.file_metadata.song_albumid] =
                        [fileID];
                } else {
                    lookup.albumID_fileID[
                        fileData.file_metadata.song_albumid
                    ].push(fileID);
                }
            }
            lookup.files.fileID = fileData;
        });

        let albums = indexesData.albums;
        const new_t_data: any[] = [];
        Object.entries(albums).forEach(([albumID, albumItem]: any) => {
            new_t_data.push({
                album_id: albumID,
                albumArt: "",
                albumName: albumItem.album_name,
                albumArtist: albumItem.artistid,
                albumTracksFileIDs:
                    lookup.albumID_fileID[albumItem.albumid] !== undefined
                        ? JSON.stringify(
                              lookup.albumID_fileID[albumItem.albumid]
                          )
                        : JSON.stringify([]),
                yearReleased: albumItem.year_released,
            });
        });

        setLookupObject(lookup);
        set_t_data(new_t_data);
    }, [indexesLoading, indexesData]);

    return indexesLoading ? (
        <div>Loading...</div>
    ) : indexesError ? (
        <div>Something went wrong. Please try again later</div>
    ) : (
        <MaterialTable
            title="Albums"
            columns={[
                { title: "album_id", field: "album_id", hidden: true },
                {
                    title: "albumTracksFileIDs",
                    field: "albumTracksFileIDs",
                    hidden: true,
                },
                { title: "Album Art", field: "albumArt" },
                { title: "Album Name", field: "albumName" },
                {
                    title: "Album Artist",
                    field: "albumArtist",
                    lookup: lookupObject.artists,
                },
                { title: "Year Released", field: "yearReleased" },
            ]}
            data={t_data}
            icons={TABLE_ICONS}
            detailPanel={(rowData: any) => {
                return <div>{JSON.stringify(rowData)}</div>;
            }}
            editable={{
                onRowAdd: (newData: any) =>
                    new Promise((resolve, reject) => {
                        resolve(true);
                    }),
                onRowUpdate: (newData: any, oldData: any) =>
                    new Promise((resolve, reject) => {
                        resolve(true);
                    }),
                onRowDelete: (oldData: any) =>
                    new Promise((resolve, reject) => {
                        resolve(true);
                    }),
            }}
        />
    );
};

export default OSBAlbums;
