export enum RequestType {
    GET,
    POST, 
    PUT,
    DELETE
}

export enum RequestBodyDataType {
    STRING = "string",
    NUMBER = "number",
    BIGINT = "bigint",
    BOOLEAN = "boolean",
    SYMBOL = "symbol",
    UNDEFINED = "undefined",
    OBJECT = "object",
    FUNCTION = "function"
}

/**
 * Describe how is the request should look like
 */
export interface RequestSchema {
    type: RequestType,

    /**
     * Expected Content
     */
    content: {[key: string]: any}
}