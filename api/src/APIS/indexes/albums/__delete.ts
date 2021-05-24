import { RequestSchema, RequestType } from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_create:RequestSchema = {
    type: RequestType.DELETE,
    content: {}
}

const __delete = async (req:any, res:any) => {
    if(!verify_request_body(req, res, __schema_create)) {
        return;
    }
    let albumid = req.params.albumid;
    let doc = await db.collection("index-album").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    let doc_data = doc_get.data();
    if (doc_data.albums[albumid] === undefined) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    delete doc_data.albums[albumid];

    await doc.set(doc_data);
    res.json({ status: true });
}

export default __delete;