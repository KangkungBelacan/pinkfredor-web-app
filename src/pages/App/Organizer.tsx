import { GenericProps } from "../../interface/GenericProps";
import "./Organizer.css";
import CategoriesTopBar from "../../components/MainApp/CategoriesTopBar";
import { CategoriesTopBarItemProps } from "../../interface/components/MainApp/CategoriesTopBarItemProps";
const Organizer = (props: GenericProps) => {
    let items: Array<CategoriesTopBarItemProps> = [
        {
            display_text: "Album",
            faIconClass: "broadcast-tower",
            link: "/app/organize/Album",
        },
        {
            display_text: "GDrive",
            faIconClass: ["fab", "google-drive"],
            link: "/app/organize/gdrive",
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
