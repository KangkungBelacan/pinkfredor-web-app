import { google } from "googleapis";
const oauth2Client = new google.auth.OAuth2(
    "44229445451-f5g42aefkck186jqdb73fojsedh3avsg.apps.googleusercontent.com",
    "TaeyxYyNY4f6IR7BnOLXgGAJ",
    "http://localhost:8080/api/driveapi/oauth_callback"
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
