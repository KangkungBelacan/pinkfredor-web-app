import React from 'react'
import * as MainAppComponent from './../../components/MainApp';
import NavBar from './../../components/Home/Navbar'
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
            </div>
            <div>
                <MainAppComponent.Playlist/>
            </div>
            <p>Note: Input box is just for testing link queing, music playing doesn't work for now.
            I'll fix the music playing and queing logic later.
            </p>
            <p>My plan is to:</p>
            <p>Make the music player and playlist displayer/organiser receive an array of songs and then play them in order, skip, etc.
            Basically a standard music player.
            </p>
            <MainAppComponent.MusicPlayer />
        </div>
    );
}

export default App;
