import React from "react";
import useTraceUpdate from "../../../debug-hooks/useTraceUpdate";
import "./CustomTable.css";

const CustomTable = (props: any) => {
    return (
        <div className={"table-container"}>
            <div className={"table-body"}>
                <div className={"table-column-titles"}>
                    <div className={"table-column-title-all-songs"}>
                        All Songs
                    </div>
                    {/*<div className={"table-column-title-albums"}>Albums</div>*/}
                    <div className={"table-column-title-action"}>Actions</div>
                </div>
                <div className={"table-items"}>{props.children}</div>
            </div>
        </div>
    );
};

export default CustomTable;
