import { google } from "googleapis";
import drive_cred from "./../../drive_credentials.json";

const oauth2Client = new google.auth.OAuth2(
    (drive_cred as any).client_id,
    (drive_cred as any).client_secret,
    (drive_cred as any).redirect_uri
);


const oauth_callback = async (req: any, res: any) => {
    // http://localhost:8080/api/driveapi/auth?code=4/0AY0e-g7vvtHrOdyXANGUir12PVJAhJzg2nt_msdq5naXCWCMuTRcER9UKlkz0EmkzVIVDA&scope=https://www.googleapis.com/auth/drive.file
    let auth_code: string = req.query.code;
    const {tokens} = await oauth2Client.getToken(auth_code);
    console.log(tokens);
    req.session.token = JSON.stringify(tokens);
    res.redirect("http://localhost/");
};

export default oauth_callback;
