// import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import "./Content.css";
function Content(props: any): JSX.Element {

    const [topBarSelection, setTopBar] = useState(0);

    return (
        <div className="container-fluid" style={{ color: "#ffffff"}}>
            <div className="row content-top-bar">
                {/* Only show when screen size is small */}
                <div className="d-sm-block d-md-none col-sm-2 col-12">
                    <div style={{ padding: "10px", cursor: "pointer" }} onClick={()=>props.setNavBar(!props.navBarState)}>
                        <FontAwesomeIcon icon="align-justify" />
                    </div>
                </div>
                <div className="col-sm-8 col-md-10 col-10">
                    <div className={topBarSelection === 1 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={()=> {setTopBar(1);}}>All Songs</div>
                    <div className={topBarSelection === 2 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={()=> {setTopBar(2);}}>Artist</div>
                    <div className={topBarSelection === 3 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={()=> {setTopBar(3);}}>Albums</div>
                    <div className={topBarSelection === 4 ? "content-top-bar-items-container selected" : "content-top-bar-items-container"} onClick={()=> {setTopBar(4);}}>Genres</div>
                </div>
                <div className="col-sm-2 col-2">
                    <div className="row justify-content-end">
                        <div style={{width: "auto"}}>User Account</div>
                    </div>
                </div>
            </div>
            Content Page goes here
        </div>
    );
}
export default Content;
