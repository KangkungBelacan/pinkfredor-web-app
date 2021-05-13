import { google } from "googleapis";

const oauth2Client = new google.auth.OAuth2(
    "44229445451-f5g42aefkck186jqdb73fojsedh3avsg.apps.googleusercontent.com",
    "TaeyxYyNY4f6IR7BnOLXgGAJ",
    "http://localhost:8080/api/driveapi/oauth_callback"
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    "https://www.googleapis.com/auth/drive.file"
];

const url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: "offline",

    // If you only need one scope you can pass it as a string
    scope: scopes,
});

const authurl = (req: any, res: any) => {
    res.json({ url: url });
};

export default authurl;
