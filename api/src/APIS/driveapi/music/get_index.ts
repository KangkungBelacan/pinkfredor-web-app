import { verifyIncomingRequest } from "./../../../util/auth";
const get_index = (req: any, res: any) => {
    let status = verifyIncomingRequest(req);
    if (!status.valid) {
        res.json({ message: status.message });
        return;
    }
};

export default get_index;
