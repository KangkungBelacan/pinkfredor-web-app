import "./CustomTable.css"
import TableItem from "./TableItem";

const CustomTable = (props: any) => {
    let tableItems: any = [];
    for (let i = 0; i < props.indexFilesState.length; i++) {
        tableItems.push(<TableItem key={i} position={i + 1} songData={props.indexFilesState[i]}
                                   artistsDataState={props.artistsDataState} albumDataState={props.albumDataState}
                                   songItemOnClick={props.songItemOnClick}
                                   imageColor={'#' + (Math.random() * 0xFFFFFF << 0).toString(16)}
                                   nowPlayingURL={props.nowPlayingURL} indexFilesState={props.indexFilesState}/>)
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