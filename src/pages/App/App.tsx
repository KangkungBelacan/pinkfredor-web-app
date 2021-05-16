import * as MainAppComponent from './../../components/MainApp';
import NavBar from './../../components/Home/Navbar'
import './App.css';

function App() {
    return (
        <div className='mainapp-body'>
            <NavBar />
            <h1 className='mainapp-h1'>Music Player Test</h1>
            <MainAppComponent.MusicPlayer />
        </div>
    );
}

export default App;
