"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const index_js_1 = require("../../middlewares/Error/index.js");
const index_js_2 = require("../../model/user/index.js");
const index_js_3 = require("../../validator/index.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_js_4 = __importDefault(require("../../middlewares/Image/index.js"));
const index_js_5 = require("../../types/index.js");
const index_js_6 = require("../../env/index.js");
const index_js_7 = require("../../middlewares/Auth/index.js");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.get('/verify-auth', index_js_4.default.single('image'), (0, index_js_1.tryCatch)(async (req, res) => {
    const sercret = index_js_6.env.SECRET;
    const cookies = req.cookies['key'];
    console.log(cookies);
    try {
        if (cookies) {
            const token = jsonwebtoken_1.default.verify(cookies, sercret);
            if (!(0, index_js_5.isJWTPayload)(token)) {
                res.status(401).json({ error: 'You Are Not Allowed! route 1' });
                return;
            }
            const email = token.token;
            console.log(email);
            const user = await index_js_2.UserModel.findOne({ email }).select('-__v -password -authkey').populate('animes', '-__v -password');
            if (!user) {
                res.status(404).json({ error: `you're not allowed! route 2` });
                return;
            }
            const storedToken = jsonwebtoken_1.default.verify(user.authkey, sercret);
            if (!(0, index_js_5.isJWTPayload)(storedToken)) {
                res.status(401).json({ error: 'You Are Not Allowed! route 3' });
                return;
            }
            const expirationTime = storedToken.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            if (expirationTime < currentTime) {
                res.status(401).json({ authStatus: 'Auth Expired!', user: {} });
                return;
            }
            const details = {
                _id: user._id,
                username: user.username,
                email,
                gender: user.gender,
                image: user.image,
                animes: user.animes,
                role: user.role,
                theme: user.theme,
                createdAt: user.createdAt,
            };
            res.cookie('key', user.authkey, { httpOnly: true }).status(200).json({ authStatus: 'Still Valid', user: details });
        }
        res.status(400).json({ error: 'You Are Not Allowed!' });
    }
    catch (error) {
        if (!(0, index_js_5.isError)(error))
            return;
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ authStatus: error.message, user: {} });
            return;
        }
        res.status(500).json({ error: `${error.message}` });
    }
}));
// authRouter.post(
// 	'/login',
// 	upload.single('image'),
// 	tryCatch(async (req, res) => {
// 		const { error, value } = validateAuth(req.body);
// 		const authValidation = ifError(error);
// 		if (authValidation) {
// 			res.status(400).json({ error: authValidation });
// 			return;
// 		}
// 		if (!value) return;
// 		const { username, email, password } = value;
// 		const user = await UserModel.findOne({ username, email }).select('-__v').populate('animes', '-__v');
// 		if (!user) {
// 			res.status(404).json({ error: 'User Not Found!' });
// 			return;
// 		}
// 		const result = await bcrypt.compare(password, user.password);
// 		if (!result) {
// 			res.status(400).json({ error: 'password is Incorrect!' });
// 			return;
// 		}
// 		const sercret = `${process.env.SECRET}`;
// 		const signedJwt = Jwt.sign({ token: 'jwt token' }, sercret, { expiresIn: 18000 });
// 		const User: Omit<User, 'password' | 'authkey'> & { _id: string | Types.ObjectId } = {
// 			_id: user._id,
// 			username,
// 			email,
// 			gender: user.gender,
// 			image: user.image,
// 			animes: user.animes,
// 			role: user.role,
// 			theme: user.theme,
// 			createdAt: user.createdAt,
// 		};
// 		res
// 			.cookie('key', signedJwt, {
// 				httpOnly: true,
// 				// secure: true,
// 				// sameSite: 'none',
// 			})
// 			.status(200)
// 			.json(User);
// 	})
// );
exports.authRouter.get('password', (0, index_js_1.tryCatch)(async (req, res) => {
    const user = await index_js_2.UserModel.findOne({ email: 'guest@animehub.dev' }).select('-__v -password -authkey').populate('animes', '-__v -password');
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash('guest@animehub', salt);
    if (!user) {
        res.status(400).json({ error: `User is not found!` });
        return;
    }
    user.password = hashedPassword;
    user.save();
    res.json(user);
}));
exports.authRouter.post('/login', index_js_4.default.single('image'), (0, index_js_1.tryCatch)(async (req, res) => {
    const { error, value } = (0, index_js_3.validateAuth)(req.body);
    if (error) {
        console.log(error);
        const errArr = [];
        error.details.map((err) => errArr.push(err.message));
        res.status(400).json({ error: errArr });
        return;
    }
    const { email, password, username } = value;
    const user = await index_js_2.UserModel.findOne({ email }).select('-__v -authkey').populate('animes', '-__v');
    if (!user) {
        res.status(400).json({ error: `User with email ${email} is not found!` });
        return;
    }
    const result = await bcrypt_1.default.compare(password, user.password);
    if (!result) {
        res.status(400).json({ error: 'Password is In-Correct!' });
        return;
    }
    const details = {
        _id: user._id,
        username,
        email,
        gender: user.gender,
        image: user.image,
        animes: user.animes,
        role: user.role,
        theme: user.theme,
        createdAt: user.createdAt,
    };
    const sercret = index_js_6.env.SECRET;
    const signedJwt = jsonwebtoken_1.default.sign({ token: email }, sercret, { expiresIn: 800000 });
    user.authkey = signedJwt;
    await user.save();
    res.cookie('key', signedJwt, { httpOnly: true }).status(200).json(details);
}));
exports.authRouter.post('/logout', index_js_4.default.single('image'), index_js_7.Auth, (0, index_js_1.tryCatch)(async (req, res) => {
    const { error, value } = (0, index_js_3.validateAuth)(req.body);
    if (error) {
        console.log(error);
        const errArr = [];
        error.details.map((err) => errArr.push(err.message));
        res.status(400).json({ error: errArr });
        return;
    }
    const { email } = value;
    const user = await index_js_2.UserModel.findOne({ email }).select('-__v');
    if (!user) {
        res.status(400).json({ error: `User with email ${email} is not found!` });
        return;
    }
    user.authkey = 'null';
    await user.save();
    res
        .clearCookie('key', {
        httpOnly: true,
    })
        .status(200)
        .json({ status: 'logout' });
}));
