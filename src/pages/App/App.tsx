import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.jpeg";
import { useState } from "react";
import * as AppSubPage from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Route} from "react-router";
import { useMediaQuery } from 'react-responsive';

function App() {
    const [showNavBar, setNavBarDisplay] = useState(false);
    const isMobile = useMediaQuery({query: '(max-width: 768px'});

    return (
        <div className="mainapp-body">
            <div style={{ display: "flex" , height:"85vh"}}>
                <MainAppComponent.SideNavBar setNavBarDisplay={setNavBarDisplay} isMobile={isMobile} navBar={showNavBar} />
                {/* <MainAppComponent.Content
                    navBarState={showNavBar}
                    setNavBar={setNavBarDisplay}
                /> */}
                <div className="container-fluid">
                    <div className="row d-md-none d-block">
                        <div className="col" style={{color: "white", padding: "10px", cursor: "pointer"}} onClick={() => { setNavBarDisplay(!showNavBar) }}>
                            <FontAwesomeIcon size="lg" icon="align-justify" />
                        </div>
                    </div>
                    <div className="row">
                        <Route path="/app" exact component={() => <MainAppComponent.Content navBarState={showNavBar} setNavBar={setNavBarDisplay} />} />
                        <Route path="/app/user" component={AppSubPage.UserAccount} />
                        <Route path="/app/linkdrive" component={AppSubPage.LinkGDrive} />
                        <Route path="/app/test" component={AppSubPage.TestPage} />
                        <Route path="/app/organize" component={() => <AppSubPage.Organizer className="mainapp-content-container" /> } />
                    </div>
                </div>
            </div>
            <div className="music-player">
                <MainAppComponent.MusicPlayer song_cover={example_song_cover} />
            </div>
        </div>
    );
}

export default App;
