import { GenericProps } from "../../interface/GenericProps";
import "./Organizer.css";
import CategoriesTopBar from "../../components/MainApp/CategoriesTopBar";
import { CategoriesTopBarItemProps } from "../../interface/components/MainApp/CategoriesTopBarItemProps";
import { Route } from "react-router";
import * as OrganizerSubPage from "./OrganizerSubPage";
const Organizer = (props: GenericProps) => {
    let items: Array<CategoriesTopBarItemProps> = [
        {
            display_text: "Tracks",
            faIconClass: "music",
            link: "/app/organize/Tracks",
        },
        {
            display_text: "Artists",
            faIconClass: "users",
            link: "/app/organize/Artists",
        },
        {
            display_text: "Genres",
            faIconClass: "guitar",
            link: "/app/organize/Genres",
        },
        {
            display_text: "Albums",
            faIconClass: "compact-disc",
            link: "/app/organize/Albums",
        },
    ];
    return (
        <div
            className={props.className ? props.className : ""}
            style={props.style ? props.style : {}}
        >
            <div className="container-fluid organizer-body">
                <CategoriesTopBar items={items} />
                <div className="row" style={{overflowY:"auto", height: "calc(100% - 64px)", paddingTop: "12px"}}>
                    <Route path="/app/organize" exact component={ () => <div>Select one of the category</div> }  />
                    <Route path="/app/organize/Tracks" component={OrganizerSubPage.OSB_Tracks} />
                    <Route path="/app/organize/Artists" component={OrganizerSubPage.artists} />
                    <Route path="/app/organize/Genres" component={OrganizerSubPage.genres} />
                    <Route path="/app/organize/Albums" component={OrganizerSubPage.albums} />
                </div>
            </div>
        </div>
    );
};

export default Organizer;
