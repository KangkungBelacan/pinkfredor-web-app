import "../../pages/UserAccount";
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome , faMobileAlt, faHandsHelping, faQuestionCircle} from '@fortawesome/free-solid-svg-icons'

const Sidebar = (props: any) => {
    const [SidebarWidth,setSidebarWidth] = useState("0px")

    return (
        <div>
            <div className="sidebar" style={{width:SidebarWidth}}>
                <a href="#0" className="Deactivate" onClick={() => setSidebarWidth("0px")}>×</a>
                <a href={props.link1}><FontAwesomeIcon icon={faHome}/> {props.line1}</a>
                <a href={props.link2}><FontAwesomeIcon icon={faMobileAlt}/> {props.line2}</a>
                <a href={props.link3}><FontAwesomeIcon icon={faHandsHelping}/> {props.line3}</a>
                <a href={props.link4}><FontAwesomeIcon icon={faQuestionCircle}/> {props.line4}</a>
            </div>
            <div>
                <button className="Activate" onClick={() => setSidebarWidth("250px")}>☰</button>  
            </div>
        </div>
    );
};

export default Sidebar;