import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import "./NowPlayingQueuePopUp.css";
import MusicPlayerContext from "../../../context/MusicPlayerContext";
import React, { useState } from "react";
import NowPlayingQueuePopUpRow from "./NowPlayingQueuePopUpRow";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
const NowPlayingQueuePopUp = (props: any) => {
    const { queue, setQueue } = React.useContext(MusicPlayerContext);
    const [nowPlayingCounter, setNowPlayingCounter] = useState("");

    let playcount = 1;
    if (queue.length === 0 && nowPlayingCounter !== "") {
        setNowPlayingCounter(``);
    }

    for (let i = 0; i < queue.length; i++) {
        if (
            queue[i].current &&
            `(${playcount}/${queue.length})` !== nowPlayingCounter
        ) {
            setNowPlayingCounter(`(${playcount}/${queue.length})`);
        }
        playcount++;
    }

    // When user finish dragging
    const onDragEnd = (result: any) => {
        let item_id = result.draggableId;

        let old_idx = -1;
        let dest_idx = result.destination.index;
        for (let i = 0; i < queue.length; i++) {
            if (queue[i].item_id === item_id) {
                old_idx = i;
                break;
            }
        }
        if (old_idx === -1) {
            return;
        }

        // Remove item from queue and push it into destination
        queue.splice(dest_idx, 0, queue.splice(old_idx, 1)[0]);
        setQueue(queue);
    };

    return (
        <Modal
            show={props.showNowPlayingQueuePopup}
            onHide={() => {
                props.setshowNowPlayingQueuePopup(false);
            }}
        >
            <ModalHeader
                style={{
                    color: "white",
                    backgroundColor: "rgb(31,31,31)",
                    borderBottom: "0px",
                }}
            >
                <ModalTitle>Now Playing {nowPlayingCounter}</ModalTitle>
            </ModalHeader>
            <ModalBody
                style={{ color: "white", backgroundColor: "rgb(18,18,18)" }}
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={"queue_container_droppable"}>
                        {(provided: any) => (
                            <div
                                className="container-fluid now-playing-queue-container"
                                style={{ overflow: "auto", height: "50vh" }}
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {queue.map((cur: any, i: any, arr: any) => {
                                    return <NowPlayingQueuePopUpRow
                                        key={`queue-item-${cur.item_id}`}
                                        item_id={cur.item_id}
                                        parent_controls={props.parent_controls}
                                        playingURL={cur.playingURL}
                                        song_title={cur.song_title}
                                        song_artist={cur.song_artist}
                                        is_playing={cur.current}
                                        index={i}
                                    />;
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
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
