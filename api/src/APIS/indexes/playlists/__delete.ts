import { RequestSchema, RequestType } from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_delete:RequestSchema = {
    type: RequestType.DELETE,
    content: {}
}

const __delete = async (req:any, res:any) => {
    if(!verify_request_body(req, res, __schema_delete)) {
        return;
    }
    let playlistid = req.params.playlistid;
    let doc = await db.collection("index-playlist").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    let doc_data = doc_get.data();
    if (doc_data.playlists[playlistid] === undefined) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    delete doc_data.playlists[playlistid];

    await doc.set(doc_data);
    res.json({ status: true });
}

export default __delete;