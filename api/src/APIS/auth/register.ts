import { db } from "./../../firebase";

const register = (req: any, res: any) => {
    console.log(req.body);
    res.end();
};

export default register;
