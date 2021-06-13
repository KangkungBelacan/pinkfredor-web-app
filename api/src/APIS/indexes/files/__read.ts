import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_read: RequestSchema = {
    type: RequestType.GET,
    content: {
        filters: RequestBodyDataType.OPTIONAL
    }
};

const __read = async (req:any, res:any) => {
    if(!verify_request_body(req, res, __schema_read)) {
        return;
    }

    let doc = await db.collection("index-files").doc(req.app_user.id).get();
    if(!doc.exists) {
        // res.status(404);
        // res.json({message: "Not Found"});
        res.json({
            files: {}
        });
        return;
    }

    let doc_data = doc.data();

    if(req.params.fileid !== undefined) {
        if(doc_data.files[req.params.fileid] === undefined) {
            res.status(404);
            res.json({message: "File ID not found"});
            return;
        }

        res.json(doc_data.files[req.params.fileid]);
        return;
    }
    
    res.json(doc.data());
}

export default __read;