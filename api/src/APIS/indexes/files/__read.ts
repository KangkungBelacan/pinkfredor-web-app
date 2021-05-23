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
        res.status(404);
        res.json({message: "Not Found"});
        return;
    }
    
    res.json(doc.data());
}

export default __read;