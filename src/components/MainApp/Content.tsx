// import ReactDOM from 'react-dom'
import { forwardRef } from 'react';
import "./Content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MaterialTable from "material-table";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {Icons} from 'material-table';

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

interface Element {

}

function Content(props: any): JSX.Element {

    const [topBarSelection, setTopBar] = useState(0)
    const [songsQuery, setSongsQuery] = useState("")
    const [inputFocus, setInputFocus] = useState(false)
    const [songResults, setSongsResults] = useState<Element>([])

    var example_songs = [
        {
            id: 1,
            title: "Apple",
            length: "3:23",
            artist: "Test artist 1",
            album: "Test album 1",
            album_tr_no: 0,
            date_added: "13-5-2021",
            genre: "Pop"
        },
        {
            id: 2,
            title: "Banana",
            length: "9:30",
            artist: "Test artist 1",
            album: "Test album 1",
            album_tr_no: 1,
            date_added: "14-5-2021",
            genre: "Rock"
        },
        {
            id: 3,
            title: "Cat",
            length: "5:20",
            artist: "Test artist 1",
            album: "Test album 1",
            album_tr_no: 2,
            date_added: "15-5-2021",
            genre: "Jazz"
        },
        {
            id: 4,
            title: "Donkey",
            length: "1:47",
            artist: "Test artist 2",
            album: "Test album 2",
            album_tr_no: 0,
            date_added: "16-5-2021",
            genre: "Pop"
        },
        {
            id: 5,
            title: "Fish",
            length: "2:43",
            artist: "Test artist 2",
            album: "Test album 2",
            album_tr_no: 1,
            date_added: "16-5-2021",
            genre: "Jazz"
        },
    ]

    function selectSong(target: any) {
        console.log("Selected: " + target)
    }

    function renderSongResult(song: any) {
        return (
            <li
                style={{ display: "flex", float: "left", padding: "5px" }}
                key={song.id}
                className="song"
                onClick={(event) => selectSong(event.currentTarget)}
            >
                <div className="number" style={{ paddingRight: "10px" }}>{song.id}</div>
                <div style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <div className="title">{song.title}</div>
                    <div className="length">{song.length}</div>
                    <div className="artist">{song.artist}</div>
                    <div className="album">{song.album}</div>
                    <div className="genre">{song.genre}</div>
                </div>
            </li>
        );
    }

    function searchBarUpdate(event: any) {
        var query = event.currentTarget.value
        setSongsQuery(query)
        let i;
        let newSongsResults = [];
        if (query !== "") {
            for (i = 0; i < example_songs.length; i++) {
                if (example_songs[i].title.toLowerCase().includes(query.toLowerCase())) {
                    newSongsResults.push(example_songs[i])
                }
            }
            rerenderSongsList(newSongsResults)
        }
        else {
            rerenderSongsList(example_songs)
        }
    }

    function rerenderSongsList(newResults: any) {
        setSongsResults(newResults.map((song: any) => renderSongResult(song)))
    }

    return (
        <div className="container-fluid mainapp-content-container" style={{ color: "#ffffff" }}>
            <div className="row content-top-bar col-12">
                {/* Only show when screen size is small */}
                <div className="d-sm-block d-md-none col-sm-2 col-12">
                    <div style={{ padding: "10px", cursor: "pointer" }} onClick={() => props.setNavBar(!props.navBarState)}>
                        <FontAwesomeIcon icon="align-justify" />
                    </div>
                </div>
                <div className="col-sm-8 col-md-10 col-12">
                    <div className={topBarSelection === 1 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(1); }}>All songs</div>
                    <div className={topBarSelection === 2 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(2); }}>Artists</div>
                    <div className={topBarSelection === 3 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(3); }}>Albums</div>
                    <div className={topBarSelection === 4 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={() => { setTopBar(4); }}>Genres</div>
                </div>
                <div className="songs-section" style={{ display: 'flex', flexDirection: 'column', marginBottom: "150px" }}>
                    <input className="songs-search-bar" style={(songsQuery === "" && !inputFocus) ? { width: '10px' } : { width: '100%' }} value={songsQuery} onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} onChange={(event) => searchBarUpdate(event)} />
                    <div className="songs-table">
                        <MaterialTable
                        icons={tableIcons}
                            columns={[
                                { title: "Adı", field: "name" },
                                { title: "Soyadı", field: "surname" },
                                { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
                                {
                                    title: "Doğum Yeri",
                                    field: "birthCity",
                                    lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
                                },
                            ]}
                            data={[
                                {
                                    name: "Mehmet",
                                    surname: "Baran",
                                    birthYear: 1987,
                                    birthCity: 63,
                                },
                            ]}
                            title="Demo Title"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}
export default Content;
