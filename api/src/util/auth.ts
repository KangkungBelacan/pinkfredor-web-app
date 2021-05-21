import * as jwt from "jsonwebtoken";
import { AppUser } from "./../APIS/interface/firebase/AppUser";
import { env } from "./../env";
import RequestStatus from "./interface/RequestStatus";

function generateAccessToken(obj: object) {
    return jwt.sign(obj, env.API_SECRET, { expiresIn: "30m" });
}

/**
 * Generic function to verify each incoming request
 * @param req Request received from express
 */
function verifyIncomingRequest(req: any, res: any): RequestStatus {
    let status: RequestStatus = { valid: false, expired: false };
    if (typeof req.body.token === "undefined") {
        status.message = "Unauthorized User";
        res.status(401);
        return status;
    }

    let user;
    try {
        user = jwt.verify(req.body.token, env.API_SECRET);
    } catch (err: any) {
        status.message = "Unauthorized User";
        return status;
    }

    let jwt_payload = user as any;

    if(Date.now() > jwt_payload.exp*1000) {
        status.expired = true;
        status.message = "Token Expired";
        return status;
    }
    if(Date.now() < jwt_payload.iat*1000) {
        status.message = "Invalid Token";
        return status;
    }

    let app_user: AppUser = {
        id: (user as any).id,
    };

    status.user = app_user;
    status.valid = true;
    return status;
}

export { generateAccessToken, verifyIncomingRequest };
