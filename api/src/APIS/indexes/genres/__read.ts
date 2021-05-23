import { RequestSchema, RequestType } from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";

const __schema_create:RequestSchema = {
    type: RequestType.GET,
    content: {}
}

const __read = (req:any, res:any) => {
    if(!verify_request_body(req, res, __schema_create)) {
        return;
    }
    res.json({status: false});
}

export default __read;