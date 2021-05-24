import { RequestSchema, RequestType } from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_read:RequestSchema = {
    type: RequestType.GET,
    content: {}
}

const __read = async (req:any, res:any) => {
    if(!verify_request_body(req, res, __schema_read)) {
        return;
    }

    let doc = db.collection("index-playlist").doc(req.app_user.id);
    let doc_get =await doc.get();
    if(!doc_get.exists) {
        res.status(404);
        res.json({message: "User not found"})
        return;
    }

    let doc_data = doc_get.data();

    if(req.params.playlistid !== undefined) {
        if(!doc_data.playlists[req.params.playlistid]) {
            res.status(404);
            res.json({message: "playlist ID not found"})
            return;
        }

        res.json(doc_data.playlists[req.params.playlistid]);
        return;
    }

    res.json(doc_data);
}

export default __read;