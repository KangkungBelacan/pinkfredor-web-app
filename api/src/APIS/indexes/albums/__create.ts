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
        albums: [
            {
                album_name: RequestBodyDataType.STRING,
                album_art: RequestBodyDataType.OPTIONAL,
                year_released: RequestBodyDataType.OPTIONAL,
                artistid: RequestBodyDataType.OPTIONAL,
            },
        ],
    },
};

const __create = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_create)) {
        return;
    }

    let al = req.body.albums;

    let al_idx: IAPI.indexes.albums.AlbumIndex = { albums: {} };

    for (let i = 0; i < al.length; i++) {
        let unique_id = `album-${Date.now()}-${req.app_user.id}-${i}`;
        al_idx.albums[unique_id] = al[i];
        al_idx.albums[unique_id].albumid = unique_id;
    }

    let doc = db.collection("index-album").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        let keys = Object.keys(al_idx.albums);
        for (let i = 0; i < keys.length; i++) {
            al_idx.albums[keys[i]].date_added = Date.now();
            al_idx.albums[keys[i]].date_modified = Date.now();
        }

        await doc.set(al_idx);
        res.json(al_idx);
        return;
    }

    let doc_data = doc_get.data();
    let keys = Object.keys(al_idx.albums);
    for (let i = 0; i < keys.length; i++) {
        doc_data.albums[keys[i]] = al_idx.albums[keys[i]];
        doc_data.albums[keys[i]].date_added = Date.now();
        doc_data.albums[keys[i]].date_modified = Date.now();
    }

    await doc.set(doc_data);
    res.json(al_idx);
};

export default __create;
