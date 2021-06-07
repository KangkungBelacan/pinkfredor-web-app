import MaterialTable from "material-table";
import { useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { EditArtistModalProps } from "../../../interface/components/MainApp/OrganizerSubComponent/EditArtistModalProps";
import TABLE_ICONS from "../../generic/MaterialTableIcons";
import { b64ToBlobURL } from "../../../global-imports";
import empty_profile_icon from "../../../images/empty_profile_icon.png";
const EditArtistModal = (props: EditArtistModalProps) => {
    const [saveText, setSaveText] = useState<any>("Save");
    const [saveBtnDisabled, setsaveBtnDisabled] = useState(false);
    // const [artistArtURL, setartistArtURL] = useState<any>(empty_profile_icon);

    return (
        <Modal size="xl" show={props.show} onHide={() => props.setShow(false)}>
            <Modal.Header
                style={{
                    color: "white",
                    backgroundColor: "rgb(31,31,31)",
                    borderBottom: "0px",
                }}
            >
                <Modal.Title>
                    Editing{" "}
                    {props.artists_indexes[props.row_data.artist_name] ===
                    undefined
                        ? ""
                        : props.artists_indexes[props.row_data.artist_name]
                              .artist_name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                style={{
                    color: "white",
                    backgroundColor: "rgb(18,18,18)",
                }}
            >
                <Form>
                    <Form.Group controlId="aritstId">
                        <Form.Control
                            type="hidden"
                            defaultValue={props.artist_id}
                        ></Form.Control>
                    </Form.Group>
                    <Row style={{ paddingBottom: "1rem" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                alt="artistArt"
                                src={
                                    props.artists_indexes[
                                        props.row_data.artist_name
                                    ] !== undefined &&
                                    props.artists_indexes[
                                        props.row_data.artist_name
                                    ].artist_art !== undefined
                                        ? b64ToBlobURL(
                                              props.artists_indexes[
                                                  props.row_data.artist_name
                                              ].artist_art,
                                              "image/jpeg"
                                          )
                                        : empty_profile_icon
                                }
                                style={{
                                    borderRadius: "50%",
                                    minHeight: "128px",
                                    maxHeight: "128px",
                                }}
                            ></img>
                        </div>
                    </Row>
                    <Row
                        style={{ paddingBottom: "1rem" }}
                        className="justify-content-center"
                    >
                        <Col md={6} sm={12}>
                            <Form.Group controlId="SongTitle">
                                <Form.Control
                                    style={{ textAlign: "center" }}
                                    placeholder="artistName"
                                    defaultValue={
                                        props.artists_indexes[
                                            props.row_data.artist_name
                                        ] === undefined
                                            ? ""
                                            : props.artists_indexes[
                                                  props.row_data.artist_name
                                              ].artist_name
                                    }
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer
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
            </Modal.Footer>
        </Modal>
    );
};

export default EditArtistModal;
