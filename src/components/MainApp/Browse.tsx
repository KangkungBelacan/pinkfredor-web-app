// import ReactDOM from 'react-dom'
import React, {useEffect} from "react";
import useAxios from "axios-hooks";
import "./Browse.css";
import BrowseAllSongs from "./BrowseSubPage/BrowseAllSongs";

function Browse(props: any): JSX.Element {
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

    useEffect(() => {
    }, []);

    return (
        <div>
            <div className="content-body">
                <BrowseAllSongs
                    setStatus={props.setStatus}
                    setNowPlayingURL={props.setNowPlayingURL}
                    nowPlayingURL={props.nowPlayingURL}
                    setProgress={props.setProgress}
                    queue={props.queue}
                    setQueue={props.setQueue}
                    setSongTitleLabel={props.setSongTitleLabel}
                    setSongArtistLabel={
                        props.setSongArtistLabel
                    }
                    setSongAlbumArtURL={
                        props.setSongAlbumArtURL
                    }
                />
                {/*<div*/}
                {/*    style={{ display: "flex", flexDirection: "column" }}*/}
                {/*    className="songs-container"*/}
                {/*>*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            display: "flex",*/}
                {/*            justifyContent: "space-between",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <h3 style={{ color: "white" }}>Songs</h3>*/}
                {/*        <p style={{ color: "white" }}>See all</p>*/}
                {/*    </div>*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            display: "grid",*/}
                {/*            gridTemplateColumns: "repeat(4, 1fr)",*/}
                {/*            gridTemplateRows: "repeat(2, 1fr)",*/}
                {/*            gridColumnGap: "0px",*/}
                {/*            gridRowGap: "0px",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <p>Yes</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default React.memo(Browse);
