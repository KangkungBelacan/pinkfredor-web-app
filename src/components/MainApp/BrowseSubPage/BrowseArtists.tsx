import React, { forwardRef, useState, useEffect } from "react";
import { Link, Switch } from "react-router-dom";
import { Route } from "react-router";
import useAxios from "axios-hooks";
import ArtistComponent from "./ArtistComponent";
import "../Browse.css";

interface elements {}

const BrowseAllSongs = (props: any) => {
    const [pageLoading, setPageLoading] = useState(true);
    const [artistsDisplay, setArtistsDisplay] = useState<elements[]>([]);
    const [artistRoutes, setArtistRoutes] = useState<elements[]>([]);

    const [
        { data: artistData, loading: artistLoading, error: artistError },
        artistRefetch,
    ] = useAxios({
        url: "/api/indexes/artists",
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.token}`,
        },
    });

    useEffect(() => {
        if (artistLoading || artistError || !pageLoading) return;

        let artistValues = Object.values(artistData.artists);
        console.log(artistValues);
        setPageLoading(false);

        let newArtistsDisplay = [];
        for (let i = 0; artistValues.length > i; i++) {
            let currentArtistData = artistValues[i];
            newArtistsDisplay.push(
                <div key={(currentArtistData as any).artistid}>
                    <Link
                        to={`/app/browse/Artists/${
                            (currentArtistData as any).artistid
                        }`}
                    >
                        <button>
                            {(currentArtistData as any).artist_name}
                        </button>
                    </Link>
                </div>
            );
            let newArtistRoutes = [
                ...artistRoutes,
                <Route
                    key={(currentArtistData as any).artistid}
                    exact
                    path={`/app/browse/Artists/${
                        (currentArtistData as any).artistid
                    }`}
                    component={() => (
                        <div>
                            <ArtistComponent
                                artist_name={
                                    (currentArtistData as any).artist_name
                                }
                                artistid={(currentArtistData as any).artistid}
                                className="row organizer-subpage-content-container"
                                setStatus={props.setStatus}
                                setNowPlayingURL={props.setNowPlayingURL}
                                setProgress={props.setProgress}
                                queue={props.queue}
                                setQueue={props.setQueue}
                                setSongTitleLabel={props.setSongTitleLabel}
                                setSongArtistLabel={props.setSongArtistLabel}
                                setSongAlbumArtURL={props.setSongAlbumArtURL}
                            />
                        </div>
                    )}
                />,
            ];
            setArtistRoutes(newArtistRoutes);
        }
        setArtistsDisplay(newArtistsDisplay);
    }, [artistData, artistLoading, artistError, pageLoading]);

    if (pageLoading || artistLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>Artists</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
                {artistsDisplay}
            </div>
            <Switch>
                <Route exact path="/app/browse/Artists" />
                {artistRoutes}
            </Switch>
        </div>
    );
};

export default React.memo(BrowseAllSongs);
