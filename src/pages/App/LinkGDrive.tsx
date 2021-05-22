import { Redirect } from "react-router-dom";
import { axios, useAxiosPOST } from "./../../global-imports";

const LinkGDrive = () => {
    const { data, loading } = useAxiosPOST("/api/driveapi/authurl", {
        
    }, localStorage.token);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data == null || typeof (data as any).url === "undefined") {    
        return <Redirect to="/" />;
    }

    return (
        <div>
            <a href={(data as any).url} target="_blank" rel="noreferrer">
                <button>Click here to link GDrive</button>
            </a>
        </div>
    );
};

export default LinkGDrive;
