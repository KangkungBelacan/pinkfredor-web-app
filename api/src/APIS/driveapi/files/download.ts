import { google } from "googleapis";
import * as jwt from "jsonwebtoken";
import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { db } from "../../../firebase";
import { verify_request_body } from "../../../util/verify_request_body";
import { env } from "../../../env";
const __schema_download: RequestSchema = {
    type: RequestType.GET,
    content: {
        fileid: RequestBodyDataType.STRING,
        token: RequestBodyDataType.STRING,
    },
};

const download = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_download)) {
        return;
    }

    // ============================
    // Manual token check Start
    // ============================
    const bearerToken = req.query.token;

    let user;
    try {
        user = jwt.verify(bearerToken, env.API_SECRET);
    } catch (err: any) {
        return res.status(403).json({ message: "Unauthorized User" });
    }
    let jwt_payload = user as any;
    if (Date.now() > jwt_payload.exp * 1000) {
        return res
            .status(401)
            .json({ message: "Token Expired", expired: true });
    }
    if (Date.now() < jwt_payload.iat * 1000) {
        return res.status(401).json({ message: "Invalid Token" });
    }
    req.app_user = user;
    // ============================
    // Manual Token Check end
    // ============================

    // Check if drive is linked
    let doc = db.collection("drive-api-tokens").doc(req.app_user.id);
    let doc_data = await doc.get();
    if (!doc_data.exists) {
        res.json({ message: "Google drive is not linked" });
        return;
    }

    // Get google drive credentials from firebase
    let file_id = req.query.fileid;
    let oAuth2Client = new google.auth.OAuth2(
        (env.DRIVE_CREDENTIAL as any).client_id,
        (env.DRIVE_CREDENTIAL as any).client_secret,
        (env.DRIVE_CREDENTIAL as any).redirect_uri
    );
    oAuth2Client.setCredentials(doc_data.data());
    let drive = google.drive({ version: "v3", auth: oAuth2Client });
    let test: any;

    // Get file size of the file
    let filesize = -1;
    // Read file metadata previously scanned
    doc = db.collection("index-files").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (doc_get.exists) {
        let idx: any = doc_get.data().files;
        let file_metadata = idx[file_id];
        if (file_metadata) {
            filesize = file_metadata.size;
        }
    }

    // Manually query for filesize if file_id was not found in index
    if (filesize === -1) {
        try {
            filesize = await new Promise((resolve, reject) => {
                drive.files.get(
                    {
                        fileId: `${file_id}`,
                        fields: "size",
                    },
                    function (err: any, res: any) {
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (res.data === undefined || res.data.size === undefined) {
                            reject("");
                        }
                        resolve(res.data.size);
                    }
                );
            });
        } catch (err: any) {
            console.error(err);
            res.status(404);
            res.json({ msg: "File not found" });
            return;
        }
    }

    // Read "range" from request header and response with correct bytes with status code (206)
    try {
        // If "range" is provided in header
        if (req.headers.range) {
            // Get the range numbers
            let range = req.headers.range;
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : filesize - 1;

            // Get the file within the provided byte range through google drive api
            test = await drive.files.get(
                {
                    fileId: file_id,
                    alt: "media",
                },
                {
                    responseType: "stream",
                    headers: {
                        Range: `bytes=${start}-${end}`,
                    },
                }
            );

            // Write response head
            res.writeHead(206, {
                "Content-Type": "audio/mpeg",
                "Content-Range": `bytes ${start}-${end}/${filesize}`,
                "Accept-Ranges": "bytes",
                "Content-Length": `${end - start + 1}`,
            });

            // Write drive filestream to user
            test.data.pipe(res);
        } else {
            // Serve the filestream normally
            test = await drive.files.get(
                {
                    fileId: file_id,
                    alt: "media",
                },
                {
                    responseType: "stream",
                }
            );
            res.writeHead(200, {
                "Content-Type": "audio/mpeg",
            });
            test.data.pipe(res);
        }
    } catch (err: any) {
        // Happens when user gives file_id that is not found
        res.status(404);
        res.json({ message: "File not found." });
        return;
    }
};

export default download;
