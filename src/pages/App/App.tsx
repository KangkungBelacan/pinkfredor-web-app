import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.jpeg";
import { useState } from "react";

function App() {
    const [showNavBar, setNavBarDisplay] = useState(false);

    return (
        <div className="mainapp-body">
            <div style={{ display: "flex" , height:"100vh"}}>
                <MainAppComponent.SideNavBar navBar={showNavBar} />
                <MainAppComponent.Content
                    navBarState={showNavBar}
                    setNavBar={setNavBarDisplay}
                />
            </div>
            <div className="music-player">
                <MainAppComponent.MusicPlayer song_cover={example_song_cover} />
            </div>
        </div>
    );
}

export default App;
