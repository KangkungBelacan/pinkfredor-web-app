import { useEffect, useState } from "react";
import Sound, { ReactSoundProps } from "react-sound";
import { readBuilderProgram } from "typescript";
import { useAxiosPOST } from "./../../global-imports";

const axios = require("axios").default;

const TestPage = () => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    const [removePls, rp] = useState<ReactSoundProps['playStatus']>("PAUSED");
    useEffect(() => {
        const run = async () => {
            let res = await axios.post(
                "/api/driveapi/files/download",
                { fileid: "1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu" },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.token}`,
                    },
                }
            );
            let bc = atob(res.data.b64);
            let bn = new Array(bc.length);
            for (let i = 0; i < bc.length; i++) {
                bn[i] = bc.charCodeAt(i);
            }
            let bytes = new Uint8Array(bn);
            let blob = new Blob([bytes], {type: "audio/mpeg"});
            let url = window.URL.createObjectURL(blob);
            console.log(url);
            setData(url);
            setLoading(false);
        };
        run();
    });

    if (!loading) {
        return (
            <div>
                <div>Ready to play?</div>
                <Sound
                    url={data}
                    playStatus={removePls}
                    autoLoad={true}
                    onFinishedPlaying={() => {}}
                    onError={() => {}}
                />
                <button onClick={()=>{rp("PLAYING")}}>Play</button>
            </div>
        );
    } else {
        return <div>Downloading...</div>;
    }
};
export default TestPage;
