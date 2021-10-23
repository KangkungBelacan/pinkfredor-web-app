import { db } from "./../../firebase";
const deauth = async (req: any, res: any) => {
    let userid = req.app_user.id;
    let doc = db.collection("drive-api-tokens").doc(userid);
    let doc_get = await doc.get();
    if (!doc_get.exists) {
        res.status(404);
        res.json({ msg: "No drive credentials to remove" });
        return;
    }
    try {
        await doc.delete();
    } catch (err: any) {
        console.error(err);
        res.status(500);
        return;
    }
    res.json({ status: true });
};

export default deauth;
