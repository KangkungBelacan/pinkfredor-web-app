import { GenericProps } from "../../interface/GenericProps";
import "./Organizer.css";
import CategoriesTopBar from "../../components/MainApp/CategoriesTopBar";
import { CategoriesTopBarItemProps } from "../../interface/components/MainApp/CategoriesTopBarItemProps";
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
                <div className="row">
                    <div className="container-fluid">
                        <CategoriesTopBar items={items} />
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12">Content goes here</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Organizer;
