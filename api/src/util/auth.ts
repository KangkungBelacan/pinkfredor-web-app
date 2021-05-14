import * as jwt from "jsonwebtoken";
import { env } from "./../env";

function generateAccessToken(obj: object) {
    return jwt.sign(obj, env.API_SECRET, { expiresIn: "30m" });
}

export { generateAccessToken };
