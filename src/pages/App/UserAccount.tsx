import { CategoriesTopBarItemProps } from "../../interface/components/MainApp/CategoriesTopBarItemProps";
import CategoriesTopBar from "../../components/MainApp/CategoriesTopBar";
// import * as UserAccountComponent from "../../components/UserAccount";
import "./UserAccount.css";

function UserAccount() {
    let items: Array<CategoriesTopBarItemProps> = [
        {
            display_text: "Info",
            faIconClass: "info-circle",
            link: "/app/user/info",
        },
        {
            display_text: "Settings",
            faIconClass: "user-cog",
            link: "/app/user/settings",
        },
        {
            display_text: "Google Drive",
            faIconClass: ["fab", "google-drive"],
            link: "/app/linkdrive",
        },
    ];
    return (
        <div className="mainapp-content-container">
            <div style={{height: "85vh", overflowY: "auto"}}>
                
            </div>
        </div>
    );
}

export default UserAccount;
