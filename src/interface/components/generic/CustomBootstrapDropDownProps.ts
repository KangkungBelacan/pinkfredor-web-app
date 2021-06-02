import { GenericProps } from "../../GenericProps";


export default interface CustomBootstrapDropDownProps extends GenericProps {
    /**
     * ID of this drop down
     */
    id: string;

    /**
     * An array of <Dropdown.Item> 
     * Refer to react-bootstrap
     */
    items: Array<any>;

    /**
     * Icon to use
     * Pass in a function to render your icon
     */
    icon: () => {};
}