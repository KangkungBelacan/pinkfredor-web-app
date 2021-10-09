// import * as UserAccountComponent from "../../components/UserAccount";
import "./UserAccount.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function UserAccount() {
    return (
        <div className="mainapp-content-container">
            <div
                style={{
                    height: "85vh",
                    overflowY: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="user-settings-container">
                    <div
                        style={{
                            backgroundColor: "#242424",
                            borderRadius: "0.5rem 0 0 0.5rem",
                        }}
                    >
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
                                <FontAwesomeIcon
                                    icon="address-book"
                                    size="lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{ margin: "10px" }}>Content Here</div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;
