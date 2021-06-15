import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.png";
import { useState } from "react";
import * as AppSubPage from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Route} from "react-router";
import { useMediaQuery } from 'react-responsive';
import MusicPlayerContext from "../../context/MusicPlayerContext";
import MusicPlayerContextDefaultValues from "../../context/MusicPlayerContextDefaultValues";
function App() {
    const [showNavBar, setNavBarDisplay] = useState(false);
    const isMobile = useMediaQuery({query: '(max-width: 768px)'});
    const ContextValues = MusicPlayerContextDefaultValues();
    return (
        <div className="mainapp-body">
            <MusicPlayerContext.Provider value={ContextValues}>
                <div style={{ display: "flex" , height:"85vh"}}>
                    <MainAppComponent.SideNavBar isMobile={isMobile} setNavBarDisplay={setNavBarDisplay} navBar={showNavBar} />
                    {/* <MainAppComponent.Content
                        navBarState={showNavBar}
                        setNavBar={setNavBarDisplay}
                    /> */}
                    <div className="container-fluid" style={{width: isMobile ? "100%" : "calc(100% - 250px)"}}>
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
                            <Route path="/app/organize" render={() => <AppSubPage.Organizer className="mainapp-content-container" /> } />
                        </div>
                    </div>
                </div>
                <div className="music-player">
                    <MainAppComponent.MusicPlayer song_cover={example_song_cover} />
                </div>
            </MusicPlayerContext.Provider>
        </div>
    );
}

export default App;
