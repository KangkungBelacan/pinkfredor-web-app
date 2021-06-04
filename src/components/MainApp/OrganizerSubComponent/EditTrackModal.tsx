import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import EditTrackModalProps from "../../../interface/components/MainApp/OrganizerSubComponent/EditTrackModalProps";
const EditTrackModal = (props: EditTrackModalProps) => {
    const submitHandler = (evt: any) => {
        console.log(evt);
        return false;
    };
    return Object.keys(props.passedData).length === 0 ? (
        <div></div>
    ) : (
        <Modal size="lg" show={props.show} onHide={() => props.setShow(false)}>
            <form onSubmit={submitHandler}>
                <ModalHeader
                    style={{
                        color: "white",
                        backgroundColor: "rgb(31,31,31)",
                        borderBottom: "0px",
                    }}
                >
                    <ModalTitle>
                        Editing {props.row_data.filename}
                        <div style={{ fontSize: "small", color: "grey" }}>
                            {props.row_data.drive_location}
                        </div>
                    </ModalTitle>
                </ModalHeader>
                <ModalBody
                    style={{
                        color: "white",
                        backgroundColor: "rgb(18,18,18)",
                    }}
                >
                    <Container>
                        <Row style={{ paddingBottom: "1rem" }}>
                            <Col
                                md={4}
                                sm={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Track Title
                            </Col>
                            <Col md={8} sm={12}>
                                <Form.Group controlId="SongTitle">
                                    <Form.Control
                                        placeholder="Track Title"
                                        defaultValue={
                                            props.row_data.track_title
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ paddingBottom: "1rem" }}>
                            <Col
                                md={4}
                                sm={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Track Artist
                            </Col>
                            <Col md={8} sm={12}>
                                <Form.Group controlId="TrackArtist">
                                    <Form.Control
                                        as="select"
                                        defaultValue={
                                            props.row_data.track_artist
                                        }
                                    >
                                        {Object.entries(
                                            props.passedData.artistLookUpObject
                                        ).map(([artistID, artistName]: any) => {
                                            return (
                                                <option value={artistID}>
                                                    {artistName}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row style={{ paddingBottom: "1rem" }}>
                            <Col
                                md={4}
                                sm={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Track Album
                            </Col>
                            <Col md={8} sm={12}>
                                <Form.Group controlId="TrackAlbum">
                                    <Form.Control
                                        as="select"
                                        defaultValue={
                                            props.row_data.track_album
                                        }
                                    >
                                        {Object.entries(
                                            props.passedData.albumLookUpObject
                                        ).map(([albumID, albumName]: any) => {
                                            return (
                                                <option value={albumID}>
                                                    {albumName}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                {/* <Form.Group controlId="TrackAlbum">
                                    <Form.Control
                                        placeholder="Track Album"
                                        defaultValue={
                                            props.row_data.track_album
                                        }
                                    />
                                </Form.Group> */}
                            </Col>
                        </Row>
                        <Row style={{ paddingBottom: "1rem" }}>
                            <Col
                                md={4}
                                sm={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Album Track No.
                            </Col>
                            <Col md={8} sm={12}>
                                <Form.Group controlId="AlbumTrackNo">
                                    <Form.Control
                                        placeholder="Album Track Number"
                                        defaultValue={
                                            props.row_data.album_tr_no
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                md={4}
                                sm={12}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Track Genre
                            </Col>
                            <Col md={8} sm={12}>
                                <Form.Group controlId="TrackGenre">
                                    <Form.Control
                                        placeholder="Track Genre"
                                        defaultValue={
                                            props.row_data.track_genre
                                        }
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
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
                        onClick={(e: any) => {
                            e.preventDefault();
                            props.setShow(false);
                        }}
                    >
                        Close
                    </button>
                    <Button variant="success" type="submit">
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default EditTrackModal;
