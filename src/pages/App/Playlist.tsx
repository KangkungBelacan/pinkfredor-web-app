import { useParams } from "react-router-dom";
const Playlist = () => {
    const { playlist_id }: any = useParams();
    return (
        <div className="mainapp-content-container">
           Playlist stuff here
        </div>
    );
};

export default Playlist;
