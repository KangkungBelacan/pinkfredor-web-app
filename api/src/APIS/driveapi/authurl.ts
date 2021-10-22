import { google } from "googleapis";
import drive_cred from "./../../drive_credentials.json";
const oauth2Client = new google.auth.OAuth2(
    (drive_cred as any).client_id,
    (drive_cred as any).client_secret,
    (drive_cred as any).redirect_uri
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    "https://www.googleapis.com/auth/drive.appdata",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
];

const authurl = (req: any, res: any) => {
    let url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: "offline",

        // If you only need one scope you can pass it as a string
        scope: scopes,

        state: req.app_user.id
    });
    res.json({ url: url });
};

export default authurl;
