import { CategoriesTopBarProps } from "../../interface/components/MainApp/CategoriesTopBarProps";
import CategoriesTopBarItem from "./CategoriesTopBarItem";
import "./CategoriesTopBar.css";
const CategoriesTopBar = (props: CategoriesTopBarProps) => {
    const CONT_CLASS = " row justify-content-center p-3 border-bottom";
    let content_components = [];
    if (props.items !== undefined) {
        for (let i = 0; i < props.items.length; i++) {
            content_components.push(
                <CategoriesTopBarItem {...props.items[i]} />
            );
        }
    }
    return (
        <div
            className={
                props.className ? props.className + CONT_CLASS : CONT_CLASS
            }
            style={props.style ? props.style : {}}
        >{content_components}</div>
    );
};

export default CategoriesTopBar;
