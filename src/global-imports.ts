import { useEffect, useState } from "react";

const axios = require("axios").default;

const useAxiosPOST = (url:string, params: object, token:string = "") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const run = async() => {
            let res = await axios.post(url, params, {
                headers: {
                    'Authorization': `Bearer ${token}`      
                }
            });
            setData(res.data);
            setLoading(false);
        };
        run();
    });
    return {data, loading};
};

export { axios, useAxiosPOST };
