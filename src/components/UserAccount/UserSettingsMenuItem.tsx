import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const UserSettingsMenuItem = () => {
    return (
        <div className="user-settings-menu-item-container">
            <div></div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        height: "4px",
                        backgroundColor: "white",
                        width: "4px",
                        borderRadius: "4px",
                        transition: "height .25s",
                    }}
                ></div>
            </div>
            <div className="user-settings-menu-item">
                <FontAwesomeIcon icon="address-book" size="lg" />
            </div>
        </div>
    );
};

export default UserSettingsMenuItem;
