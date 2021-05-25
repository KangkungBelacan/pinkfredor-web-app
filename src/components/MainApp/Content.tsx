// import ReactDOM from 'react-dom'
import { forwardRef } from 'react';
import "./Content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import MaterialTable, { MTableBodyRow } from "material-table";

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
import { Icons } from 'material-table';

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
    const song_columns = [
        { title: "Title", field: "title" },
        { title: "Length", field: "length" },
        { title: "Artist", field: "artist" },
        { title: "Album", field: "album" }
    ]

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

    const [topBarSelection, setTopBar] = useState(0)
    const [songsQuery, setSongsQuery] = useState("")
    const [inputFocus, setInputFocus] = useState(false)
    const [songResults, setSongsResults] = useState<Element>([])
    const [tableData, setTableData] = useState(example_songs);

    const DragState = {
        row: -1,
        dropIndex: -1, // drag target
    };

    const offsetIndex = (from: any, to: any, arr: any = []) => {
        if (from < to) {
            let start = arr.slice(0, from),
                between = arr.slice(from + 1, to + 1),
                end = arr.slice(to + 1);
            return [...start, ...between, arr[from], ...end];
        }
        if (from > to) {
            let start = arr.slice(0, to),
                between = arr.slice(to, from),
                end = arr.slice(from + 1);
            return [...start, arr[from], ...between, ...end];
        }
        return arr;
    };
    const reOrderRow = (from: any, to: any) => {
        let newtableData = offsetIndex(from, to, tableData);
        //Update react state
        setTableData(newtableData);
    };

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
                    <MaterialTable
                        icons={tableIcons}
                        columns={song_columns}
                        data={tableData}
                        title="Songs"
                        components={{
                            Row: (props) => (
                                <MTableBodyRow
                                    {...props}
                                    draggable="true"
                                    onDragStart={(e:any) => {
                                        console.log("onDragStart");
                                        DragState.row = props.data.tableData.id;
                                    }}
                                    onDragEnter={(e:any) => {
                                        e.preventDefault();
                                        if (props.data.tableData.id !== DragState.row) {
                                            DragState.dropIndex = props.data.tableData.id;
                                        }
                                    }}
                                    onDragEnd={(e:any) => {
                                        console.log(`onDragEnd`);
                                        if (DragState.dropIndex !== -1) {
                                            reOrderRow(DragState.row, DragState.dropIndex);
                                        }
                                        DragState.row = -1;
                                        DragState.dropIndex = -1;
                                    }}
                                />
                            ),
                        }} // components
                    />
                </div>
            </div>
        </div>
    );
}
export default Content;
