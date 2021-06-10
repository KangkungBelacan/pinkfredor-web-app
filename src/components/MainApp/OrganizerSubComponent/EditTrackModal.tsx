import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import EditTrackModalProps from "../../../interface/components/MainApp/OrganizerSubComponent/EditTrackModalProps";
import { axios } from "../../../global-imports";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const EditTrackModal = (props: EditTrackModalProps) => {
    const [saveText, setSaveText] = useState<any>("Save");
    const [saveBtnDisabled, setsaveBtnDisabled] = useState(false);
    const submitHandler = (evt: any) => {
        setsaveBtnDisabled(true);
        setSaveText(<FontAwesomeIcon icon="spinner" spin />);
        evt.preventDefault();
        let song_title =
            evt.currentTarget[0].value.trim() === ""
                ? undefined
                : evt.currentTarget[0].value.trim();
        let artist_id =
            evt.currentTarget[1].value === "-"
                ? undefined
                : evt.currentTarget[1].value;
        let album_id =
            evt.currentTarget[2].value === "-"
                ? undefined
                : evt.currentTarget[2].value;
        let album_track_no =
            evt.currentTarget[3].value.trim() === ""
                ? undefined
                : evt.currentTarget[3].value.trim();
        let genre_id =
            evt.currentTarget[4].value === "-"
                ? undefined
                : evt.currentTarget[4].value;
        let file_id = evt.currentTarget[5].defaultValue;

        let payload: any = {
            file_metadata: {},
        };

        if (song_title !== undefined)
            payload.file_metadata.song_title = song_title;
        if (album_track_no !== undefined)
            payload.file_metadata.album_track_no = album_track_no;
        if (artist_id !== undefined)
            payload.file_metadata.song_artistid = artist_id;
        if (album_id !== undefined) payload.file_metadata.album_id = album_id;
        if (genre_id !== undefined) payload.file_metadata.genre_id = genre_id;

        axios({
            url: `/api/indexes/files/${file_id}`,
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
            data: payload,
        })
            .then((args: any) => {
                // # Code to find the file_id and change its row data display
                for(let i =0; i < props.t_data.length;i++) {
                    if(props.t_data[i].file_id === file_id) {
                        props.t_data[i].trackTitle = song_title === undefined ? "-" : song_title
                        props.t_data[i].trackArtist = artist_id === undefined ? "-" : artist_id;
                        props.t_data[i].trackAlbumTrNo = album_track_no === undefined ? "-" : album_track_no;
                        props.t_data[i].trackAlbum = album_id === undefined ? "-" : album_id;
                        props.t_data[i].trackGenre = genre_id === undefined ? "-" : genre_id;
                        break;
                    }
                }
                props.set_t_data(props.t_data);
                // #
                alert("Successfully updated Track info");
                props.setShow(false);
                setsaveBtnDisabled(false);
                setSaveText("Save");
            })
            .catch((args: any) => {
                alert("Something went wrong. Please try again later");
                props.setShow(false);
                setsaveBtnDisabled(false);
                setSaveText("Save");
            });
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
                                            props.row_data.track_title === "-"
                                                ? ""
                                                : props.row_data.track_title
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
                                                <option key={`edit_tracks_${artistID}`} value={artistID}>
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
                                            props.row_data.album_tr_no === "-"
                                                ? ""
                                                : props.row_data.album_tr_no
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
                                        as="select"
                                        defaultValue={
                                            props.row_data.track_genre
                                        }
                                    >
                                        {Object.entries(
                                            props.passedData.genreLookUpObject
                                        ).map(([albumID, albumName]: any) => {
                                            return (
                                                <option value={albumID}>
                                                    {albumName}
                                                </option>
                                            );
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="FileID">
                                    <Form.Control
                                        defaultValue={props.row_data.file_id}
                                        type="hidden"
                                    ></Form.Control>
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
                    <Button
                        variant="success"
                        type="submit"
                        disabled={saveBtnDisabled}
                    >
                        {saveText}
                    </Button>
                </ModalFooter>
            </form>
        </Modal>
    );
};

export default EditTrackModal;
