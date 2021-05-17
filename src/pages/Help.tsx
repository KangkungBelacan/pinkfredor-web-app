import app_img from "./../images/Logo.png";
import * as HelpComponent from "./../components/Help";
import "./Help.css";

function Help() {
    return (
        <div className="help-body">
            <nav className="help-tr-nav-bar-container">
                <a href="http://localhost:3000/" className="help-tr-nav-bar-items-container">Home</a>
                <a href="http://localhost:3000/app" className="help-tr-nav-bar-items-container">Main App</a>
                <a href="" className="help-tr-nav-bar-items-container">About</a>
                <div className="help-tr-nav-bar-items-container">Log Out</div>
            </nav>
            <h2 className="GlowBig">Help Centre</h2>
            <p className="GlowSmall">Welcome To Help Centre</p>
            <br />
            <img src={app_img} alt="App_Image" className="CenterImage"></img>
            <br />
            <p className="GlowMedium">『Articles Related』</p>
            <p className="CommonText">『Introduction』</p>
            <HelpComponent.CollapsibleText title="What can i do?" content="I used to streams your music collections from Google Drive!"/>
            <p className="CommonText">『User』</p>
            <HelpComponent.CollapsibleText title="How to sign up" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to log out" content="There will be an answer when the whole website has done!"/>
            <p className="CommonText">『Music』</p>
            <HelpComponent.CollapsibleText title="How to play a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to pause a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to stop a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to skip a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to loop a music" content="There will be an answer when the whole website has done!"/>
            <p className="CommonText">『Coming Soon』</p>
            <HelpComponent.CollapsibleText title="Comming Soon" content="There will be an answer when the whole website has done!"/>
            <p className="CommonText">『Bugs Report!』</p>
            <p><HelpComponent.TestComponent/></p>
        </div>
    );
}

export default Help;
