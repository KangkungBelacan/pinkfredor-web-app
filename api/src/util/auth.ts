import * as jwt from "jsonwebtoken";
import { env } from "./../env";

function generateAccessToken(username: string) {
    return jwt.sign({user: username}, env.API_SECRET, { expiresIn: "30m" });
}

export { generateAccessToken };
