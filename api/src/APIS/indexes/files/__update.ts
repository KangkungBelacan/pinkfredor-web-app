import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_update: RequestSchema = {
    type: RequestType.PUT,
    content: {
        filename: RequestBodyDataType.OPTIONAL,
        parents: RequestBodyDataType.OPTIONAL,
    },
};

const __update = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_update)) {
        return;
    }

    let doc;
    let doc_get;
    try {
        doc = await db.collection("index-files").doc(req.app_user.id);
        doc_get = await doc.get();
    } catch (err: any) {
        res.json({ status: false });
        return;
    }

    if (!doc_get.exists) {
        res.status(404);
        res.json({ message: "Not Found" });
        return;
    }

    let doc_data;
    try {
        doc_data = doc_get.data();
    } catch (err: any) {
        res.json({ status: false });
        return;
    }
    if (doc_data.files[req.params.fileid] === undefined) {
        res.status(404);
        res.json({ message: "Not Found" });
        return;
    }

    let update_data: any = {};
    update_data[`files.${req.params.fileid}`] = doc_data.files[req.params.fileid]
    if(req.body.filename !== undefined) {
        update_data[`files.${req.params.fileid}`].filename = req.body.filename;
    } 
    if(req.body.parents !== undefined) {
        update_data[`files.${req.params.fileid}`].parents = req.body.parents;
    } 

    update_data[`files.${req.params.fileid}`].date_modified = Date.now();

    try {
        await doc.update(update_data);
    } catch (err: any) {
        res.json({ status: false });
        return;
    }

    res.json(
        (await db.collection("index-files").doc(req.app_user.id).get()).data().files[req.params.fileid]
    );
};

export default __update;
