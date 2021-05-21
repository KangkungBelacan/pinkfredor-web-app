import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";
const __schema_create: RequestSchema = {
    type: RequestType.POST,
    content: {
        files: [
            {
                id: RequestBodyDataType.STRING,
                filename: RequestBodyDataType.STRING,
                parents: RequestBodyDataType.OPTIONAL,
            },
        ],
    },
};

const create = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }

    try {
        await db.collection("index-files").doc(req.app_user.id).set(req.body);
        res.json({ status: true });
    } catch (err: any) {
        res.json({ status: false });
    }  
};

export default create;
