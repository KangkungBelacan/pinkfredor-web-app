import { Link, useLocation } from "react-router-dom";
import "./SideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SideNavBar(props: any): JSX.Element {
    const current_path = useLocation().pathname;
    return (
        <div
            className="sidebar-container"
            style={{ marginLeft: props.navBar ? "250px" : "" }}
        >
            <nav
                id="mainapp-sidebar"
                className=""
                style={{ overflowY: "auto" }}
            >
                <div className="sidebar-header">
                    <h3>Pinkfredor</h3>
                </div>

                <ul className="list-unstyled components">
                    <li>
                        <Link
                            to="/app/test"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div
                                className={
                                    current_path.startsWith("/app/test")
                                        ? "item-container selected"
                                        : "item-container"
                                }
                            >
                                <FontAwesomeIcon icon="vial" />
                                <span className="item-container-text fs-lg">
                                    Test Page
                                </span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/app/linkdrive"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div
                                className={
                                    current_path.startsWith("/app/linkdrive")
                                        ? "item-container selected"
                                        : "item-container"
                                }
                            >
                                <FontAwesomeIcon
                                    icon={["fab", "google-drive"]}
                                />
                                <span className="item-container-text fs-lg">
                                    Link Google Drive
                                </span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/app"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div
                                className={
                                    current_path === "/app"
                                        ? "item-container selected"
                                        : "item-container"
                                }
                            >
                                <FontAwesomeIcon icon="list" />
                                <span className="item-container-text fs-lg">
                                    Browse
                                </span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/app/organize"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div
                                className={
                                    current_path.startsWith("/app/organize")
                                        ? "item-container selected"
                                        : "item-container"
                                }
                            >
                                <FontAwesomeIcon icon="columns" />
                                <span className="item-container-text fs-lg">
                                    Organize
                                </span>
                            </div>
                        </Link>
                    </li>
                    <li>
                        <div className="item-container">
                            <FontAwesomeIcon icon="broadcast-tower" />
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
