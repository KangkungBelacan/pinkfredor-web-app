import { AlbumDetailsPaneProps } from "../../../interface/components/MainApp/OrganizerSubComponent/AlbumDetailsPaneProps";
import "./AlbumDetailsPane.css";
const AlbumDetailsPane = (props: AlbumDetailsPaneProps) => {
    const DEF_STYLE = {
        padding: "10px",
    };
    return (
        <div
            style={
                props.style === undefined
                    ? { ...DEF_STYLE }
                    : { ...DEF_STYLE, ...props.style }
            }
            className={
                props.className
                    ? props.className + " container-fluid album-details-panel-container"
                    : "container-fluid album-details-panel-container"
            }
        >
            <div className="row">
                <div className="col-12">
                    <div style={{ display: "inline-block" }}>
                        <img
                            style={{ minWidth: "128px", maxWidth: "128px" }}
                            alt="Album Art"
                            src="https://images.saymedia-content.com/.image/t_share/MTc0NDkxNzgyMzYzNDg5NjQw/vinyl-to-paper-how-to-write-an-album-review.jpg"
                        ></img>
                    </div>
                    <div style={{ display: "inline-block", verticalAlign: "bottom", paddingLeft: "10px" }}>
                        <div className="album-title">Album Name</div>
                        <div className="album-metadata">Album Artist | 2020 | 9 tracks</div>
                    </div>
                </div>
            </div>
            <div className="row tracks-listing-headers">
                <div className="col-1"></div>
                <div className="col-1">#</div>
                <div className="col-5">Track Title</div>
                <div className="col-5">Track Artist</div>
            </div>
        </div>
    );
};

export default AlbumDetailsPane;
