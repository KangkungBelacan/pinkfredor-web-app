import React from 'react'
import * as MainAppComponent from './../../components/MainApp';
import NavBar from './../../components/Home/Navbar'
import './App.css';

function App() {
    return (
        <div className='mainapp-body'>
            <div>
                <NavBar />
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
