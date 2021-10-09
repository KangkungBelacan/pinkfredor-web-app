import { useState } from "react";
import * as UserAccountComponent from "../../components/UserAccount";
import "./UserAccount.css";
function UserAccount() {
    // There might be better way to do this
    const [active, setActive] = useState(false);
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
                        <UserAccountComponent.UserSettingsMenuItem
                            onClick={() => {
                                console.log("do something that changes the subpages");
                                setActive(!active);
                            }}
                            active={active}
                            faIconClass="address-book"
                        />
                    </div>
                    <div style={{ margin: "10px" }}>Content Here</div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;
