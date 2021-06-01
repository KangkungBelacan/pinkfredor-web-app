import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "./NowPlayingQueuePopUp.css";
import MusicPlayerContext from "../../../context/MusicPlayerContext";
import React from "react";
import NowPlayingQueuePopUpRow from "./NowPlayingQueuePopUpRow";
const NowPlayingQueuePopUp = (props: any) => {
    const {
        status,
        setStatus,
        nowPlayingURL,
        setNowPlayingURL,
        progress,
        setProgress,
        queue,
        setQueue,
    } = React.useContext(MusicPlayerContext);

    let queue_rows:any = [];
    for(let i = 0; i < queue.length; i++) {
        queue_rows.push(<NowPlayingQueuePopUpRow change_song_in_queue={props.change_song_in_queue} playingURL={queue[i].playingURL} song_title={queue[i].song_title} song_artist={queue[i].song_artist} is_playing={queue[i].current} />);
    }

    const change_song = (playingURL: string) => {
        for(let i = 0; i < queue.length; i++) {
            if(queue[i].playingURL === playingURL) {
                setNowPlayingURL(queue[i].playingURL);
                queue[i].current = true;
                if(status !== "PLAYING") {
                    setStatus("PLAYING");
                }
            } else {
                queue[i].current = false;
            }
        }
        setQueue(queue);
    };

    return (
        <Modal show={props.showNowPlayingQueuePopup}>
            <ModalHeader
                style={{
                    color: "white",
                    backgroundColor: "rgb(31,31,31)",
                    borderBottom: "0px",
                }}
            >
                <ModalTitle>Now Playing (00/00)</ModalTitle>
            </ModalHeader>
            <ModalBody
                style={{ color: "white", backgroundColor: "rgb(18,18,18)" }}
            >
                <div
                    className="container-fluid now-playing-queue-container"
                    style={{ overflow: "auto", height: "50vh" }}
                >
                    {queue_rows}
                </div>
            </ModalBody>
            <ModalFooter
                style={{
                    color: "white",
                    backgroundColor: "rgb(31,31,31)",
                    borderTop: "0px",
                }}
            >
                <button
                    className="btn btn-danger"
                    onClick={() => props.setshowNowPlayingQueuePopup(false)}
                >
                    Close
                </button>
            </ModalFooter>
        </Modal>
    );
};

export default NowPlayingQueuePopUp;
