import * as UserAccountComponent from "./../components/UserAccount";
import "./UserAccount.css";

function UserAccount() {
    const link = "http://localhost:3000/"
    return (
        <div>
            <UserAccountComponent.Sidebar line1="Home" link1={link} line2="App" link2={link+"app"} line3="Help" link3={link+"help"} line4="About" link4={link+""}/>
            <h1>Account Settings</h1>
            <h2>Personal Information</h2>
            <p>
                <label className="Label" htmlFor="FirstName">First Name</label>
                <input id="FirstName" type="text" placeholder="Your First Name"></input>
                <label className="Label" htmlFor="LastName">Last Name</label>
                <input id="LastName" type="text" placeholder="Your Last Name"></input>
                <br/>
                <label className="Label" htmlFor="Email">Email</label>
                <br/>
                <input id="Email" type="text" placeholder="Your Email"></input>
                <br/>
                <button>UPDATE</button>
            </p>
            <p>
                <UserAccountComponent.Password/>
            </p>
            <p>
                <h2>Number Given In Store</h2>
                <label className="Label" htmlFor="PhoneNum">Phone Number</label>
                <br/>
                <input id="PhoneNum" type="text" placeholder="Phone Number"></input>
                <br/>
                <label className="Label" htmlFor="ClubNum">Club Card Number</label>
                <br/>
                <input id="ClubNum" type="text" placeholder="Club Card Number"></input>
                <p>Need help?Please visit our <a href="#">Contact Us</a> page!</p>
                <button>UPDATE</button>
            </p>
        </div>
    );
}

export default UserAccount;