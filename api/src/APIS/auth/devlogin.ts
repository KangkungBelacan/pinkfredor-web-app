import { AppUser } from "../interface/firebase/AppUser";
import { generateAccessToken } from "./../../util/auth";
const devlogin = (req: any, res: any) => {
    let user: AppUser = {
        id: req.body.id,
    };
    res.json({ token: generateAccessToken(user) });
};

export default devlogin;
