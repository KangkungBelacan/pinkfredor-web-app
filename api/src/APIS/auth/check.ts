import { generateAccessToken } from "../../util/auth";
function check(req:any, res:any) {
    delete req.app_user.iat;
    delete req.app_user.exp;
    res.json({new_token: generateAccessToken(req.app_user)});
}

export default check;