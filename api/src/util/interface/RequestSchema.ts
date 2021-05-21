export enum RequestType {
    GET,
    POST, 
    PUT,
    DELETE
}

export enum RequestBodyDataType {
    INTEGER,
    DOUBLE,
    BOOLEAN,
    JSON,
    STRING
}

/**
 * Describe how is the request should look like
 */
export interface RequestSchema {
    type: RequestType,

    /**
     * Indicate if the request body MUST strictly match (Meaning if request includes additional field, its bad request)
     */
    strict: boolean,

    /**
     * Expected Content
     */
    content: {[key: string]: RequestBodyDataType}
}