import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";

const __schema_create: RequestSchema = {
    type: RequestType.POST,
    content: {
        files: [{
            fileid: RequestBodyDataType.NUMBER,
            filename: RequestBodyDataType.STRING
        }]
    },
};

const create = (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }
    res.json({status: true});
};

export default create;
