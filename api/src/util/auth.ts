import * as jwt from "jsonwebtoken";
import { AppUser } from "./../APIS/interface/firebase/AppUser";
import { env } from "./../env";

function generateAccessToken(obj: object) {
    return jwt.sign(obj, env.API_SECRET, { expiresIn: "24h" });
}

function verifyRequestAuthorization(req: any, res: any, next: any) {
    if (!req.headers.authorization) {
        return res.status(403).json({ message: "Unauthorized User" });
    }

    const bearer = req.headers.authorization.split(" ");
    const bearerToken = bearer[1];

    let user;
    try {
        user = jwt.verify(bearerToken, env.API_SECRET);
    } catch (err: any) {
        return res.status(403).json({ message: "Unauthorized User" });
    }

    let jwt_payload = user as any;

    if (Date.now() > jwt_payload.exp * 1000) {
        return res
            .status(401)
            .json({ message: "Token Expired", expired: true });
    }
    if (Date.now() < jwt_payload.iat * 1000) {
        return res.status(401).json({ message: "Invalid Token" });
    }

    req.app_user = user;

    next();
}

export { generateAccessToken, verifyRequestAuthorization };
