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
        artist_name: RequestBodyDataType.OPTIONAL,
        artist_art: RequestBodyDataType.OPTIONAL,
    },
};

const __update = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_update)) {
        return;
    }

    let doc = db.collection("index-artist").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ message: "No data to update, please use POST instead" });
        return;
    }

    let doc_data = doc_get.data();

    if (doc_data.artists[req.params.artistid] === undefined) {
        res.status(404);
        res.json({ message: "There is no such artist ID" });
        return;
    }

    let update_data: any = {};
    update_data[`artists.${req.params.artistid}`] = {};
    let keys = Object.keys(doc_data.artists[req.params.artistid]);
    for (let i = 0; i < keys.length; i++) {
        update_data[`artists.${req.params.artistid}`][keys[i]] =
            doc_data.artists[req.params.artistid][keys[i]];
    }

    // If provided, update
    if (req.body.artist_name !== undefined)
        update_data[`artists.${req.params.artistid}`].artist_name =
            req.body.artist_name;
    if (req.body.artist_art !== undefined)
        update_data[`artists.${req.params.artistid}`].artist_art =
            req.body.artist_art;

    update_data[`artists.${req.params.artistid}`].date_modified = Date.now();

    try {
        await doc.update(update_data);
    } catch (err: any) {
        console.error(err);
        res.status(500);
        res.json({ message: "Something went wrong" });
        return;
    }

    res.json(
        (await db.collection("index-artist").doc(req.app_user.id).get()).data()
            .artists[req.params.artistid]
    );
};

export default __update;
