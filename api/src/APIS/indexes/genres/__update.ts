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
        genre_name: RequestBodyDataType.OPTIONAL,
    },
};

const __update = async (req: any, res: any) => {
    if (!verify_request_body(req, res, __schema_update)) {
        return;
    }

    let doc = db.collection("index-genres").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ message: "No data to update, please use POST instead" });
        return;
    }

    let doc_data = doc_get.data();

    if (doc_data.genres[req.params.genreid] === undefined) {
        res.status(404);
        res.json({ message: "There is no such genre ID" });
        return;
    }

    let update_data: any = {};
    update_data[`genres.${req.params.genreid}`] = {};
    let keys = Object.keys(doc_data.genres[req.params.genreid]);
    for (let i = 0; i < keys.length; i++) {
        update_data[`genres.${req.params.genreid}`][keys[i]] =
            doc_data.genres[req.params.genreid][keys[i]];
    }

    // If provided, update
    if (req.body.genre_name !== undefined) {
        update_data[`genres.${req.params.genreid}`].genre_name =
            req.body.genre_name;
    }
    
    update_data[`genres.${req.params.genreid}`].date_modified = Date.now();

    try {
        await doc.update(update_data);
    } catch (err: any) {
        console.error(err);
        res.status(500);
        res.json({ message: "Something went wrong" });
        return;
    }

    res.json(
        (await db.collection("index-genres").doc(req.app_user.id).get()).data()
            .genres[req.params.genreid]
    );
};

export default __update;
