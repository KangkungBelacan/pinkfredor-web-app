import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.png";
import { useState } from "react";
import * as AppSubPage from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Route } from "react-router";
import { useMediaQuery } from "react-responsive";
import MusicPlayerContext from "../../context/MusicPlayerContext";
// import MusicPlayerContextDefaultValues from "../../context/MusicPlayerContextDefaultValues";
import { ReactSoundProps } from "react-sound";
import { MusicQueueItem } from "../../interface/context/MusicQueueItem";

function App() {
    const [showNavBar, setNavBarDisplay] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    // const ContextValues = MusicPlayerContextDefaultValues();
    const [status, setStatus] =
        useState<ReactSoundProps["playStatus"]>("PAUSED");
    const [nowPlayingURL, setNowPlayingURL] = useState("");
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(100);
    const [queue, setQueue] = useState([
        // {
        //     item_id: "kanolove",
        //     current: false,
        //     playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu`,
        //     song_title: "Santuary",
        //     song_artist: "Kano"
        // },
        // {
        //     item_id: "kanolove2",
        //     current: false,
        //     playingURL: `/api/driveapi/files/download?token=${localStorage.token}&fileid=1PlatVBCh_3yqHJAYt5BaEj_cgjnSiDMo`,
        //     song_title: "decide",
        //     song_artist: "Kano"
        // },
    ] as Array<MusicQueueItem>);
    const [songTitleLabel, setSongTitleLabel] = useState("-");
    const [songArtistLabel, setSongArtistLabel] = useState("-");
    const [songAlbumArtURL, setSongAlbumArtURL] =
        useState<any>(example_song_cover);
    const ContextValues = {
        status,
        setStatus,
        nowPlayingURL,
        setNowPlayingURL,
        progress,
        setProgress,
        volume,
        setVolume,
        queue,
        setQueue,
        songTitleLabel,
        setSongTitleLabel,
        songArtistLabel,
        setSongArtistLabel,
        songAlbumArtURL,
        setSongAlbumArtURL,
    };
    return (
        <div className="mainapp-body">
            <MusicPlayerContext.Provider value={ContextValues}>
                <MainAppComponent.SideNavBar
                    isMobile={isMobile}
                    setNavBarDisplay={setNavBarDisplay}
                    navBar={showNavBar}
                />
                <div className="mainapp-grid-container">
                    <div className="d-md-block d-none"></div>
                    <div
                        className="container-fluid"
                        style={{
                            overflowX: "auto",
                        }}
                    >
                        <div className="row d-md-none d-block">
                            <div
                                className="col"
                                style={{
                                    color: "white",
                                    padding: "10px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setNavBarDisplay(!showNavBar);
                                }}
                            >
                                <FontAwesomeIcon
                                    size="lg"
                                    icon="align-justify"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <Route
                                path="/app"
                                exact
                                render={() => (
                                    <MainAppComponent.Browse
                                        setStatus={setStatus}
                                        setNowPlayingURL={setNowPlayingURL}
                                        setProgress={setProgress}
                                        queue={queue}
                                        setQueue={setQueue}
                                        setSongTitleLabel={setSongTitleLabel}
                                        setSongArtistLabel={setSongArtistLabel}
                                        setSongAlbumArtURL={setSongAlbumArtURL}
                                    />
                                )}
                            />
                            <Route
                                path="/app/user"
                                component={AppSubPage.UserAccount}
                            />
                            <Route
                                path="/app/linkdrive"
                                component={AppSubPage.LinkGDrive}
                            />
                            <Route
                                path="/app/test"
                                component={AppSubPage.TestPage}
                            />
                            <Route
                                path="/app/organize"
                                render={() => (
                                    <AppSubPage.Organizer className="mainapp-content-container" />
                                )}
                            />
                        </div>
                    </div>

                    <MainAppComponent.MusicPlayer
                        song_cover={example_song_cover}
                    />
                </div>
            </MusicPlayerContext.Provider>
        </div>
    );
}

export default App;
