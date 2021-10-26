import useAxios from "axios-hooks";
import { useEffect, useState } from "react";

const useUnindexedDriveFiles = () => {
    const [loading, setLoading] = useState(true);
    const [filesData, setFilesData] = useState<any>(null);
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
        { data: folderData, loading: folderLoading, error: folderErr },
        folderRefetch,
    ] = useAxios(
        {
            url: "/api/driveapi/files/scan",
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            },
            data: {
                folder_only: true,
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
        if (scanLoading || indexLoading || folderLoading || !loading) {
            return;
        }
        if (indexErr?.response?.status === 404 || scanErr?.response?.status !== 200) {
            setLoading(false);
            return;
        }

        let files_data = JSON.parse(JSON.stringify(scanData));
        let keys = Object.keys(indexData.files);
        for (let i = 0; i < keys.length; i++) {
            delete files_data.files[keys[i]];
        }

        setFilesData(files_data);
        setLoading(false);
    }, [scanLoading, indexLoading, folderLoading]);

    return [filesData, folderData, loading];
};

export default useUnindexedDriveFiles;
