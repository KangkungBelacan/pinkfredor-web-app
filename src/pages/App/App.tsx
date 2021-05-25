import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.jpeg";
import { useState } from "react";
import * as AppSubPage from "./index";
import {Route} from "react-router";

function App() {
    const [showNavBar, setNavBarDisplay] = useState(false);

    return (
        <div className="mainapp-body">
            <div style={{ display: "flex" , height:"100vh"}}>
                <MainAppComponent.SideNavBar navBar={showNavBar} />
                {/* <MainAppComponent.Content
                    navBarState={showNavBar}
                    setNavBar={setNavBarDisplay}
                /> */}
                <Route path="/app" exact component={() => <MainAppComponent.Content navBarState={showNavBar} setNavBar={setNavBarDisplay} />} />
                <Route path="/app/user" component={AppSubPage.UserAccount} />
                <Route path="/app/linkdrive" component={AppSubPage.LinkGDrive} />
                <Route path="/app/test" component={AppSubPage.TestPage} />
            </div>
            <div className="music-player">
                <MainAppComponent.MusicPlayer song_cover={example_song_cover} />
            </div>
        </div>
    );
}

export default App;
