import { google } from "googleapis";
import { db } from "./../../firebase";
import { env } from "./../../env";
import { rejects } from "assert";
const deauth = async (req: any, res: any) => {
    let userid = req.app_user.id;
    let doc = db.collection("drive-api-tokens").doc(userid);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ msg: "No drive credentials to remove" });
        return;
    }

    let oauth_cred = doc_get.data();
    let oAuth2Client = new google.auth.OAuth2(
        (env.DRIVE_CREDENTIAL as any).client_id,
        (env.DRIVE_CREDENTIAL as any).client_secret,
        (env.DRIVE_CREDENTIAL as any).redirect_uri
    );
    oAuth2Client.setCredentials(oauth_cred);

    try {
        await new Promise((resolve, reject) => {
            oAuth2Client.revokeCredentials(function (err, body) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(body)
            });
        });
        await doc.delete();
    } catch (err: any) {
        console.error(err);
        res.status(500);
        return;
    }
    res.json({ status: true });
};

export default deauth;
