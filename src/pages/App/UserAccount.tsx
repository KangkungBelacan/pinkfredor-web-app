import { CategoriesTopBarItemProps } from "../../interface/components/MainApp/CategoriesTopBarItemProps";
import CategoriesTopBar from "../../components/MainApp/CategoriesTopBar";
import * as UserAccountComponent from "../../components/UserAccount";
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
                <h1 className="Text" style={{ margin: "10px" }}>
                    Account Settings
                </h1>
                <h2 className="Text" style={{ margin: "10px" }}>
                    Personal Information
                </h2>
                <div className="flex">
                    <div style={{ margin: "10px" }}>
                        <label className="Label" htmlFor="FirstName">
                            First Name
                        </label>
                        <br />
                        <input
                            className="Input"
                            id="FirstName"
                            type="text"
                            placeholder="Your First Name"
                        ></input>
                    </div>
                    <div style={{ margin: "10px" }}>
                        <label className="Label" htmlFor="LastName">
                            Last Name
                        </label>
                        <br />
                        <input
                            className="Input"
                            id="LastName"
                            type="text"
                            placeholder="Your Last Name"
                        ></input>
                    </div>
                </div>
                <div className="flex">
                    <div style={{ margin: "10px" }}>
                        <label className="Label" htmlFor="Email">
                            Email
                        </label>
                        <br />
                        <input
                            className="Input"
                            id="Email"
                            type="text"
                            placeholder="Your Email"
                        ></input>
                    </div>
                </div>
                <div style={{ margin: "10px" }}>
                    <button className="Button">UPDATE</button>
                </div>
                <UserAccountComponent.Password />
                <br />
                <h2 className="Text" style={{ margin: "10px" }}>
                    Number Given In Store
                </h2>
                <div className="flex">
                    <div style={{ margin: "10px" }}>
                        <label className="Label" htmlFor="PhoneNum">
                            Phone Number{" "}
                            <a className="LinkText" href={"/help"}>
                                ⓘ
                            </a>
                        </label>
                        <br />
                        <input
                            className="Input"
                            id="PhoneNum"
                            type="text"
                            placeholder="Phone Number"
                        ></input>
                    </div>
                </div>
                <div className="flex">
                    <div style={{ margin: "10px" }}>
                        <label className="Label" htmlFor="ClubNum">
                            Club Card Number
                        </label>
                        <br />
                        <input
                            className="Input"
                            id="ClubNum"
                            type="text"
                            placeholder="Club Card Number"
                        ></input>
                    </div>
                </div>
                <div>
                    Need help?Please visit our <a href="">Contact Us</a> page!
                </div>
                <div style={{ margin: "10px" }}>
                    <button className="Button">UPDATE</button>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;
