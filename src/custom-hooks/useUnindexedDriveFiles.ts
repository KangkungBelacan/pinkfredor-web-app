import useAxios from "axios-hooks";
import { useEffect, useState } from "react";

const useUnindexedDriveFiles = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(null);
    const [
        { data: scanData, loading: scanLoading, error: scanErr },
        scanRefetch,
    ] = useAxios(
        {
            url: "/api/driveapi/files/scan",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
            data: {
                folder_only: false,
            },
        },
        { useCache: false }
    );

    const [
        { data: indexData, loading: indexLoading, error: indexErr },
        indexRefetch,
    ] = useAxios(
        {
            url: "/api/indexes/files",
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
        },
        { useCache: false }
    );

    useEffect(() => {
        if(scanLoading || indexLoading) {
            return;
        }
        setData(scanData);
        setLoading(false);
    }, [scanLoading, indexLoading]);

    return [data, loading]
};

export default useUnindexedDriveFiles;
