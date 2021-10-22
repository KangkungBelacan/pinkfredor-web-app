import { google } from "googleapis";
import { db } from "../../firebase";
import { env } from "../../env";
const user_credentials = async (req: any, res: any) => {
    let user_id = req.app_user.id;
    const drive_token = await db
        .collection("drive-api-tokens")
        .doc(user_id)
        .get();
    if (!drive_token.exists) {
        res.status(404);
        res.json({ msg: "No drive credentials found for log on user" });
        return;
    }
    // console.log(drive_token.data())
    const drive_token_data = drive_token.data();
    if (drive_token_data.expiry_date <= Date.now()) {
        res.status(401);
        res.json({ msg: "Drive credentials expired" });
        return;
    }

    let oAuth2Client = new google.auth.OAuth2(
        (env.DRIVE_CREDENTIAL as any).client_id,
        (env.DRIVE_CREDENTIAL as any).client_secret,
        (env.DRIVE_CREDENTIAL as any).redirect_uri
    );
    oAuth2Client.setCredentials(drive_token_data);
    let oauth2 = google.oauth2({
        auth: oAuth2Client,
        version: "v2",
    });
    try {
        let user_credentials = await new Promise((accept, reject) => {
            oauth2.userinfo.v2.me.get(function (err, res) {
                if (err) {
                    reject(err);
                }
                // console.log(res.data);
                accept(res.data);
            });
        });
        res.json(user_credentials);
    } catch (err: any) {
        res.status(500)
        res.json({msg: "Failed to get user credentials"})
    }
};

export default user_credentials;
