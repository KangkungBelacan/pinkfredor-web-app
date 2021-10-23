import "./TableItem.css"
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";
import React from "react";

const TableItem = (props: any) => {
    let songData = props.songData;
    let containerDetails;

    return (
        <div className={"table-item-container"}>
            <div className={"table-item-container-number"}>{props.position + "."}</div>
            <div className={"table-item-container-image"} style={{backgroundColor: props.imageColor}}></div>
            <div className={"table-item-container-info"}>
                <div className={"table-item-container-title"}>{songData.file_metadata.song_title}</div>
                <div className={"table-item-container-details"}>{containerDetails}</div>
            </div>
            <div className={"table-item-container-actions"}>
                <Dropdown
                    as={ButtonGroup}
                    onClick={(evt: any) => {
                        evt.stopPropagation();
                    }}
                >
                    <Button
                        id="Play"
                        onClick={(event) =>
                            props.songItemOnClick(songData, "Play")
                        }
                        variant="success"
                    >
                        Play
                    </Button>

                    <Dropdown.Toggle
                        split
                        variant="success"
                        id="dropdown-split-basic"
                    />

                    <Dropdown.Menu>
                        <Dropdown.Item
                            id="AddToQ"
                            onClick={(event) =>
                                props.songItemOnClick(songData, "AddToQ")
                            }
                        >
                            Add to queue
                        </Dropdown.Item>
                        <Dropdown.Item
                            id="PlayNext"
                            onClick={(event) =>
                                props.songItemOnClick(songData, "PlayNext")
                            }
                        >
                            Play next
                        </Dropdown.Item>
                        <Dropdown.Item
                            id="AddToPlaylist"
                            onClick={(event) =>
                                props.songItemOnClick(songData, "AddToPlaylist")
                            }
                        >
                            Add to playlist
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default TableItem;