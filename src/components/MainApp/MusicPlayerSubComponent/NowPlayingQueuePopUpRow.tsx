import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import NowPlayingQueuePopUpRowProps from "../../../interface/components/MainApp/NowPlayingQueuePopUpRowProps";
import MusicPlayerContext from "../../../context/MusicPlayerContext";
import { Draggable } from "react-beautiful-dnd";
const NowPlayingQueuePopUpRow = (props: NowPlayingQueuePopUpRowProps) => {
    const { queue, setQueue } = React.useContext(MusicPlayerContext);
    const CustomToggle = React.forwardRef(
        ({ children, onClick }: any, ref: any) => (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {children}
                <FontAwesomeIcon icon="ellipsis-v" />
            </div>
        )
    );

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        (
            { children, style, className, "aria-labelledby": labeledBy }: any,
            ref: any
        ) => {
            return (
                <div
                    ref={ref}
                    style={style}
                    className={className + " bootstrap-drop-down-container"}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled" style={{ marginBottom: "0" }}>
                        {children}
                    </ul>
                </div>
            );
        }
    );

    const change_song = () => {
        if (!props.is_playing) {
            props.parent_controls.change_song_in_queue(props.item_id);
        }
    };

    const remove_song_from_queue = () => {
        setQueue(
            queue.filter((item: any) => {
                if (item.item_id === props.item_id) {
                    if (item.current) {
                        if (queue.length === 1) {
                            // Stop operation
                            props.parent_controls.stop_song();
                        } else {
                            props.parent_controls.next_song();
                        }
                    }
                }
                return item.item_id !== props.item_id;
            })
        );
    };

    return (
        <Draggable draggableId={props.item_id} index={props.index}>
            {(provided: any) => (
                <div
                    className={
                        props.is_playing
                            ? "row now-playing-queue-item-row playing"
                            : "row now-playing-queue-item-row"
                    }
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="col-1 d-flex align-items-center now-playing-queue-grip">
                        <FontAwesomeIcon icon="grip-vertical" />
                    </div>
                    <div
                        className={
                            props.is_playing
                                ? "col-9 now-playing-queue-item-content"
                                : "col-10 now-playing-queue-item-content"
                        }
                        onClick={change_song}
                    >
                        <div className="now-playing-queue-item-content-title">
                            {props.song_title}
                        </div>
                        <div className="now-playing-queue-item-content-artist">
                            {props.song_artist}
                        </div>
                    </div>
                    <div
                        className={
                            props.is_playing
                                ? "d-flex align-items-center col-1"
                                : "d-none"
                        }
                    >
                        <FontAwesomeIcon icon="play" size="xs" />
                    </div>
                    <Dropdown
                        style={{ padding: "0" }}
                        className="col-1 d-flex align-items-center now-playing-queue-ellipsis"
                    >
                        <Dropdown.Toggle
                            as={CustomToggle}
                            id="dropdown-custom-components"
                        ></Dropdown.Toggle>

                        <Dropdown.Menu as={CustomMenu}>
                            <Dropdown.Item eventKey="1" onClick={change_song}>
                                Play
                            </Dropdown.Item>
                            <Dropdown.Item eventKey="2">
                                Add to...
                            </Dropdown.Item>
                            <Dropdown.Item
                                eventKey="3"
                                onClick={remove_song_from_queue}
                            >
                                Remove
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            )}
        </Draggable>
    );
};

export default NowPlayingQueuePopUpRow;
