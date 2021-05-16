import { Redirect } from "react-router-dom";
import { useAxiosPOST } from "./../../global-imports";

const LinkGDrive = () => {
    const { data, loading } = useAxiosPOST("/api/driveapi/authurl", {
        token: localStorage.token,
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (data == null || typeof (data as any).url === "undefined") {    
        return <Redirect to="/" />;
    }

    return (
        <div>
            <a href={(data as any).url}>
                <button>Click here to link GDrive</button>
            </a>
        </div>
    );
};

export default LinkGDrive;
