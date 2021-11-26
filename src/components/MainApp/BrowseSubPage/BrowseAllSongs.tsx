import React, {forwardRef, useEffect, useState} from "react";
import useAxios from "axios-hooks";
import "../Browse.css";
// import PlayArrow from "@material-ui/icons/PlayArrow";
// import Queue from "@material-ui/icons/Queue";
import {Icons} from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
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
// import MusicPlayerContext from "../../context/MusicPlayerContext";
import CustomTable from "../CustomTable/CustomTable";
import ExampleSongActions from "../CustomTable/ExampleSongActions";
import PlaylistContext from "../../../context/PlaylistContext";
import MusicPlayerContext from "../../../context/MusicPlayerContext";

const tableIcons: Icons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => (
        <ChevronRight {...props} ref={ref}/>
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => (
        <ChevronLeft {...props} ref={ref}/>
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => (
        <Remove {...props} ref={ref}/>
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
};

interface Element {
}

const BrowseAllSongs = (props: any) => {
    const {
        setStatus,
        nowPlayingURL,
        setNowPlayingURL,
        queue,
        setQueue,
        setSongTitleLabel,
        setSongArtistLabel,
    } = React.useContext(MusicPlayerContext);
    const song_columns = [
        {title: "file_id", field: "id", hidden: true},
        {title: "Title", field: "file_metadata.song_title"},
        {title: "Artist", field: "file_metadata.song_artist"},
        {title: "Album", field: "file_metadata.song_album"},
    ];

    const [tableItems, setTableItems] = useState<any>([]);
    const [topBarSelection, setTopBar] = useState(0);
    const [indexFilesState, setIndexFilesState] = useState<any>([]);
    const [artistsDataState, setArtistsDataState] = useState<any>([]);
    const [albumDataState, setAlbumDataState] = useState<any>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const {playlistData, playlistLoading, playlistErr, playlistRefetch} =
        React.useContext(PlaylistContext);

    const [
        {
            data: indexFilesData,
            loading: indexFilesLoading,
            error: indexFilesError,
        },
        indexFilesRefetch,
    ] = useAxios({
        url: "/api/indexes/files",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    const [
        {data: artistsData, loading: artistsLoading, error: artistsError},
        artistsRefetch,
    ] = useAxios({
        url: "/api/indexes/artists",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    const [
        {data: albumData, loading: albumLoading, error: albumError},
        albumRefetch,
    ] = useAxios({
        url: "/api/indexes/albums",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    useEffect(() => {
        if (
            indexFilesLoading ||
            indexFilesError ||
            artistsLoading ||
            artistsError ||
            albumLoading ||
            albumError ||
            !pageLoading
        )
            return;

        let indexFiles = Object.values(indexFilesData.files);
        setIndexFilesState(indexFiles);
        setArtistsDataState(artistsData.artists);
        setAlbumDataState(albumData.albums);
        setPageLoading(false);
    }, [
        indexFilesData,
        indexFilesLoading,
        indexFilesError,
        artistsData,
        artistsLoading,
        artistsError,
        albumData,
        albumLoading,
        albumError,
        pageLoading,
    ]);

    return (
        <div>
            {indexFilesState.length !== 0 ? (
                <CustomTable songs={indexFilesState}
                             artists={artistsDataState}
                             albums={albumDataState}
                             customAction={<ExampleSongActions/>}
                />
            ) : (
                <div style={{color: "white"}}>
                    Loading... (change this shit later)
                </div>
            )}
        </div>
    );
};

export default React.memo(BrowseAllSongs);
