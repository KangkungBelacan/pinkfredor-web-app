import { google } from "googleapis";
import drive_cred from "./../../drive_credentials.json";

const oauth2Client = new google.auth.OAuth2(
    (drive_cred as any).client_id,
    (drive_cred as any).client_secret,
    (drive_cred as any).redirect_uri
);

const oauth_callback = async (req: any, res: any) => {
    let auth_code: string = req.query.code;
    let userid: string = req.query.state;
    const {tokens} = await oauth2Client.getToken(auth_code);
    console.log(tokens);
    res.redirect("http://localhost:3000");
};

export default oauth_callback;
