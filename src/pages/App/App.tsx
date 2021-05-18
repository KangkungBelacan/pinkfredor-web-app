import * as MainAppComponent from './../../components/MainApp';
import './App.css';



function App() {

    return (
        <div className='mainapp-body'>
            <div>
                <nav className="tr-nav-bar-container">
                    <a href="http://localhost:3000/" className="tr-nav-bar-items-container">Home</a>
                    <a href="http://localhost:3000/app" className="tr-nav-bar-items-container">Help</a>
                    <a href="" className="tr-nav-bar-items-container">About</a>
                    <div className="tr-nav-bar-items-container">Log Out</div>
                </nav>
                <h1 className='mainapp-h1'>Music Player Test</h1>
                <MainAppComponent.MusicPlayer />
            </div>
        </div>
    );
}

export default App;
