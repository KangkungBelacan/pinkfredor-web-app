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
    let artistid = req.params.artistid;
    let doc = await db.collection("index-artist").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    let doc_data = doc_get.data();
    if (doc_data.artists[artistid] === undefined) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    delete doc_data.artists[artistid];

    await doc.set(doc_data);
    res.json({ status: true });
}

export default __delete;