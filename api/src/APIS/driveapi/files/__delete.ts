import { db, FieldValue } from "./../../../firebase";

const __delete = async (req: any, res: any) => {
    let file_id = req.params.fileid;
    let doc = await db.collection("index-files").doc(req.app_user.id);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    let doc_data = doc_get.data();
    if (doc_data.files[file_id] === undefined) {
        res.status(404);
        res.json({ status: false });
        return;
    }

    delete doc_data.files[file_id];

    await doc.set(doc_data);
    res.json({ status: true });
};

export default __delete;
