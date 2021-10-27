import {useState} from "react";
import {ReactSoundProps} from "react-sound";

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

    const url = `/api/driveapi/files/download?token=${localStorage.token}&fileid=1fFEGOusvSIFTA141ytEkwzrY_B1MkYAu`;

    // if (!loading) {
    return (
        <div>
            PEE
        </div>
    );
};
export default TestPage;
