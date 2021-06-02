import { Redirect } from "react-router-dom";
import { useAxiosPOST } from "./../../global-imports";
import { forwardRef, useState } from "react";
import MaterialTable from "material-table";
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

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
import MoreVert from '@material-ui/icons/MoreVert';

import PlayArrow from '@material-ui/icons/PlayArrow'
import Queue from '@material-ui/icons/Queue';

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
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const song_columns = [
    { title: "File name", field: "filename" },
    { title: "File size", field: "size" },
    { title: "Parent directory", field: "parents" }
]

const LinkGDrive = () => {
    const axios = require('axios').default;
    const [gDriveData, setGDriveData] = useState<any[]>([])

    const { data, loading } = useAxiosPOST("/api/driveapi/authurl", {

    }, localStorage.token);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data == null || typeof (data as any).url === "undefined") {
        return <Redirect to="/" />;
    }

    function getGDriveFolders() {
        var data:any

        let postData = {
            "folder_only": true
        };

        let axiosConfig = {
            headers: {
                "accept": "*/*",
                "Authorization": "Bearer " + localStorage.token,
                "Content-Type": "application/json; charset=utf-8"
            }
        }

        axios.post('/api/driveapi/files/scan', postData, axiosConfig)
            .then((response: any) => {
                data = response.data.files
                console.log(response);
            })
            return data
        }

    function getGDriveData() {
        let postData = {
            "folder_only": false
        };

        let axiosConfig = {
            headers: {
                "accept": "*/*",
                "Authorization": "Bearer " + localStorage.token,
                "Content-Type": "application/json; charset=utf-8"
            }
        }

        axios.post('/api/driveapi/files/scan', postData, axiosConfig)
            .then((response: any) => {
                let data = response.data.files
                let newData = Object.keys(data)
                    .map(function(key) {
                        data[key].size = (data[key].size/1024/1024).toFixed(2) + " MB"
                        data[key].filename = (data[key].filename.split("."))[0]
                        // var parentsName = data[key].parents.map((parent:any)=> {
                                // return getGDriveFolders().data[parent].folder_name
                        // })
                        data[key] = {
                            ...data[key],
                            // parentsName: parentsName.join("/")
                        }
                        return data[key]
                    });
                setGDriveData(newData)
                console.log(response);
            })
        }

    return (
        <div>
            <a href={(data as any).url} target="_blank" rel="noreferrer">
                <button>Click here to link GDrive</button>
            </a>
            <button onClick={getGDriveData}>Click here to display GDrive data</button>
            <div className="songs-section" style={{ display: 'flex', flexDirection: 'column', }} >
                <MaterialTable
                    icons={tableIcons}
                    columns={song_columns}
                    data={gDriveData}
                    title="Songs"
                    actions={[
                        {
                            icon: MoreVert,
                            tooltip: 'More Options',
                            onClick: (event, rowData) => {
                                console.log(rowData)
                                window.alert("You clicked on " + (rowData as any).filename + " Action: " + event.currentTarget.id)
                            }
                        }
                    ]}
                    components={{
                        Action: props => (
                            <Dropdown as={ButtonGroup}>
                                <Button id="play" onClick={(event) => props.action.onClick(event, props.data)} variant="success">Play</Button>

                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                <Dropdown.Menu>
                                    <Dropdown.Item id="addToQ" onClick={(event) => props.action.onClick(event, props.data)}>Add to queue</Dropdown.Item>
                                    <Dropdown.Item id="playNext" onClick={(event) => props.action.onClick(event, props.data)}>Play next</Dropdown.Item>
                                    <Dropdown.Item id="addToPlaylist" onClick={(event) => props.action.onClick(event, props.data)}>Add to playlist</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ),
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
        </div>
    );
};

export default LinkGDrive;
