import { db } from "./../../firebase";
import { RegisterResponse } from "./../interface/auth/RegisterResponse";
import { AppUser } from "./../interface/firebase/AppUser";
const register = async (req: any, res: any) => {
    // Response object
    let response: RegisterResponse = {
        status: false,
    };

    // Parameters validation
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

    // Check whether user exists
    let querySnapshot;
    try {
        querySnapshot = await db
            .collection("app-users")
            .where("username", "==", req.body.username)
            .get();
    } catch (error: any) {
        response.message = "Database connection lost";
        res.json(response);
        return;
    }

    if (querySnapshot.size !== 0) {
        response.message = "Username already exists";
        res.json(response);
        return;
    }

    // Create app user object and ready to add to database
    let user: AppUser = {
        username: req.body.username,
        password: req.body.password,
        created_time: Date.now(),
    };

    try {
        await db.collection("app-users").add(user);
    } catch (error: any) {
        response.message = "Fail to add user to database";
        res.json(response);
        return;
    }

    response.status = true;
    res.json(response);
};

export default register;
