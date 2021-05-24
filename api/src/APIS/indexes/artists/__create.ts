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
        artists: [
            {
                artist_name: RequestBodyDataType.STRING,
                artist_art: RequestBodyDataType.OPTIONAL,
            },
        ],
    },
};

const __create = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }

    let artist = req.body.artists;

    let artist_idx: IAPI.indexes.artists.ArtistIndex = { artists: {} };

    for (let i = 0; i < artist.length; i++) {
        let unique_id = `artist-${Date.now()}-${req.app_user.id}-${i}`;
        artist_idx.artists[unique_id] = artist[i];
        artist_idx.artists[unique_id].artistid = unique_id;
    }

    let doc = db.collection("index-artist").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        let keys = Object.keys(artist_idx.artists);
        for (let i = 0; i < keys.length; i++) {
            artist_idx.artists[keys[i]].date_added = Date.now();
            artist_idx.artists[keys[i]].date_modified = Date.now();
        }
        await doc.set(artist_idx);
        res.json(artist_idx);
        return;
    }

    let doc_data = doc_get.data();
    let keys = Object.keys(artist_idx.artists);
    for (let i = 0; i < keys.length; i++) {
        doc_data.artists[keys[i]] = artist_idx.artists[keys[i]];
        doc_data.artists[keys[i]].date_added = Date.now();
        doc_data.artists[keys[i]].date_modified = Date.now();
    }

    await doc.set(doc_data);
    res.json(artist_idx);
};

export default __create;
