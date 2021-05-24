import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";
import * as IAPI from "./../../interface";

const __schema_create: RequestSchema = {
    type: RequestType.POST,
    content: {
        files: RequestBodyDataType.ANY,
    },
};

const __create = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }

    try {
        let doc = db.collection("index-files").doc(req.app_user.id);
        let doc_get = await doc.get();
        if (!doc_get.exists) {
            let keys = Object.keys(req.body.files);
            for (let i = 0; i < keys.length; i++) {
                req.body.files[keys[i]].date_added = Date.now();
                req.body.files[keys[i]].date_modified = Date.now();
                if(req.body.files[keys[i]].file_metadata === undefined) { 
                    req.body.files[keys[i]].file_metadata = {};
                }
            }
            await db
                .collection("index-files")
                .doc(req.app_user.id)
                .set(req.body);
            res.json(req.body);
            return;
        }

        let doc_data: IAPI.indexes.files.FileIndex =
            doc_get.data() as IAPI.indexes.files.FileIndex;

        let keys = Object.keys(req.body.files);
        for (let i = 0; i < keys.length; i++) {
            if (doc_data.files[keys[i]] === undefined) {
                res.status(400);
                res.json({
                    message: "Contains duplicate data, consider using PUT?",
                });
                return;
            }
            doc_data.files[keys[i]] = req.body.files[keys[i]];
            doc_data.files[keys[i]].date_added = Date.now();
            doc_data.files[keys[i]].date_modified = Date.now();

            if(doc_data.files[keys[i]].file_metadata === undefined) { 
                doc_data.files[keys[i]].file_metadata = {};
            }
        }

        await doc.set(doc_data);
    } catch (err: any) {
        res.json({ status: false });
    }
};

export default __create;
