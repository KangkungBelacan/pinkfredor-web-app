import React from "react";
import PlaylistContext from "../../context/PlaylistContext";

const TestPage = () => {
    const { playlistRefetch } = React.useContext(PlaylistContext);
    return (
        <div className="mainapp-content-container">
            <div className="mainapp-content">
                <button
                    onClick={() => {
                        playlistRefetch();
                    }}
                >
                    Click me to refetch playlist
                </button>
            </div>
        </div>
    );
};
export default TestPage;
