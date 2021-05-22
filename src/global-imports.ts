import { useEffect, useState } from "react";

const axios = require("axios").default;

const useAxiosPOST = (url:string, params: object, token:string = "", responseType:string = "") => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const run = async() => {
            let config:any = {
                headers: {
                    'Authorization': `Bearer ${token}`      
                }
            };

            if(responseType !== "") {
                config.responseType = responseType;
            }
    
            let res = await axios.post(url, params, config);
            setData(res.data);
            setLoading(false);
        };
        run();
    });
    return {data, loading};
};

export { axios, useAxiosPOST };
