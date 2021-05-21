import { verifyIncomingRequest } from "./../../../util/auth";
import { db } from "./../../../firebase";
import drive_cred from "./../../../drive_credentials.json";
import { google } from "googleapis";
import * as IAPI from "./../../interface";
const scan = async (req: any, res: any) => {
    let status = verifyIncomingRequest(req, res);
    if (!status.valid) {
        res.json({ message: status.message });
        return;
    }

    // Check if drive is linked
    let doc = db.collection("drive-api-tokens").doc(status.user.id);
    let doc_data = await doc.get();
    if (!doc_data.exists) {
        res.json({ message: "Google drive is not linked" });
        return;
    }

    // Set drive credentials on google oauth2 client
    let user_drive_cred = doc_data.data();
    let oAuth2Client = new google.auth.OAuth2(
        (drive_cred as any).client_id,
        (drive_cred as any).client_secret,
        (drive_cred as any).redirect_uri
    );
    oAuth2Client.setCredentials(user_drive_cred);

    // Scan google drive for music files
    let m_idx: IAPI.driveapi.music.MusicFilesIndex = { files: {} };

    await new Promise((resolve) => {
        let drive = google.drive({ version: "v3", auth: oAuth2Client });
        let pt = null;
        drive.files.list(
            {
                q: "mimeType='audio/mpeg'",
                fields: "nextPageToken, files(id, name)",
                spaces: "drive",
                pageToken: pt,
            },
            function (err, res) {
                if (err) {
                    console.error(err);
                } else {
                    //console.log(res);
                    res.data.files.forEach(function (file) {
                        //console.log("Found file: ", file.name, file.id);
                        m_idx.files[file.id] = {
                            id: file.id,
                            filename: file.name,                            
                        };
                    });
                    if (typeof res.data.nextPageToken !== "undefined") {
                        // there is still next page, figure it out looz
                    }
                    resolve(true);
                }
            }
        );
    });

    res.json(m_idx);
};

export default scan;
