import { useState } from "react";
import * as UserAccountComponent from "../../components/MainApp/UserAccount";
import "./UserAccount.css";
import { useMediaQuery } from "react-responsive";
function UserAccount() {
    const isBiggerThanPhone = useMediaQuery({
        query: "(min-width: 768px)",
    });
    const [activeItem, setActiveItem] = useState(0);
    return (
        <div className="mainapp-content-container">
            <div
                style={{
                    height: "85vh",
                    overflowY: "auto",
                    display: "flex",
                    alignItems: isBiggerThanPhone ? "center" : "normal",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <div
                    className={isBiggerThanPhone ? "container" : "container-fluid"}
                    style={
                        isBiggerThanPhone
                            ? {}
                            : {
                                  paddingLeft: "0",
                                  paddingRight: "0",
                              }
                    }
                >
                    <div className="user-settings-container">
                        <div
                            style={{
                                backgroundColor: "#242424",
                                borderRadius: "0.5rem 0 0 0.5rem",
                            }}
                        >
                            <UserAccountComponent.UserSettingsMenuItem
                                onClick={() => {
                                    setActiveItem(0);
                                }}
                                active={activeItem == 0 ? true : false}
                                faIconClass="cog"
                            />
                            <UserAccountComponent.UserSettingsMenuItem
                                onClick={() => {
                                    setActiveItem(1);
                                }}
                                active={activeItem == 1 ? true : false}
                                faIconClass="address-card"
                            />
                        </div>
                        <div style={{ margin: "10px" }}>
                            <UserAccountComponent.UserGeneralSettings
                                style={{
                                    display: activeItem == 0 ? "block" : "none",
                                }}
                            />
                            <UserAccountComponent.UserProfileSettings
                                style={{
                                    display: activeItem == 1 ? "block" : "none",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;
