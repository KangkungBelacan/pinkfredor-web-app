import {
    RequestType,
    RequestSchema,
    RequestBodyDataType,
} from "./interface/RequestSchema";

/**
 * Verify if the data contains given keys
 * @param keys_obj keys expected from data
 * @param data request data
 * @return {boolean}
 */
function verify_keys(keys_obj: { [key: string]: any }, data: any): boolean {
    let keys = Object.keys(keys_obj);
    for (let i = 0; i < keys.length; i++) {
        let type_string = typeof data[keys[i]];

        // If this variable expects optionally 
        if(keys_obj[keys[i]] === RequestBodyDataType.OPTIONAL) {
            continue;
        }

        // If this key doesnt exists
        if (type_string === "undefined") {
            return false;
        }

        // If this variable expects anything
        if(keys_obj[keys[i]] === RequestBodyDataType.ANY) {
            continue;
        }

        // If object is expected
        if (
            typeof keys_obj[keys[i]] === "object" &&
            !(keys_obj[keys[i]] instanceof Array)
        ) {
            // Make sure request data contains object
            if (type_string === "object" && !(data[keys[i]] instanceof Array)) {
                if (!verify_keys(keys_obj[keys[i]], data[keys[i]])) {
                    return false;
                }
            } else {
                return false;
            }
            continue;
        }

        // If Array is expected
        if (
            typeof keys_obj[keys[i]] === "object" &&
            keys_obj[keys[i]] instanceof Array
        ) {
            // Check the first value of the array in keys
            let array_type = keys_obj[keys[i]][0];

            // Make sure request data contains array
            if (type_string === "object" && data[keys[i]] instanceof Array) {

                // Check if it is an enum of RequestBodyDataType
                if (
                    Object.values(RequestBodyDataType).includes(array_type)
                ) {
                    for (let j = 0; j < data[keys[i]].length; j++) {

                        // Manually loop through all the data because the data are expected to be RequestBodyDataType
                        if(typeof data[keys[i]][j] !== array_type) {
                            return false;
                        }
                    }
                } else {
                    for (let j = 0; j < data[keys[i]].length; j++) {

                        // Loop through the array as if its any other items
                        if (!verify_keys(keys_obj[keys[i]][0], data[keys[i]][j])) {
                            return false;
                        }
                    }
                }
            } else {
                return false;
            }
            continue;
        }

        // If the type is wrong
        if (type_string !== keys_obj[keys[i]]) {
            return false;
        }
    }
    return true;
}

const verify_request_body = (req: any, res: any, schema: RequestSchema) => {
    let body: any = {};
    switch (schema.type) {
        case RequestType.GET:
        case RequestType.DELETE:
            body = req.query;
            break;
        case RequestType.POST:
        case RequestType.PUT:
            body = req.body;
            break;
    }

    if (!verify_keys(schema.content, body)) {
        res.status(400);
        res.json({ message: "Invalid Parameters" });
        return false;
    }

    return true;
};

export { verify_request_body };
