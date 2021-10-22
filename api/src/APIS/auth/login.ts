import { generateAccessToken } from "../../util/auth";
import { LoginResponse } from "../interface/auth/LoginResponse";
import { AppUser } from "../interface/firebase/AppUser";
import { db } from "../../firebase";
import { env } from "../../env";
import { OAuth2Client } from "google-auth-library";
import {
    RequestSchema,
    RequestType,
    RequestBodyDataType,
} from "../../util/interface/RequestSchema";
import { verify_request_body } from "../../util/verify_request_body";

const __schema_login: RequestSchema = {
    type: RequestType.POST,
    content: {
        tokenId: RequestBodyDataType.STRING,
        name: RequestBodyDataType.OPTIONAL,
        email: RequestBodyDataType.OPTIONAL,
        imageUrl: RequestBodyDataType.OPTIONAL,
    },
};

const login = async (req: any, res: any) => {
    let response: LoginResponse = {
        status: false,
    };
    if (!verify_request_body(req, res, __schema_login)) {
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
    let user: AppUser;
    // if (!doc_data.exists) {
    //     // User do not exists, create
    //     user = {
    //         id: userid,
    //         name: req.body.name === undefined ? "" : req.body.name,
    //         email: req.body.email === undefined ? "" : req.body.email,
    //         imageUrl: req.body.imageUrl === undefined ? "" : req.body.imageUrl,
    //     };
    //     doc.set(user);
    // } else {
    //     let doc_actual_data = doc_data.data();
    //     user = {
    //         id: doc_actual_data.id,
    //         name: doc_actual_data.name,
    //         email: doc_actual_data.email,
    //         imageUrl: doc_actual_data.imageUrl,
    //     };
    // }
    // Always override user data with newly provided fields
    user = {
        id: userid,
        name: req.body.name === undefined ? "" : req.body.name,
        email: req.body.email === undefined ? "" : req.body.email,
        imageUrl: req.body.imageUrl === undefined ? "" : req.body.imageUrl,
    };
    doc.set(user);

    response.status = true;
    response.token = generateAccessToken(user);
    res.json(response);
};

export default login;
