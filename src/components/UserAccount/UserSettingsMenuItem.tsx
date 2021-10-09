import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { UserSettingsMenuItemProps } from "../../interface/components/UserAccount/UserSettingsMenuItemProps";
const UserSettingsMenuItem = (props: UserSettingsMenuItemProps) => {
    const [hover, setHover] = useState(false);
    return (
        <div
            className="user-settings-menu-item-container"
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={props.onClick}
        >
            <div></div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        height: props.active ? "48px" : hover ? "8px" : "0px",
                        backgroundColor: "white",
                        width: "4px",
                        borderRadius: "4px",
                        transition: "height .25s",
                    }}
                ></div>
            </div>
            <div
                className="user-settings-menu-item"
                style={hover || props.active ? { color: "white" } : {}}
            >
                <FontAwesomeIcon icon={props.faIconClass} size="lg" />
            </div>
        </div>
    );
};

export default UserSettingsMenuItem;
