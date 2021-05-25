import { useEffect, useState } from "react";

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

export { axios, useAxiosPOST };
