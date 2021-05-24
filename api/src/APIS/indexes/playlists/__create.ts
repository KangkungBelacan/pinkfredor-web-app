import * as IAPI from "../../../APIS/interface";
import {
    RequestBodyDataType,
    RequestSchema,
    RequestType,
} from "../../../util/interface/RequestSchema";
import { verify_request_body } from "../../../util/verify_request_body";
import { db } from "./../../../firebase";

const __schema_create: RequestSchema = {
    type: RequestType.POST,
    content: {
        playlists: [
            {
                playlist_name: RequestBodyDataType.STRING,
                playlist_tracks: RequestBodyDataType.OPTIONAL
            },
        ],
    },
};

const __create = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }

    let playlist = req.body.playlists;

    let playlist_idx: IAPI.indexes.playlists.PlaylistIndex = { playlists: {} };

    for (let i = 0; i < playlist.length; i++) {

        // Make sure every playlist have unique id
        let unique_id = `playlist-${Date.now()}-${req.app_user.id}-${i}`;
        playlist_idx.playlists[unique_id] = playlist[i];
        playlist_idx.playlists[unique_id].playlistid = unique_id;

        // Make sure evert playlist have playlist_tracks
        if(playlist_idx.playlists[unique_id].playlist_tracks === undefined) {
            playlist_idx.playlists[unique_id].playlist_tracks = [];
        }
    }

    let doc = db.collection("index-playlist").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        let keys = Object.keys(playlist_idx.playlists);
        for (let i = 0; i < keys.length; i++) {
            playlist_idx.playlists[keys[i]].date_added = Date.now();
            playlist_idx.playlists[keys[i]].date_modified = Date.now();
        }
        await doc.set(playlist_idx);
        res.json(playlist_idx);
        return;
    }

    let doc_data = doc_get.data();
    let keys = Object.keys(playlist_idx.playlists);
    for (let i = 0; i < keys.length; i++) {
        doc_data.playlists[keys[i]] = playlist_idx.playlists[keys[i]];
        doc_data.playlists[keys[i]].date_added = Date.now();
        doc_data.playlists[keys[i]].date_modified = Date.now();
    }

    await doc.set(doc_data);
    res.json(playlist_idx);
};

export default __create;
