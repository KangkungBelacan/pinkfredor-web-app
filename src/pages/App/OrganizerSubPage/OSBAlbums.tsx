import MaterialTable from "material-table";
import useAxios from "axios-hooks";
import { axios } from "../../../global-imports";
import TABLE_ICONS from "../../../components/generic/MaterialTableIcons";
import { useEffect, useState } from "react";
import { KeyboardReturnOutlined } from "@material-ui/icons";
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
                        let album_name = newData.albumName;
                        let artist_id = newData.albumArtist;

                        let payload: any = {
                            albums: [
                                {
                                    album_name: album_name,
                                },
                            ],
                        };

                        if (newData.albumName === undefined || newData.albumName.trim() === "") {
                            alert("Album Name cannot be empty");
                            reject();
                            return;
                        }

                        payload.albums[0].album_name = newData.albumName.trim();

                        if (
                            newData.yearReleased !== undefined &&
                            newData.yearReleased.trim() !== ""
                        ) {
                            payload.albums[0].year_released = newData.yearReleased.trim();
                        }

                        if (artist_id !== undefined && artist_id !== "") {
                            payload.albums[0].artist_id = artist_id;
                        }

                        axios({
                            url: "/api/indexes/albums",
                            method: "POST",
                            data: payload,
                            headers: {
                                Authorization: `Bearer ${localStorage.token}`,
                            },
                        })
                            .then((response: any) => {
                                alert("Successfully added album");
                                newData.album_id = Object.keys(
                                    response.data.albums
                                )[0];
                                set_t_data([...t_data, newData]);
                                resolve(true);
                            })
                            .catch((error: any) => {
                                console.error(error);
                                alert("Unable to add album");
                                reject();
                            });
                    }),
                onRowUpdate: (newData: any, oldData: any) =>
                    new Promise((resolve, reject) => {

                        let payload: any = {
                            album_name: newData.albumName,
                            year_released: newData.yearReleased
                        };

                        if(newData.albumArtist !== undefined) {
                            payload.artistid = newData.albumArtist 
                        }

                        axios({
                            url: `/api/indexes/albums/${oldData.album_id}`,
                            method: "PUT",
                            headers: {
                                Authorization: `Bearer ${localStorage.token}`,
                            },
                            data: payload
                        })
                            .then((response: any) => {
                                const dataUpdate = [...t_data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                set_t_data([...dataUpdate]);
                                resolve(true);
                            })
                            .catch((error: any) => {
                                console.error(error);
                                reject();
                            });
                    }),
                onRowDelete: (oldData: any) =>
                    new Promise((resolve, reject) => {
                        axios({
                            url: `/api/indexes/albums/${oldData.album_id}`,
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${localStorage.token}`
                            }
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
                                alert("Something went wrong. Unable to delete album");
                                reject();
                            });
                    }),
            }}
        />
    );
};

export default OSBAlbums;
