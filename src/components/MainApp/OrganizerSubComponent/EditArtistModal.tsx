import MaterialTable from "material-table";
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { EditArtistModalProps } from "../../../interface/components/MainApp/OrganizerSubComponent/EditArtistModalProps";
import TABLE_ICONS from "../../generic/MaterialTableIcons";

const EditArtistModal = (props: EditArtistModalProps) => {
    const [saveText, setSaveText] = useState<any>("Save");
    const [saveBtnDisabled, setsaveBtnDisabled] = useState(false);
    return (
        <Modal
            size={"lg"}
            show={props.show}
            onHide={() => props.setShow(false)}
        >
            <Modal.Header
                style={{
                    color: "white",
                    backgroundColor: "rgb(31,31,31)",
                    borderBottom: "0px",
                }}
            >
                <Modal.Title>Editing {props.row_data.artist_name}</Modal.Title>
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
                    <Form.Group controlId="artistName">
                        <Form.Control
                            type="hidden"
                            defaultValue={props.artist_id}
                        ></Form.Control>
                    </Form.Group>
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
                            },
                            {
                                title: "Filename",
                                field: "fileName",
                            },
                            {
                                title: "Track Title",
                                field: "trackTitle",
                            },
                        ]}
                        title={"Tracks selection"}
                        data={Object.entries(props.files_indexes).map(
                            ([file_id, file_item]: any, index) => {
                                return {
                                    file_id: file_id,
                                    rowNum: index + 1,
                                    fileName: file_item.filename,
                                    trackTitle: file_item.file_metadata
                                        .song_title
                                        ? "-"
                                        : file_item.file_metadata.song_title,
                                    tableData: {
                                        checked: true,
                                    },
                                };
                            }
                        )}
                        options={{
                            // paging: false,
                            // search: false,
                            // tableLayout: "fixed",
                            selection: true,
                            selectionProps: (rowData: any) => ({
                                disabled: rowData.file_id === "hi",
                            }),
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
