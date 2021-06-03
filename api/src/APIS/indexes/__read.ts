import { RequestSchema, RequestType } from "../../util/interface/RequestSchema";
import { verify_request_body } from "../../util/verify_request_body";
import { db } from "./../../firebase";

const __schema_read: RequestSchema = {
    type: RequestType.GET,
    content: {},
};

const __read = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_read)) {
        return;
    }

    let response:any = {
        albums: {},
        artists: {},
        files:{},
        genres:{},
        playlists:{}
    }

    // Initialise all collections and fetch user document
    let albumIndexDoc    = await db.collection("index-album").doc(req.app_user.id).get()
    let artistIndexDoc   = await db.collection("index-artist").doc(req.app_user.id).get()
    let filesIndexDoc    = await db.collection("index-files").doc(req.app_user.id).get()
    let genresIndexDoc   = await db.collection("index-genres").doc(req.app_user.id).get()
    let playlistIndexDoc = await db.collection("index-playlist").doc(req.app_user.id).get()

    if(albumIndexDoc.exists) response.albums = albumIndexDoc.data().albums;
    if(artistIndexDoc.exists) response.artists = artistIndexDoc.data().artists;
    if(filesIndexDoc.exists) response.files = filesIndexDoc.data().files;
    if(genresIndexDoc.exists) response.genres = genresIndexDoc.data().genres;
    if(playlistIndexDoc.exists) response.playlists = playlistIndexDoc.data().playlists;

    res.json(response);
};

export default __read;
