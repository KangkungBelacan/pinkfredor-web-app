import { useState } from "react";
import Sound, { ReactSoundProps } from "react-sound";

const TestPage = () => {
    const [removePls, rp] = useState<ReactSoundProps["playStatus"]>("PAUSED");
    // const {data, loading} = useAxiosPOST(
    //     "/api/driveapi/files/download",
    //     { fileid: "1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu" },
    //     localStorage.token,
    //     "blob"
    // );
    // useEffect(() => {
    //     const run = async () => {
    //         let res = await axios.post(
    //             "/api/driveapi/files/download",
    //             { fileid: "1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu" },
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.token}`,
    //                 },
    //             }
    //         );
    //         let bc = atob(res.data.b64);
    //         let bn = new Array(bc.length);
    //         for (let i = 0; i < bc.length; i++) {
    //             bn[i] = bc.charCodeAt(i);
    //         }
    //         let bytes = new Uint8Array(bn);
    //         let blob = new Blob([bytes], { type: "audio/mpeg" });
    //         let url = window.URL.createObjectURL(blob);
    //         console.log(url);
    //         setData(url);
    //         setLoading(false);
    //     };
    //     run();
    // });

    // if (!loading) {
    return (
        <div>
            <div>Ready to play?</div>
            <Sound
                url="http://localhost:8080/api/driveapi/files/download_v2?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMzA2OTA4NDU1NjE3MDgxOTc5NiIsImlhdCI6MTYyMTcwMDYzMiwiZXhwIjoxNjIxNzg3MDMyfQ.7AfPA0kQ_u_bWVTI4ZmdxVtWOgcAu128BRbba2NSH2U&fileid=1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu"
                playStatus={removePls}
                autoLoad={true}
                onFinishedPlaying={() => {}}
                onError={() => {}}
            />
            <button
                onClick={() => {
                    rp("PLAYING");
                }}
            >
                Play
            </button>
        </div>
    );
    // } else {
    //     return <div>Downloading...</div>;
    // }
};
export default TestPage;
