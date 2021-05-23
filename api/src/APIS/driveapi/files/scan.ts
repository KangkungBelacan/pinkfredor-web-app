import { db } from "./../../../firebase";
import drive_cred from "./../../../drive_credentials.json";
import { google } from "googleapis";
import * as IAPI from "./../../interface";
import {verify_request_body} from "./../../../util/verify_request_body";
import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";

const __schema_scan:RequestSchema = {
    type: RequestType.POST,
    content: {
        folder_only: RequestBodyDataType.BOOLEAN
    }
}

const scan = async (req: any, res: any) => {
    if(!verify_request_body(req, res, __schema_scan)) {
        return;
    }

    let folder_only = req.body.folder_only;

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
    let m_idx: IAPI.indexes.music.MusicFilesIndex = { files: {} };

    let drive = google.drive({ version: "v3", auth: oAuth2Client });

    // Get all folder
    let folders: any = {};
    let folder_pt: any = null;
    do {
        /* eslint-disable */
        folder_pt = await new Promise((resolve) => {
            drive.files.list(
                {
                    // q: "mimeType = 'audio/mpeg' and trashed = false",
                    q: "mimeType = 'application/vnd.google-apps.folder' and trashed = false",
                    fields: "nextPageToken, files(id, name, parents)",
                    spaces: "drive",
                    pageToken: folder_pt,
                },
                function (err: any, res: any) {
                    if (err) {
                        console.error(err);
                        resolve(null);
                        return;
                    }
                    //console.log(res);
                    for (let k = 0; k < res.data.files.length; k++) {
                        let file = res.data.files[k];
                        folders[file.id] = {
                            id: file.id,
                            folder_name: file.name,
                            parents: file.parents,
                        };
                    }

                    resolve(res.data.nextPageToken);
                }
            );
        });
    } while (!!folder_pt);

    if(folder_only) {
        res.json(folders);
        return;
    }

    let pt: any = null;
    do {
        /* eslint-disable */
        pt = await new Promise((resolve) => {
            drive.files.list(
                {
                    q: "mimeType = 'audio/mpeg' and trashed = false",
                    // q: "trashed = false",
                    // q: "name = 'Week 1.5 VC.mkv'",
                    fields: "nextPageToken, files(id, name, parents, size)",
                    spaces: "drive",
                    pageToken: pt,
                },
                function (err: any, res: any) {
                    if (err) {
                        console.error(err);
                        resolve(null);
                        return;
                    }
                    //console.log(res);
                    for (let k = 0; k < res.data.files.length; k++) {
                        let file = res.data.files[k];
                        if (file.parents !== undefined) {
                            while (
                                folders[
                                    file.parents[file.parents.length - 1]
                                ] !== undefined &&
                                folders[file.parents[file.parents.length - 1]]
                                    .parents !== undefined &&
                                folders[
                                    folders[
                                        file.parents[file.parents.length - 1]
                                    ].parents[0]
                                ] !== undefined
                            ) {
                                file.parents.push(
                                    folders[
                                        file.parents[file.parents.length - 1]
                                    ].parents[0]
                                );
                            }
                        }

                        m_idx.files[file.id] = {
                            id: file.id,
                            filename: file.name,
                            parents: file.parents,
                            size: file.size
                        };
                    }

                    resolve(res.data.nextPageToken);
                }
            );
        });
    } while (!!pt);

    res.json(m_idx);
};

export default scan;
