import { Link, useLocation } from "react-router-dom";
import "./SideNavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Profile from "./../../images/pfp.png";

function SideNavBar(props: any): JSX.Element {
    const current_path = useLocation().pathname;
    return (
        <div
            className="sidebar-container"
            style={{
                // marginLeft: props.navBar && props.isMobile ? "250px" : "",
                position: "fixed",
                height: "calc(100vh - 100px)",
                // height: "85vh",
                zIndex: props.isMobile ? 1000 : 1,
            }}
        >
            <nav
                id="mainapp-sidebar"
                className=""
                style={{
                    overflowY: "auto",
                    marginLeft: props.navBar && props.isMobile ? "0px" : "",
                }}
            >
                <div className="sidebar-header">
                    <div className="row">
                        <div className="col-md-12 col-8">
                            <div className="flex">
                                <div>
                                    <h3 style={{ textAlign: "center" }}>
                                        Pinkfredor
                                    </h3>
                                    <br />
                                    <img
                                        src={Profile}
                                        alt="Avatar"
                                        className="center"
                                        style={{ borderRadius: "50%" }}
                                    ></img>
                                    <h3
                                        style={{
                                            fontSize: "20px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Looz
                                    </h3>
                                </div>
                            </div>
                            <nav className="flex">
                                <Link
                                    to="/app/user"
                                    className="Nav-Items-Container"
                                    style={{ margin: "10px" }}
                                >Settings</Link>
                                <div
                                    className="Nav-Items-Container"
                                    style={{ margin: "10px" }}
                                >
                                    Log Out
                                </div>
                            </nav>
                        </div>
                        <div
                            className="col-4 d-md-none d-block"
                            style={{ textAlign: "right", cursor: "pointer" }}
                            onClick={() => {
                                props.setNavBarDisplay(false);
                            }}
                        >
                            <FontAwesomeIcon icon="times" />
                        </div>
                    </div>
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
                            to="/app/browse"
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <div
                                className={
                                    current_path.startsWith("/app/browse")
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
