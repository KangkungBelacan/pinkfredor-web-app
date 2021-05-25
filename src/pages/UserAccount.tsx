import * as UserAccountComponent from "./../components/UserAccount";
import "./UserAccount.css";

function UserAccount() {
    const link = "http://localhost:3000/"
    return (
        <div>
        <UserAccountComponent.Sidebar line1="Home" link1={link} line2="App" link2={link+"app"} line3="Help" link3={link+"help"} line4="About" link4={link+""}/>
            <div className="CorePosition">
                <h1>Account Settings</h1>
                <h2>Personal Information</h2>
                <p>
                    <label className="Label" htmlFor="FirstName">First Name</label>
                    <br/>
                    <input id="FirstName" type="text" placeholder="Your First Name"></input>
                </p>
                <p className="ObjectPosition">
                    <label className="Label" htmlFor="LastName">Last Name</label>
                    <br/>
                    <input id="LastName" type="text" placeholder="Your Last Name"></input>
                </p>
                <p className="ParagraphPosition1">
                    <label className="Label" htmlFor="Email">Email</label>
                    <br/>
                    <input id="Email" type="text" placeholder="Your Email"></input>
                    <p><br/><button className="Button">UPDATE</button></p>
                    <p><h2 className="HeaderLine">H2 Header here</h2></p>
                </p>
                <p>
                    <UserAccountComponent.Password/>
                </p>
                <p className="ParagraphPosition1">
                    <p><br/><button className="Button">UPDATE</button></p>
                    <h2>Number Given In Store</h2>
                    <label className="Label" htmlFor="PhoneNum">Phone Number <a className="LinkText" href={link+"help"}>ⓘ</a></label>
                    <br/>
                    <input id="PhoneNum" type="text" placeholder="Phone Number"></input>
                    <br/>
                    <label className="Label" htmlFor="ClubNum">Club Card Number</label>
                    <br/>
                    <input id="ClubNum" type="text" placeholder="Club Card Number"></input>
                </p>
                <p className="ParagraphPosition2">Need help?Please visit our <a href="#0">Contact Us</a> page!
                <p><br/><button className="Button">UPDATE</button></p></p>
            </div>
        </div>
    );
}

export default UserAccount;