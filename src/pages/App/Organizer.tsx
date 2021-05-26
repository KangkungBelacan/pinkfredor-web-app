import { GenericProps } from "../../interface/GenericProps";
import "./Organizer.css"
const Organizer = (props: GenericProps) => {
    return <div className={props.className ? props.className : ""} style={props.style ? props.style : {}}>
        <div className="container organizer-body">
            <div className="row">
                Hi
            </div>
            <div className="row">
                Hi
            </div>
        </div>
    </div>;
};

export default Organizer;
