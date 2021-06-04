import { EditModalBoxProps } from "./EditModalBoxProps";

export default interface EditTrackModalProps extends EditModalBoxProps {
    row_data: {
        filename?: string,
        drive_location?: string
        track_title?: string,
        track_artist?: string,
        track_album?: string,
        album_tr_no?: number,
        track_genre?: string
    },

    /**
     * Data passed from parent component
     */
    passedData: any
}