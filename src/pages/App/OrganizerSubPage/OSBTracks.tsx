import EditTrackModal from "../../../components/MainApp/OrganizerSubComponent/EditTrackModal";
import React, { useState, useEffect } from "react";
import OSBTracksMTable from "./OSBTracksMTable";

const OSBTracks = (props: any) => {
    const [showEditModalBox, setShowEditModalBox] = useState(false);
    const [editModalRowData, seteditModalRowData] = useState({});

    const [passedData, setPassedData] = useState({});

    useEffect(() => {
        if (props.indexesError || props.folderError) {
            alert("Something went wrong, please try again later");
            return;
        }
        let files_response = props.indexesData;
        let scan_folder_response = props.folderData;
        // set_tdata(files_response.data);
        let keys = Object.keys(files_response.files);
        let t_data: any = [];
        for (let i = 0; i < keys.length; i++) {
            let file_item = files_response.files[keys[i]];
            let parent_path = "/";
            if (file_item.parents !== undefined) {
                while (file_item.parents.length !== 0) {
                    parent_path +=
                        scan_folder_response[file_item.parents.pop()]
                            .folder_name + "/";
                }
            }
            t_data.push({
                file_id: keys[i],
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

        let artistLookUpObject: any = { "-": "-" };
        let artistIds = Object.keys(props.indexesData.artists);
        for (let i = 0; i < artistIds.length; i++) {
            artistLookUpObject[artistIds[i]] =
                props.indexesData.artists[artistIds[i]].artist_name;
        }

        let albumLookUpObject: any = { "-": "-" };
        let albumIds = Object.keys(props.indexesData.albums);
        for (let i = 0; i < albumIds.length; i++) {
            albumLookUpObject[albumIds[i]] =
                props.indexesData.albums[albumIds[i]].album_name;
        }

        let genreLookUpObject: any = { "-": "-" };
        let genreIds = Object.keys(props.indexesData.genres);
        for (let i = 0; i < genreIds.length; i++) {
            genreLookUpObject[genreIds[i]] =
                props.indexesData.genres[genreIds[i]].genre_name;
        }

        let playlistLookUpObject: any = { "-": "-" };
        let playlistIds = Object.keys(props.indexesData.playlists);
        for (let i = 0; i < playlistIds.length; i++) {
            playlistLookUpObject[playlistIds[i]] =
                props.indexesData.playlists[playlistIds[i]].playlist_name;
        }

        const passedDataInner = {
            artistLookUpObject,
            albumLookUpObject,
            genreLookUpObject,
            playlistLookUpObject,
            t_data,
            setShowEditModalBox,
            seteditModalRowData,
        };
        if (Object.keys(passedData).length === 0) {
            setPassedData(passedDataInner);
        }
    }, [props.indexesData, props.folderData, passedData, props.indexesError, props.folderError]);

    return (
        <div style={{ maxWidth: "100%" }}>
            <div>
                <EditTrackModal
                    row_data={editModalRowData}
                    show={showEditModalBox}
                    setShow={setShowEditModalBox}
                    passedData={passedData}
                />
                <OSBTracksMTable passedData={passedData} />
            </div>
        </div>
    );
};

export default React.memo(OSBTracks);
