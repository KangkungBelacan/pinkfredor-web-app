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
        genres: [
            {
                genre_name: RequestBodyDataType.STRING,
            },
        ],
    },
};

const __create = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }

    let genre = req.body.genres;

    let genre_idx: IAPI.indexes.genres.GenreIndex = { genres: {} };

    for (let i = 0; i < genre.length; i++) {
        let unique_id = `genre-${Date.now()}-${req.app_user.id}-${i}`;
        genre_idx.genres[unique_id] = genre[i];
        genre_idx.genres[unique_id].genreid = unique_id;
    }

    let doc = db.collection("index-genres").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        let keys = Object.keys(genre_idx.genres);
        for (let i = 0; i < keys.length; i++) {
            genre_idx.genres[keys[i]].date_added = Date.now();
            genre_idx.genres[keys[i]].date_modified = Date.now();
        }
        await doc.set(genre_idx);
        res.json(genre_idx);
        return;
    }

    let doc_data = doc_get.data();
    let keys = Object.keys(genre_idx.genres);
    for (let i = 0; i < keys.length; i++) {
        doc_data.genres[keys[i]] = genre_idx.genres[keys[i]];
        doc_data.genres[keys[i]].date_added = Date.now();
        doc_data.genres[keys[i]].date_modified = Date.now();
    }

    await doc.set(doc_data);
    res.json(genre_idx);
};

export default __create;
