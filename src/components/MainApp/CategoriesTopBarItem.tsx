import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CategoriesTopBarItemProps } from "../../interface/components/MainApp/CategoriesTopBarItemProps";
const CategoriesTopBarItem = (props: CategoriesTopBarItemProps) => {
    const CONT_CLASS = "top-bar-item-container";
    const CONT_STYLE = {};
    const location = useLocation();

    let active = false;
    if (location.pathname === props.link) {
        active = true;
    }

    let custom_icon =
        props.CustomIconElement !== undefined ? (
            props.CustomIconElementProps !== undefined ? (
                <props.CustomIconElement {...props.CustomIconElementProps} />
            ) : (
                <props.CustomIconElement />
            )
        ) : (
            []
        );

    return (
        <Link
            to={props.link ? props.link : location.pathname}
            className={
                (props.className ? props.className + CONT_CLASS : CONT_CLASS) +
                (active ? " selected" : "")
            }
            style={props.style ? { ...props.style, ...CONT_STYLE } : CONT_STYLE}
        >
            {props.faIconClass !== undefined ? (
                <FontAwesomeIcon size="lg" icon={props.faIconClass} />
            ) : (
                []
            )}
            {custom_icon}

            <div>{props.display_text}</div>
        </Link>
    );
};

export default CategoriesTopBarItem;
