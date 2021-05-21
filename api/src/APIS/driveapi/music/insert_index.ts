import { verifyIncomingRequest } from "./../../../util/auth";
const insert_index = (req: any, res: any) => {
    let status = verifyIncomingRequest(req, res);
    if (!status.valid) {
        res.json({ message: status.message });
        return;
    }
};

export default insert_index;
