import { useEffect, useState } from "react";

const axios = require("axios").default;

const useAxiosPOST = (
    url: string,
    params: object,
    token: string = "",
    responseType: string = ""
) => {
    const [data, setData] = useState(null);
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

            let res = await axios.post(url, params, config);
            setLoading(false);
            setData(res.data);
        };
        if (loading) {
            run();
        }
    });
    return { data, loading };
};

export { axios, useAxiosPOST };
