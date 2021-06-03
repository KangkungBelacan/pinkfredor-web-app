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
    return (
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
                        Editing 05 たぶん.mp3
                        <div style={{ fontSize: "small", color: "grey" }}>
                            /Music/THE BOOK/
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
                                        defaultValue="Ho"
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
                                    <Form.Control placeholder="Track Artist" />
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
                                    <Form.Control placeholder="Track Album" />
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
                                Album Track No.
                            </Col>
                            <Col md={8} sm={12}>
                                <Form.Group controlId="AlbumTrackNo">
                                    <Form.Control placeholder="Album Track Number" />
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
                                    <Form.Control placeholder="Track Genre" />
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
                        onClick={(e: any) => {e.preventDefault();props.setShow(false)}}
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
