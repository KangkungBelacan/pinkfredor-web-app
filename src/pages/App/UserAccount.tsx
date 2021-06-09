import * as UserAccountComponent from "../../components/UserAccount";
import "./UserAccount.css"

function UserAccount() {
    const link = "http://localhost:3000/"
    return (
        <div className="flex">
            <div>
                <h1 className="Text">Account Settings</h1>
                <h2 className="Text">Personal Information</h2>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="FirstName">First Name</label><br/>
                        <input className="Input" id="FirstName" type="text" placeholder="Your First Name"></input>
                    </div>
                    <div>
                        <label className="Label" htmlFor="LastName">Last Name</label><br/>
                        <input className="Input" id="LastName" type="text" placeholder="Your Last Name"></input>
                    </div>         
                </div>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="Email">Email</label><br/>
                        <input className="Input" id="Email" type="text" placeholder="Your Email"></input>
                    </div>
                </div>
                <div><button className="Button">UPDATE</button></div>
                <UserAccountComponent.Password/>
                <br/><h2 className="Text">Number Given In Store</h2>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="PhoneNum">Phone Number <a className="LinkText" href={link+"help"}>ⓘ</a></label><br/>
                        <input className="Input" id="PhoneNum" type="text" placeholder="Phone Number"></input>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="ClubNum">Club Card Number</label><br/>
                        <input className="Input" id="ClubNum" type="text" placeholder="Club Card Number"></input>
                    </div>
                </div>
                <div>Need help?Please visit our <a href="">Contact Us</a> page!</div>
                <div><button className="Button">UPDATE</button></div>
            </div>
        </div>
    );
}

export default UserAccount;