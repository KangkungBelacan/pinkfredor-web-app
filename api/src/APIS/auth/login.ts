import { generateAccessToken } from "../../util/auth";
import { LoginResponse } from "../interface/auth/LoginResponse";
import { AppUser } from "../interface/firebase/AppUser";
import { db } from "../../firebase";
import { env } from "../../env";
import { OAuth2Client } from "google-auth-library";
import { RequestSchema, RequestType, RequestBodyDataType } from "../../util/interface/RequestSchema";
import { verify_request_body } from "../../util/verify_request_body";

const __schema_login:RequestSchema = {
    type: RequestType.POST,
    content: {
        "tokenId": RequestBodyDataType.STRING
    }
}

const login = async (req: any, res: any) => {
    let response: LoginResponse = {
        status: false,
    };
    if(!verify_request_body(req, res, __schema_login)) {
        return;
    }

    // Verify Google ID Token
    let userid;
    try {
        const client = new OAuth2Client(env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        userid = payload["sub"];
    } catch (error: any) {
        response.message = "Invalid ID Token";
        res.json(response);
        return;
    }

    // If the token is valid, checks whether if DB have this user_id
    let doc = db.collection("app-users").doc(userid);
    let doc_data = await doc.get();
    let user: AppUser;
    if (!doc_data.exists) {
        // User do not exists, create
        user = {
            id: userid,
            username: "User ##",
        };
        doc.set(user);
    } else {
        let doc_actual_data = doc_data.data();
        user = {
            id: doc_actual_data.id,
            username: doc_actual_data.username,
        };
    }

    response.status = true;
    response.token = generateAccessToken(user);
    res.json(response);
};

export default login;
