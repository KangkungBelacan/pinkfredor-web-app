import * as UserAccountComponent from "./../components/UserAccount";
import "./UserAccount.css";

function UserAccount() {
    const link = "http://localhost:3000/"
    return (
        <div className="flex">
        <UserAccountComponent.NewSideBar/>
            <div>
                <h1>Account Settings</h1>
                <h2>Personal Information</h2>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="FirstName">First Name</label><br/>
                        <input id="FirstName" type="text" placeholder="Your First Name"></input>
                    </div>
                    <div>
                        <label className="Label" htmlFor="LastName">Last Name</label><br/>
                        <input id="LastName" type="text" placeholder="Your Last Name"></input>
                    </div>                    
                </div>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="Email">Email</label><br/>
                        <input id="Email" type="text" placeholder="Your Email"></input>
                    </div>
                </div>
                <div className="flex">
                    <div><button className="Button">UPDATE</button></div>
                </div>
                <UserAccountComponent.Password/>
                <br/><h2>Number Given In Store</h2>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="PhoneNum">Phone Number <a className="LinkText" href={link+"help"}>ⓘ</a></label><br/>
                        <input id="PhoneNum" type="text" placeholder="Phone Number"></input>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <label className="Label" htmlFor="ClubNum">Club Card Number</label><br/>
                        <input id="ClubNum" type="text" placeholder="Club Card Number"></input>
                    </div>
                </div>
                <div className="flex">
                    <div>Need help?Please visit our <a href="">Contact Us</a> page!</div>
                </div>
                <div className="flex">
                    <div><button className="Button">UPDATE</button></div>
                </div>
            </div>
        </div>
    );
}

export default UserAccount;