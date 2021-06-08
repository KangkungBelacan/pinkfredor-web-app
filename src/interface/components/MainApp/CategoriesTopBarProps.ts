import { GenericProps } from "../../GenericProps";
import { CategoriesTopBarItemProps } from "./CategoriesTopBarItemProps";

export interface CategoriesTopBarProps extends GenericProps {

    // Each item in this array represent item to show on the topbar
    items?: Array<CategoriesTopBarItemProps>
}