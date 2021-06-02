import React from "react";
import { Dropdown } from "react-bootstrap";
import CustomBootstrapDropDownProps from "../../interface/components/generic/CustomBootstrapDropDownProps";
import "./CustomBootstrapDropDown.css";
const CustomBootstrapDropDown = (props: CustomBootstrapDropDownProps) => {
    const CustomToggle = React.forwardRef(
        ({ children, onClick }: any, ref: any) => (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                ref={ref}
                onClick={(e) => {
                    e.preventDefault();
                    onClick(e);
                }}
            >
                {children}
                {props.icon()}
                {/* <FontAwesomeIcon icon="ellipsis-v" /> */}
            </div>
        )
    );

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    const CustomMenu = React.forwardRef(
        (
            { children, style, className, "aria-labelledby": labeledBy }: any,
            ref: any
        ) => {
            return (
                <div
                    ref={ref}
                    style={style}
                    className={className + " bootstrap-drop-down-container"}
                    aria-labelledby={labeledBy}
                >
                    <ul className="list-unstyled" style={{ marginBottom: "0" }}>
                        {children}
                    </ul>
                </div>
            );
        }
    );

    return (
        <Dropdown
            style={props.style ? props.style : {}}
            className={props.className ? props.className : ""}
        >
            <Dropdown.Toggle
                as={CustomToggle}
                id={props.id}
            ></Dropdown.Toggle>

            <Dropdown.Menu as={CustomMenu}>
                {props.items}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomBootstrapDropDown;
