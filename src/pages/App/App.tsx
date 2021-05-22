import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.jpeg";

function App() {
    return (
        <div className="mainapp-body">
            <div style={{ display: "flex", height: "85vh" }}>
                <MainAppComponent.SideNavBar />
                <MainAppComponent.Content />
            </div>
            <MainAppComponent.MusicPlayer song_cover={example_song_cover} />
        </div>
    );
}

export default App;
