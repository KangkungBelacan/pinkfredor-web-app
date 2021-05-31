import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./NowPlayingQueuePopUp.css";
const NowPlayingQueuePopUp = (props: any) => {
    return (
        <Modal show={props.showNowPlayingQueuePopup}>
            <ModalHeader style={{color: "white", backgroundColor: "rgb(31,31,31)", borderBottom: "0px", boxShadow: "0px 2px 0px 2px black"}}>
                <ModalTitle>Now Playing (00/00)</ModalTitle>
            </ModalHeader>
            <ModalBody style={{color: "white", backgroundColor: "rgb(18,18,18)"}}>
                <div className="container-fluid now-playing-queue-container" style={{overflow: "auto", height: "50vh"}}>
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
                        <div className="col-1 d-flex align-items-center now-playing-queue-ellipsis">
                            <FontAwesomeIcon icon="ellipsis-v"/>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter style={{color: "white", backgroundColor: "rgb(31,31,31)", borderTop: "0px"}}>
                <button className="btn btn-danger" onClick={() => props.setshowNowPlayingQueuePopup(false)}>Close</button>
            </ModalFooter>
        </Modal>
    );
};

export default NowPlayingQueuePopUp;