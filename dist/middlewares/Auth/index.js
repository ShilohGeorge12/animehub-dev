"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const index_js_1 = require("../../types/index.js");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_2 = require("../../env/index.js");
const index_js_3 = require("../../model/user/index.js");
// export const Auth: AuthType = (req, res, next) => {
// 	const sercret = `${process.env.SECRET}`;
// 	const cookies: string = req.cookies['key'];
// 	if (cookies) {
// 		Jwt.verify(cookies, sercret);
// 		next();
// 	} else {
// 		res.status(401).json({ error: 'You Are Not Allowed!' });
// 	}
// };
const Auth = async (req, res, next) => {
    const sercret = index_js_2.env.SECRET;
    const cookies = req.cookies['key'];
    console.log(cookies);
    try {
        if (cookies) {
            const token = jsonwebtoken_1.default.verify(cookies, sercret);
            if (!(0, index_js_1.isJWTPayload)(token)) {
                res.status(401).json({ error: 'You Are Not Allowed! 1' });
                return;
            }
            const email = token.token;
            const user = await index_js_3.UserModel.findOne({ email }).select('email authkey');
            if (!user) {
                return;
            }
            const storedToken = jsonwebtoken_1.default.verify(user.authkey, sercret);
            if (!(0, index_js_1.isJWTPayload)(storedToken)) {
                res.status(401).json({ error: 'You Are Not Allowed! 1.5' });
                return;
            }
            const expirationTime = storedToken.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            if (expirationTime < currentTime) {
                res.status(401).json({ error: 'You Are Not Allowed! 2' });
                return;
            }
            next();
        }
        else {
            res.status(401).json({ error: 'You Are Not Allowed! 3' });
        }
    }
    catch (error) {
        if (!(0, index_js_1.isError)(error))
            return;
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ authStatus: error.message, user: {} });
            return;
        }
        res.status(500).json({ error: `${error.message}` });
    }
};
exports.Auth = Auth;
