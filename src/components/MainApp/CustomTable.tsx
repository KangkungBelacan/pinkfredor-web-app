import "./CustomTable.css"
import TableItem from "./TableItem";
import {useEffect} from "react";
const CustomTable = (props: any) => {
    let tableItems: any = [];
    for (let i=0; i < props.tableData.length; i++){
        tableItems.push(<TableItem key={i} position={i + 1} songData={props.tableData[i]} songItemOnClick={props.songItemOnClick}/>)
    }
    return (
        <div className={"table-container"}>
            <div className={"table-body"}>
                <div className={"table-column-titles"}>
                    <div className={"table-column-title-all-songs"}>All Songs</div>
                    {/*<div className={"table-column-title-albums"}>Albums</div>*/}
                    <div className={"table-column-title-action"}>Actions</div>
                </div>
                <div className={"table-items"}>
                    {tableItems}
                </div>
            </div>
        </div>
    );
};

export default CustomTable;