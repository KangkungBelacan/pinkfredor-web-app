import {
    RequestType,
    RequestSchema,
} from "./interface/RequestSchema";

const verify_request_body = (req: any, res: any, schema: RequestSchema) => {
    let body:any = {};
    switch(schema.type) {
        case RequestType.GET:
            body = req.query;
            break;
        case RequestType.POST:
            body = req.body;
            break;
        case RequestType.PUT:
            break;
        case RequestType.DELETE:
            break;
    }

    let keys = Object.keys(schema.content);

    if(schema.strict && res.body.length !== keys.length) {
        res.status(400);
        res.json({message: "Unwanted parameters received"});
        return false;
    }
    
    for(let i = 0; i < keys.length; i++) {
        if(typeof body[keys[i]] === "undefined") {
            res.status(400);
            res.json({message: `Invalid parameters`});
            return false;
        }
    }

    return true;
};

export { verify_request_body };
