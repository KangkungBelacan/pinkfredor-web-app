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
        album_name: RequestBodyDataType.OPTIONAL,
        album_art: RequestBodyDataType.OPTIONAL,
        tracks: RequestBodyDataType.OPTIONAL,
        total_tracks: RequestBodyDataType.OPTIONAL,
        year_released: RequestBodyDataType.OPTIONAL,
        artistid: RequestBodyDataType.OPTIONAL,
    },
};

const __update = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_update)) {
        return;
    }

    let doc = db.collection("index-album").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ message: "No data to update, please use POST instead" });
        return;
    }

    let doc_data = doc_get.data();

    if (doc_data.albums[req.params.albumid] === undefined) {
        res.status(404);
        res.json({ message: "There is no such album ID" });
        return;
    }

    let update_data: any = {};
    update_data[`albums.${req.params.albumid}`] = {};
    let keys = Object.keys(doc_data.albums[req.params.albumid]);
    for (let i = 0; i < keys.length; i++) {
        update_data[`albums.${req.params.albumid}`][keys[i]] =
            doc_data.albums[req.params.albumid][keys[i]];
    }

    // If provided, update
    if (req.body.album_name !== undefined)
        update_data[`albums.${req.params.albumid}`].album_name =
            req.body.album_name;
    if (req.body.album_art !== undefined)
        update_data[`albums.${req.params.albumid}`].album_art =
            req.body.album_art;
    if (req.body.tracks !== undefined)
        update_data[`albums.${req.params.albumid}`].tracks = req.body.tracks;
    if (req.body.total_tracks !== undefined)
        update_data[`albums.${req.params.albumid}`].total_tracks =
            req.body.total_tracks;
    if (req.body.year_released !== undefined)
        update_data[`albums.${req.params.albumid}`].year_released =
            req.body.year_released;
    if (req.body.artistid !== undefined)
        update_data[`albums.${req.params.albumid}`].artistid =
            req.body.artistid;

    update_data[`albums.${req.params.albumid}`].date_modified = Date.now();

    try {
        await doc.update(update_data);
    } catch (err: any) {
        console.error(err);
        res.status(500);
        res.json({ message: "Something went wrong" });
        return;
    }

    res.json(
        (await db.collection("index-album").doc(req.app_user.id).get()).data()
            .albums[req.params.albumid]
    );
};

export default __update;
