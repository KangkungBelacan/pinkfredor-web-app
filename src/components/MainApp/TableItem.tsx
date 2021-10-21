import "./TableItem.css"
import {MusicQueueItem} from "../../interface/context/MusicQueueItem";
const TableItem = (props: any) => {
    let songData = props.songData;
    let containerDetails;

    return (
        <div className={"table-item-container"}>
            <div className={"table-item-container-number"}>{props.position + "."}</div>
            <div className={"table-item-container-image"} style={{backgroundColor: props.imageColor}}></div>
            <div className={"table-item-container-info"}>
                <div className={"table-item-container-title"}>{songData.file_metadata.song_title}</div>
                <div className={"table-item-container-details"}>{songData.file_metadata.details}</div>
            </div>
            <div className={"table-item-container-actions"}>
                <button className={"table-item-container-play"} onClick={() => props.songItemOnClick(songData, "Play")}>
                    Play
                </button>
            </div>
        </div>
    );
};

export default TableItem;