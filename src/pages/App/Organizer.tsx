import { GenericProps } from "../../interface/GenericProps";

const Organizer = (props: GenericProps) => {
    return <div className={props.className ? props.className : ""} style={props.style ? props.style : {}}>
        <div className="container-fluid">
            
        </div>
    </div>;
};

export default Organizer;
