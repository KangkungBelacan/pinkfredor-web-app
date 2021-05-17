import * as HelpComponent from "./../components/Help";
import "./Help.css";

function Help() {
    return (
        <div className="help-body">
            <nav className="tr-nav-bar-container">
                <div className="tr-nav-bar-items-container">Home</div>
                <div className="tr-nav-bar-items-container">Main App</div>
                <div className="tr-nav-bar-items-container">About</div>
                <div className="tr-nav-bar-items-container">Log Out</div>
            </nav>
            <h2 className="GlowBig">Help Centre</h2>
            <p className="GlowSmall">Welcome To Help Centre</p>
            <p className="CommonText">『Article Related』</p>
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
