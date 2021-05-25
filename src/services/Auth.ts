import { useEffect, useState } from "react";
import { axios } from "../global-imports";
const AuthService = () => {
    const [authed, setAuthed] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async() => {
            let config: any = {
                headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
            };

            try {
                await axios.post("/api/auth/check",{}, config);
                setAuthed(true);
            } catch (err: any) {
                console.log(err);
            }
            setLoading(false);
        };
        run();
    });

    return { authed, loading };
};

export { AuthService };
