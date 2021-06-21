import React, { forwardRef, useState, useEffect } from "react";
import { Route } from "react-router";
import useAxios from "axios-hooks";
import "../Browse.css";

interface elements {}

const BrowseAllSongs = (props: any) => {
    const [pageLoading, setPageLoading] = useState(true);
    const [artistsDisplay, setArtistsDisplay] = useState<elements[]>([]);

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
                    <a
                        href={`/app/browse/Artists/${
                            (currentArtistData as any).artistid
                        }`}
                    >
                        <button>
                            {(currentArtistData as any).artist_name}
                        </button>
                    </a>
                    <Route
                        path={`/app/browse/Artists/${
                            (currentArtistData as any).artistid
                        }`}
                        component={() => (
                            <div>
                                <div>{`Artist: ${
                                    (currentArtistData as any).artist_name
                                }`}</div>
                            </div>
                        )}
                    />
                </div>
            );
        }
        setArtistsDisplay(newArtistsDisplay);
    }, [artistData, artistLoading, artistError, pageLoading]);

    if (pageLoading || artistLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>Artists</div>
            {artistsDisplay}
            <Route path="/app/browse/Artists" exact />
        </div>
    );
};

export default React.memo(BrowseAllSongs);
