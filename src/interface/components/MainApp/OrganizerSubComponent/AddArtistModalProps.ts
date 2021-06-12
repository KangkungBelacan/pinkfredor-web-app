import { ModalBoxProps } from "./ModalBoxProps";

export interface AddArtistModalProps extends ModalBoxProps {
    /**
     * Trigger form reset
     */
    reset?: boolean;

    t_data: any;
    set_t_data: any;
}