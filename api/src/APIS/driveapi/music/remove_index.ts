import { verifyIncomingRequest } from "./../../../util/auth";
const remove_index = (req: any, res: any) => {
    let status = verifyIncomingRequest(req, res);
    if (!status.valid) {
        res.json({ message: status.message });
        return;
    }
};

export default remove_index;
