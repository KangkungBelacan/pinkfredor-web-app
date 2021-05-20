import * as UserAccountComponent from "./../components/UserAccount";
import "./UserAccount.css";

function UserAccount() {
    const link = "http://localhost:3000/"
    return (
        <div className="home-body">
            <UserAccountComponent.Sidebar line1="Home" link1={link} line2="Main App" link2={link+"app"} line3="Help" link3={link+"help"} line4="About" link4={link+""}/>
        </div>
    );
}

export default UserAccount;