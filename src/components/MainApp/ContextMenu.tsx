import { useState } from "react";

//this desperately needs an interface

function ContextMenu(props: any) {

    let menu = props.items.map((item: any) =>
        <div className="menu-option" style={{ display: "flex", borderColor:"rgba(217,217,217)", borderWidth:"1px", borderStyle:"solid"}} onClick={() => item.callback(item.uid)}>
            <div>
                {item.icon}
            </div>
            <div>
                <p style={{color:"black"}}>{item.label}</p>
            </div>
        </div>)

    function renderMenu() {
        return (
            <div className="context-menu" style={{ position: "absolute", top: (props.y+20) + "px", left: (props.x-70) + "px", backgroundColor:"white", zIndex: 3 }}>
                {menu}
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
