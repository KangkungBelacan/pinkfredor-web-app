import * as UserAccountComponent from "../../components/UserAccount";
import "./UserAccount.css";
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
                        <UserAccountComponent.UserSettingsMenuItem />
                    </div>
                    <div style={{ margin: "10px" }}>Content Here</div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;
