import useAxios from "axios-hooks";
import { useParams } from "react-router-dom";
import "./Playlist.css";
const Playlist = () => {
    const { playlist_id }: any = useParams();
    const [{ data: pl_data, loading: pl_loading, error: pl_err }, _p] =
        useAxios(
            { url: `/api/indexes/playlist/${playlist_id}`, method: "GET" },
            { useCache: false }
        );
    const [{ data: filesData, loading: filesLoading, error: filesErr }, _f] =
        useAxios(
            { url: "/api/indexes/files", method: "GET" },
            { useCache: false }
        );
    return (
        <div className="mainapp-content-container">
            <div className="mainapp-content playlist-container">
                <div>
                    Playlist Name
                </div>
                <div>
                    <button>Edit Desc.</button>
                    Description
                </div>
                <div>
                    <button>Play All</button>
                    <button>Queue All</button>
                    <button>Edit Name</button>
                    <button>...</button>
                </div>
                <div>
                    Tracklist
                </div>
            </div>
        </div>
    );
};

export default Playlist;
