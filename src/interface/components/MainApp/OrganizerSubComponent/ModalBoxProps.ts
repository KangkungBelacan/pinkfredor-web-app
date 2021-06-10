import { Dispatch, SetStateAction } from "react";
import { GenericProps } from "../../../GenericProps";

export interface ModalBoxProps extends GenericProps {
    /**
     *   Expecting a React State that decides if this component show or not
     */
    show: boolean;

    /**
     * Function to set if this modal shows
     */
    setShow: Dispatch<SetStateAction<boolean>>;
}
