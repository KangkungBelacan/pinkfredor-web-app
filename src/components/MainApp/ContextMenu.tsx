import { useState } from "react";

//this desperately needs an interface

function ContextMenu(props:any) {

    // let menu = props.contextMenuItems.map()

    function renderMenu() {
        return (
            <div className="context-menu" style={{position:"absolute", top: props.y + "px", left: (props.x) + "px", backgroundColor:"red", zIndex:3}}>
                Yass
            </div>
        );
    }

    return (
        <div className="cmenu-root">
            {props.visible ? renderMenu() : null}
        </div>
    );
}
export default ContextMenu
