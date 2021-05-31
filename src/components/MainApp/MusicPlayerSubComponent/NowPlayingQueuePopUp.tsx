import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NowPlayingQueuePopUp.css";
import { Dropdown } from "react-bootstrap";
import React, { useState } from "react";
const NowPlayingQueuePopUp = (props: any) => {
    const CustomToggle = React.forwardRef(
        ({ children, onClick }: any, ref: any) => (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
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
                    <ul className="list-unstyled" style={{marginBottom: "0"}}>
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
                    <div className="row now-playing-queue-item-row">
                        <div className="col-1 d-flex align-items-center now-playing-queue-grip">
                            <FontAwesomeIcon icon="grip-vertical" />
                        </div>
                        <div className="col-8 now-playing-queue-item-content">
                            <div className="now-playing-queue-item-content-title">
                                Rinne tensei
                            </div>
                            <div className="now-playing-queue-item-content-artist">
                                Mafumafu
                            </div>
                        </div>
                        <div className="col-2 d-flex align-items-center now-playing-queue-content-length">
                            3:48
                        </div>
                        <Dropdown style={{padding: "0"}} className="col-1 d-flex align-items-center now-playing-queue-ellipsis">
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
                    <div className="row now-playing-queue-item-row">
                        <div className="col-1 d-flex align-items-center now-playing-queue-grip">
                            <FontAwesomeIcon icon="grip-vertical" />
                        </div>
                        <div className="col-8 now-playing-queue-item-content">
                            <div className="now-playing-queue-item-content-title">
                                29-Q
                            </div>
                            <div className="now-playing-queue-item-content-artist">
                                鹿乃
                            </div>
                        </div>
                        <div className="col-2 d-flex align-items-center now-playing-queue-content-length">
                            0:49
                        </div>
                        <Dropdown style={{padding: "0"}} className="col-1 d-flex align-items-center now-playing-queue-ellipsis">
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
                    <div className="row now-playing-queue-item-row">
                        <div className="col-1 d-flex align-items-center now-playing-queue-grip">
                            <FontAwesomeIcon icon="grip-vertical" />
                        </div>
                        <div className="col-8 now-playing-queue-item-content">
                            <div className="now-playing-queue-item-content-title">
                                夜に駆ける
                            </div>
                            <div className="now-playing-queue-item-content-artist">
                                YOASOBI
                            </div>
                        </div>
                        <div className="col-2 d-flex align-items-center now-playing-queue-content-length">
                            3:22
                        </div>
                        <Dropdown style={{padding: "0"}} className="col-1 d-flex align-items-center now-playing-queue-ellipsis">
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
