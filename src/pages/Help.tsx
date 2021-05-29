// import app_img from "./../images/Logo.png";
import * as HelpComponent from "./../components/Help";
import "./Help.css";

function Help() {
    return (
        <div>
            <nav className="tr-nav-bar-container">
                <a href="http://localhost:3000/" className="tr-nav-bar-items-container">Home</a>
                <a href="http://localhost:3000/app" className="tr-nav-bar-items-container">Main App</a>
                <a href="#0" className="tr-nav-bar-items-container">About</a>
                <div className="tr-nav-bar-items-container">Log Out</div>
            </nav>
            <div><h2 style={{marginLeft: "485px",fontSize: "30px"}}>Welcome To Help Centre!</h2><br/></div>
            <HelpComponent.CollapsibleText title="What can i do?" content="I used to streams your music collections from Google Drive!"/>
            <HelpComponent.CollapsibleText title="How to sign up" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to log out" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to play a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to pause a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to stop a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to skip a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="How to loop a music" content="There will be an answer when the whole website has done!"/>
            <HelpComponent.CollapsibleText title="Comming Soon" content="There will be an answer when the whole website has done!"/><br/>
            <h2 style={{marginLeft: "570px",fontSize: "30px"}}>Bugs Report</h2><br/>
            <div style={{marginLeft: "570px"}}><HelpComponent.TestComponent/></div>
        </div>
    );
}

export default Help;
