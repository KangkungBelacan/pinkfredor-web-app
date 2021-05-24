import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_update: RequestSchema = {
    type: RequestType.PUT,
    content: {
        playlist_name: RequestBodyDataType.OPTIONAL,
        playlist_tracks: RequestBodyDataType.OPTIONAL
    },
};

const __update = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_update)) {
        return;
    }

    let doc = db.collection("index-playlist").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ message: "No data to update, please use POST instead" });
        return;
    }

    let doc_data = doc_get.data();

    if (doc_data.playlists[req.params.playlistid] === undefined) {
        res.status(404);
        res.json({ message: "There is no such playlist ID" });
        return;
    }

    let update_data: any = {};
    update_data[`playlists.${req.params.playlistid}`] = {};
    let keys = Object.keys(doc_data.playlists[req.params.playlistid]);
    for (let i = 0; i < keys.length; i++) {
        update_data[`playlists.${req.params.playlistid}`][keys[i]] =
            doc_data.playlists[req.params.playlistid][keys[i]];
    }

    // If provided, update
    if (req.body.playlist_name !== undefined) {
        update_data[`playlists.${req.params.playlistid}`].playlist_name =
            req.body.playlist_name;
    }
    if (req.body.playlist_tracks !== undefined) {
        update_data[`playlists.${req.params.playlistid}`].playlist_tracks =
            req.body.playlist_tracks;
    }
    
    update_data[`playlists.${req.params.playlistid}`].date_modified = Date.now();

    try {
        await doc.update(update_data);
    } catch (err: any) {
        console.error(err);
        res.status(500);
        res.json({ message: "Something went wrong" });
        return;
    }

    res.json(
        (await db.collection("index-playlist").doc(req.app_user.id).get()).data()
            .playlists[req.params.playlistid]
    );
};

export default __update;
