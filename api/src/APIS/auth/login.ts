import { generateAccessToken } from "./../../util/auth";

const login = (req: any, res: any) => {
    let test: any = {
        gay: generateAccessToken("Looz"),
    };
    res.json(test);
};

export default login;
