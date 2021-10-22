import { google } from "googleapis";
import drive_cred from "./../../drive_credentials.json";
import { db } from "./../../firebase";
const oauth2Client = new google.auth.OAuth2(
    (drive_cred as any).client_id,
    (drive_cred as any).client_secret,
    (drive_cred as any).redirect_uris[0]
);

const oauth_callback = async (req: any, res: any) => {
    let auth_code: string = req.query.code;
    let userid: string = req.query.state;
    try {
        const { tokens } = await oauth2Client.getToken(auth_code);
        let doc = db.collection("drive-api-tokens").doc(userid);
        let doc_get = await doc.get();

        // If user already had refresh token and refresh token is not provided
        if(doc_get.exists && tokens.refresh_token === undefined) {
            let doc_data = doc_get.data();
            let rt = doc_data.refresh_token;
            let new_token = tokens;
            new_token.refresh_token = rt;
            await doc.set(new_token);
        } else {
            await doc.set(tokens);
        }
        res.redirect("http://localhost:3000");
    } catch (err: any) {
        console.error(err)
        res.json({message: "Wtf are you doing"});
    }
};

export default oauth_callback;
