import { AddArtistModalProps } from "../../../interface/components/MainApp/OrganizerSubComponent/AddArtistModalProps";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { axios, b64ToBlobURL, fileToBase64 } from "../../../global-imports";
import empty_profile_icon from "../../../images/empty_profile_icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddArtistModal = (props: AddArtistModalProps) => {
    const [addText, setAddText] = useState<any>("Add");
    const [addBtnDisabled, setaddBtnDisabled] = useState(false);
    const [artistArtSRC, setartistArtSRC] = useState(empty_profile_icon);
    const [fileB64Data, setfileB64Data] = useState({ b64: "", type: null });

    useEffect(() => {
        if (props.reset) {
            resetDefaults();
        }
    }, [props.reset]);

    const resetDefaults = () => {
        setAddText("Add");
        setaddBtnDisabled(false);
    };
    const onSubmit = (evt: any) => {
        evt.preventDefault();
        setAddText(<FontAwesomeIcon icon="spinner" spin />);
        setaddBtnDisabled(true);

        let payload: any = {
            artists: [{}],
        };

        payload.artists[0].artist_name = evt.target[3].value.trim();
        if (payload.artists[0].artist_name === "") {
            alert("Artist Name cannot be empty");
            setAddText("Add");
            setaddBtnDisabled(false);
            return;
        }

        if (fileB64Data.b64 !== "") {
            payload.artists[0].artist_art = {
                b64: fileB64Data.b64,
                mimeType: fileB64Data.type,
            };
        }

        axios({
            url: "/api/indexes/artists",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
            data: payload,
        })
            .then((response: any) => {
                alert("Successfully added artist");
                resetDefaults();
                let returned_data: any = Object.values(
                    response.data.artists
                )[0];
                const new_t_data = [
                    {
                        artist_id: returned_data.artistid,
                        rowNum: -1,
                        artistName: returned_data.artist_name,
                        artist_art: JSON.stringify(returned_data.artist_art),
                    },
                    ...props.t_data,
                ];
                props.set_t_data(new_t_data);
                props.setShow(false);
            })
            .catch((error: any) => {
                alert("Something went wrong, please try again later");
                resetDefaults();
                console.error(error);
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
                    <Modal.Title>Add Artist</Modal.Title>
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
                            props.setShow(false);
                        }}
                    >
                        Close
                    </button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={addBtnDisabled}
                    >
                        {addText}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddArtistModal;
