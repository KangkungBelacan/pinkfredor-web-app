import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import NowPlayingQueuePopUpRowProps from "../../../interface/components/MainApp/NowPlayingQueuePopUpRowProps";
const NowPlayingQueuePopUpRow = (props: NowPlayingQueuePopUpRowProps) => {
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
            const [value, setValue] = useState("");
            return (
                <div
                    ref={ref}
                    style={style}
                    className={className + " bootstrap-drop-down-container"}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled" style={{ marginBottom: "0" }}>
                        {/* {React.Children.toArray(children).filter(
                            (child:any) =>
                                !value ||
                                child.props.children
                                    .toLowerCase()
                                    .startsWith(value)
                        )} */}
                        {children}
                    </ul>
                </div>
            );
        }
    );

    const rowContentOnClick = () => {
        if (!props.is_playing) {
            props.change_song_in_queue(props.playingURL);
        }
    };
    return (
        <div
            className={
                props.is_playing
                    ? "row now-playing-queue-item-row playing"
                    : "row now-playing-queue-item-row"
            }
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
                onClick={rowContentOnClick}
            >
                <div className="now-playing-queue-item-content-title">
                    {props.song_title}
                </div>
                <div className="now-playing-queue-item-content-artist">
                    {props.song_artist}
                </div>
            </div>
            {/* <div className="col-2 d-flex align-items-center now-playing-queue-content-length">
                3:48
            </div> */}
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
                    <Dropdown.Item eventKey="1">Play</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Add to...</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Remove</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {/* <div className="col-1 d-flex align-items-center now-playing-queue-ellipsis">
        <FontAwesomeIcon icon="ellipsis-v" />
    </div> */}
        </div>
    );
};

export default NowPlayingQueuePopUpRow;
