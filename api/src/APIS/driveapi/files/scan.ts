import { db } from "./../../../firebase";
import drive_cred from "./../../../drive_credentials.json";
import { google } from "googleapis";
import * as IAPI from "./../../interface";
const scan = async (req: any, res: any) => {
    // Check if drive is linked
    let doc = db.collection("drive-api-tokens").doc(req.app_user.id);
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

    // Get all folders
    // let folders:any = await new Promise((resolve) => {
    //     let drive = google.drive({ version: "v3", auth: oAuth2Client });
    //     let pt = null;
    //     let obj: any = {};
    //     drive.files.list(
    //         {
    //             q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
    //             fields: "nextPageToken, files(id, name, parents)",
    //             spaces: "drive",
    //             pageToken: pt,
    //         },
    //         function (err, res) {
    //             if (err) {
    //                 console.error(err);
    //                 resolve(false);
    //             } else {
    //                 //console.log(res);
    //                 res.data.files.forEach(function (file) {
    //                     //console.log("Found file: ", file.name, file.id);
    //                     obj[file.id] = {
    //                         id: file.id,
    //                         filename: file.name,
    //                         parents: file.parents,
    //                     };
    //                 });
    //                 if (typeof res.data.nextPageToken !== "undefined") {
    //                     // there is still next page, figure it out looz
    //                 }
    //                 resolve(obj);
    //             }
    //         }
    //     );
    // });

    await new Promise((resolve) => {
        let drive = google.drive({ version: "v3", auth: oAuth2Client });
        let pt = null;
        drive.files.list(
            {
                // q: "mimeType = 'audio/mpeg' and trashed = false",
                q: "trashed = false",
                fields: "nextPageToken, files(id, name, parents)",
                spaces: "drive",
                pageToken: pt,
            },
            function (err, res) {
                if (err) {
                    console.error(err);
                    resolve(true);
                } else {
                    //console.log(res);
                    for(let k = 0; k < res.data.files.length; k++) {
                        let file = res.data.files[k];
                        m_idx.files[file.id] = {
                            id: file.id,
                            filename: file.name,
                            parents: file.parents
                        };
                    }
                    resolve(true);
                }
            }
        );
    });

    res.json(m_idx);
};

export default scan;
