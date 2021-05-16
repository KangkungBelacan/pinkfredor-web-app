import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";

function App() {
    return (
        <div className="mainapp-body">
            <h1 className="mainapp-h1">Music Playing from URL test</h1>
            <MainAppComponent.MusicPlayer />
            <h2 className="mainapp-h2">Notes:</h2>
            <h5 className="mainapp-h5">This is just me testing out playing audio from links. I will work on the UI later. This hardly counts as a UI.</h5>
            <h5 className="mainapp-h5">I'm not sure if we'll be streaming audio from links.</h5>
            <h5 className="mainapp-h5">Copy these links into the input box then press confirm to test it out:</h5>
            <p className="mainapp-h5">https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3</p>
            <p className="mainapp-h5">https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3</p>
            <p className="mainapp-h5">https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3</p>
            <p className="mainapp-h5">MP3 sources: https://www.soundhelix.com/audio-examples</p>
        </div>
    );
}

export default App;
