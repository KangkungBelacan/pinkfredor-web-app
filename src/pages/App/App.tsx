import * as MainAppComponent from "./../../components/MainApp";
import "./App.css";
import example_song_cover from "./../../images/example-song-cover.png";
import { useEffect, useState } from "react";
import * as AppSubPage from "./index";
import { Route } from "react-router";
import { useMediaQuery } from "react-responsive";
import { ReactSoundProps } from "react-sound";
import { MusicQueueItem } from "../../interface/context/MusicQueueItem";
import { Redirect, useHistory } from "react-router-dom";
import useAxios from "axios-hooks";
import { store } from "../../app/store";
import { Provider } from "react-redux";
import placeholderBG from "../../images/placeholder-bg.jpg";

function App() {
    const history = useHistory();
    const [showNavBar, setNavBarDisplay] = useState(false);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    // ======================================
    // Default Music Player Context Values
    // ======================================
    const [status, setStatus] =
        useState<ReactSoundProps["playStatus"]>("PAUSED");
    const [nowPlayingURL, setNowPlayingURL] = useState("");
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
    const [isLoadingSong, setIsLoadingSong] = useState(false);
    const [
        { data: playlistData, loading: playlistLoading, error: playlistErr },
        playlistRefetch,
    ] = useAxios(
        {
            url: "/api/indexes/playlists",
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        },
        { useCache: false }
    );
    // ======================================
    // ======================================
    useEffect(() => {
        history.listen((location: any) => {
            let config: any = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
                method: "POST",
            };

            fetch("/api/auth/check", config)
                .then((response: any) =>
                    response.json().then((response: any) => {
                        localStorage.token = response.data.new_token;
                    })
                )
                .catch((err: any) => console.log);
        });
    }, []);
    return (
        <div className="mainapp-body max-height">
            <Provider store={store}>
                <div
                    className="mainapp-grid-container max-height"
                    style={{
                        backgroundImage: `url(${placeholderBG})`,
                    }}
                >
                    <MainAppComponent.SideNavBar
                        isMobile={isMobile}
                        setNavBarDisplay={setNavBarDisplay}
                        navBar={showNavBar}
                        className="mainapp-grid-item"
                    />
                    <div className="mainapp-grid-item">
                        {/* Redirect to /app/browse by default */}
                        <Route
                            path="/app"
                            exact
                            render={() => <Redirect to="/app/browse" />}
                        />
                        <Route
                            path="/app/browse"
                            render={() => <MainAppComponent.Browse />}
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
                        <Route
                            exact
                            path="/app/playlist/:playlist_id"
                            component={AppSubPage.Playlist}
                        />
                    </div>

                    <MainAppComponent.MusicPlayer
                        song_cover={example_song_cover}
                        className="mainapp-grid-item"
                    />
                </div>
            </Provider>
        </div>
    );
}

export default App;
