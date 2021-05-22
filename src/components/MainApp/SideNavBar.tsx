import "./SideNavBar.css";
function SideNavBar(props: any): JSX.Element {
    return (
        <div
            className="sidebar-container"
            style={props.navBar ? { marginLeft: "250px" } : {}}
        >
            <nav id="mainapp-sidebar" className="">
                <div className="sidebar-header">
                    <h3>Pinkfredor</h3>
                </div>

                <ul className="list-unstyled components">
                    <li>
                        <div className="item-container">
                            <i>♥</i>
                            <span className="item-container-text fs-lg">
                                Browse
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="item-container">
                            <i>♥</i>
                            <span className="item-container-text fs-lg">
                                Recently Played
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="seperator"></div>
                    </li>
                    <li>
                        <p className="sidebar-subheader">Playlist</p>
                    </li>
                    <li>
                        <div className="item-container">
                            <span className="item-container-text">
                                Playlist A
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="item-container">
                            <span className="item-container-text">
                                Playlist B
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="item-container">
                            <span className="item-container-text">
                                Playlist C
                            </span>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default SideNavBar;
