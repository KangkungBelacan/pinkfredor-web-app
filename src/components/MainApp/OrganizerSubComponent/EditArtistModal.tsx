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

                    <MaterialTable
                        icons={TABLE_ICONS}
                        columns={[
                            {
                                title: "file_id",
                                field: "file_id",
                                hidden: true,
                            },
                            {
                                title: "No.",
                                field: "rowNum",
                                width: "48px"
                            },
                            {
                                title: "Filename",
                                field: "fileName",
                                width: "auto"
                            },
                            {
                                title: "Track Title",
                                field: "trackTitle",
                                width: "auto"
                            },
                        ]}
                        title={"Tracks selection"}
                        data={Object.entries(props.files_indexes).map(
                            ([file_id, file_item]: any, index) => {
                                // if(Object.keys(file_item.file_metadata).length !== 0) {
                                //     let pp = 3;
                                // }
                                return {
                                    file_id: file_id,
                                    rowNum: index + 1,
                                    fileName: file_item.filename,
                                    trackTitle: file_item.file_metadata
                                        .song_title
                                        ? "-"
                                        : file_item.file_metadata.song_title,
                                    tableData: {
                                        checked:
                                            file_item.file_metadata
                                                .song_artistid ===
                                            props.row_data.artist_name,
                                    },
                                };
                            }
                        )}
                        options={{
                            // paging: false,
                            // search: false,
                            tableLayout: "fixed",
                            selection: true,
                            // selectionProps: (rowData: any) => ({
                            //     tableData: {checked: rowData.song_artistid === props.row_data.artist_name}
                            // }),
                        }}
                    ></MaterialTable>
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
