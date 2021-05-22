import * as MainAppComponent from './../../components/MainApp';
import './App.css';
import example_song_cover from './../../images/example-song-cover.jpeg'

function App() {

    return (
        <div className='mainapp-body'>
            <div>
                <MainAppComponent.SideNavBar />
                <MainAppComponent.Content />
                <MainAppComponent.MusicPlayer song_cover={example_song_cover}/>
            </div>
        </div>
    );
}

export default App;
