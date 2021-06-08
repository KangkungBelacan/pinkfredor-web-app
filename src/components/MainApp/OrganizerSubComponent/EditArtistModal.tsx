import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import { EditArtistModalProps } from "../../../interface/components/MainApp/OrganizerSubComponent/EditArtistModalProps";
import { axios, b64ToBlobURL, fileToBase64 } from "../../../global-imports";
import empty_profile_icon from "../../../images/empty_profile_icon.png";
import "./EditArtistModal.css";
const EditArtistModal = (props: EditArtistModalProps) => {
    const [saveText, setSaveText] = useState<any>("Save");
    const [saveBtnDisabled, setsaveBtnDisabled] = useState(false);
    const [artistArtSRC, setartistArtSRC] = useState(empty_profile_icon);
    // const [artistArtURL, setartistArtURL] = useState<any>(empty_profile_icon);
    const [fileB64Data, setfileB64Data] = useState({ b64: "", type: null });

    useEffect(() => {
        if (
            props.row_data.artist_art !== undefined &&
            fileB64Data.b64 === ""
            // props.artists_indexes[props.row_data.artist_name] !== undefined &&
            // props.artists_indexes[props.row_data.artist_name].artist_art !==
            //     undefined
        ) {
            let { b64, mimeType }: any = JSON.parse(props.row_data.artist_art);
            setartistArtSRC(b64ToBlobURL(b64, mimeType));
        }
    }, [props.row_data.artist_art, fileB64Data.b64, props.show]);

    const resetDefaults = () => {
        props.setShow(false);
        setsaveBtnDisabled(false);
        setSaveText("Save");
        setfileB64Data({ b64: "", type: null });
        setartistArtSRC(empty_profile_icon);
    };

    const onSubmit = (evt: any) => {
        evt.preventDefault();
        setsaveBtnDisabled(true);
        setSaveText(<FontAwesomeIcon icon="spinner" spin />);
        // console.log(evt);

        let payload: any = {
            artist_name: evt.target[3].value,
        };
        if (fileB64Data.b64 !== "") {
            payload.artist_art = {
                b64: fileB64Data.b64,
                mimeType: fileB64Data.type,
            };
        }

        axios({
            url: `/api/indexes/artists/${props.row_data.artist_id}`,
            method: "PUT",
            data: payload,
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        })
            .then((response: any) => {
                // Update t_data as well
                for (let i = 0; i < props.artist_t_data_display.length; i++) {
                    if (
                        props.artist_t_data_display[i].artist_id ===
                        props.row_data.artist_id
                    ) {
                        props.artist_t_data_display[i].artistName =
                            payload.artist_name;
                        if (payload.artist_art !== undefined) {
                            props.artist_t_data_display[i].artist_art =
                                JSON.stringify(payload.artist_art);
                        }
                        break;
                    }
                }
                props.set_artist_t_data_display(props.artist_t_data_display);
                alert("Artist updated successfully.");
                resetDefaults();
            })
            .catch((error: any) => {
                console.error(error);
                alert("Something went wrong. Please try again later");
                resetDefaults();
            });
    };

    const onFileChange = (evt: any) => {
        evt.preventDefault();
        if (evt.target.files[0] === undefined) {
            return;
        }
        let filesize = evt.target.files[0].size;
        if (filesize > 8000000) {
            alert("File size cannot exceed 8MB");
            return;
        }
        if (
            evt.target.files[0].type !== "image/png" &&
            evt.target.files[0].type !== "image/jpeg"
        ) {
            alert("Bad file format");
            return;
        }
        fileToBase64(evt.target.files[0])
            .then((result: any) => {
                result = result.split(",").slice(1);
                setfileB64Data({
                    b64: result,
                    type: evt.target.files[0].type,
                });
                setartistArtSRC(b64ToBlobURL(result, evt.target.files[0].type));
            })
            .catch((err) => {
                console.error(err);
                alert("Something went wrong during the upload");
            });
    };

    return (
        <Modal size="lg" show={props.show} onHide={resetDefaults}>
            <Form onSubmit={onSubmit}>
                <Modal.Header
                    style={{
                        color: "white",
                        backgroundColor: "rgb(31,31,31)",
                        borderBottom: "0px",
                    }}
                >
                    <Modal.Title>
                        Editing {props.row_data.artist_name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        color: "white",
                        backgroundColor: "rgb(18,18,18)",
                    }}
                >
                    <input
                        id="artistImage"
                        type="file"
                        onChange={onFileChange}
                        style={{ display: "none" }}
                    />
                    <Form.Group controlId="fileB64">
                        <Form.Control
                            type="hidden"
                            value={fileB64Data.b64}
                        ></Form.Control>
                    </Form.Group>
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
                            <label
                                htmlFor="artistImage"
                                className="upload-image-container"
                            >
                                <img
                                    alt="artistArt"
                                    src={artistArtSRC}
                                    style={{
                                        borderRadius: "50%",
                                        minHeight: "128px",
                                        maxHeight: "128px",
                                    }}
                                ></img>
                            </label>
                        </div>
                    </Row>
                    <Row
                        style={{
                            fontSize: "small",
                            color: "grey",
                            textAlign: "center",
                            justifyContent: "center",
                            paddingBottom: "1rem",
                        }}
                    >
                        <Col xs={6}>
                            Allowed Extensions: *.png, *.jpg, *.jpeg
                            <br />
                            Maximum File size: 8MB
                        </Col>
                    </Row>
                    <Row
                        style={{ paddingBottom: "1rem" }}
                        className="justify-content-center"
                    >
                        <Col md={6} sm={12}>
                            <Form.Group controlId="artistName">
                                <Form.Control
                                    style={{ textAlign: "center" }}
                                    placeholder="Artist Name"
                                    defaultValue={props.row_data.artist_name}
                                ></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
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
                            resetDefaults();
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
            </Form>
        </Modal>
    );
};

export default EditArtistModal;
