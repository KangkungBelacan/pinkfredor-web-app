import { useLayoutEffect, useEffect, useState } from "react";

const axios = require("axios").default;

const useAxiosPOST = (
    url: string,
    params: object,
    token: string = "",
    responseType: string = ""
) => {
    const [data, setData] = useState(null);
    const [error, setErr] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const run = async () => {
            let config: any = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            if (responseType !== "") {
                config.responseType = responseType;
            }
            try {
                let res = await axios.post(url, params, config);
                setData(res.data);
            } catch (err: any) {
                setErr(err);
            }
            setLoading(false);
        };
        if (loading) {
            run();
        }
    });
    return { data, loading, error };
};

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
};

const b64ToBlobURL = (b64Data: string, contentType: string) => {
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });
    return URL.createObjectURL(blob);
};

export { axios, useAxiosPOST, useWindowSize };
