import { generateAccessToken } from "./../../util/auth";
import { LoginResponse } from "./../interface/auth/LoginResponse";
import { TokenPayload } from "./../interface/auth/TokenPayload";
import { db } from "./../../firebase";
const login = async (req: any, res: any) => {
    let response: LoginResponse = {
        status: false,
    };

    if (typeof req.body.username === "undefined") {
        response.message = "Invalid Parameter";
        res.json(response);
        return;
    }
    if (typeof req.body.password === "undefined") {
        response.message = "Invalid Parameter";
        res.json(response);
        return;
    }

    let querySnapshot;
    try {
        querySnapshot = await db
            .collection("app-users")
            .where("username", "==", req.body.username)
            .where("password", "==", req.body.password).get();
    } catch (error: any) {
        response.message = "DB Connection Lost";
        res.json(response);
        return;
    }

    if (querySnapshot.size === 0) {
        response.message = "Wrong username / password";
        res.json(response);
        return;
    }

    let data_id = querySnapshot.docs[0].id
    let queryData = querySnapshot.docs[0].data();

    let token:TokenPayload = {
        user_id: data_id,
        username: queryData.username
    };
    
    response.status = true;
    response.token = generateAccessToken(token);
    res.json(response);
};

export default login;
