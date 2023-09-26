"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const index_js_1 = __importDefault(require("../../middlewares/Image/index.js"));
const index_js_2 = require("../../middlewares/Error/index.js");
const index_js_3 = require("../../model/user/index.js");
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_js_4 = require("../../validator/index.js");
const helpers_js_1 = require("../../validator/helpers.js");
const index_js_5 = require("../../model/anime/index.js");
const index_js_6 = require("../../middlewares/Auth/index.js");
const index_js_7 = require("../../env/index.js");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/users', index_js_6.Auth, (0, index_js_2.tryCatch)(async (req, res) => {
    const users = await index_js_3.UserModel.find().sort('username').select('-__v -password').populate('animes', '-__v -password');
    res.json(users);
}));
exports.usersRouter.get('/users/:id', index_js_6.Auth, (0, index_js_2.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const user = await index_js_3.UserModel.findOne({ _id: id }).select('-__v -password').populate('animes', '-__v');
    if (!user) {
        res.status(404).json({ error: 'User Not Found!' });
        return;
    }
    res.json(user);
}));
exports.usersRouter.post('/users', index_js_6.Auth, index_js_1.default.single('image'), (0, index_js_2.tryCatch)(async (req, res) => {
    const { error, value } = (0, index_js_4.validateUsers)(req.body);
    if ((0, helpers_js_1.ifError)(error)) {
        res.status(400).json({ error: (0, helpers_js_1.ifError)(error) });
        return;
    }
    if (!req.file) {
        res.status(400).json({ error: "There's no Image, Please add an image" });
        return;
    }
    if (value) {
        const { username, email, password, role, theme } = value;
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const image = index_js_7.env.MODE === 'development' ? `http://localhost:5050/images/${req.file.filename}` : `http://animehub-api.onrender.com/images/${req.file.filename}`;
        const newUser = new index_js_3.UserModel({
            username,
            role,
            email,
            theme,
            password: hashedPassword,
            image,
            animes: [],
        });
        await newUser.save();
        res.status(201).json(newUser);
    }
}));
exports.usersRouter.get('/users/:id/:animeid', (0, index_js_2.tryCatch)(async (req, res) => {
    const _id = req.params.id;
    const animeid = req.params.animeid;
    const anime = await index_js_5.AnimeModel.findOne({ _id: animeid }).select('-_v');
    if (!anime) {
        res.status(404).json({ error: 'anime not found!' });
        return;
    }
    const user = await index_js_3.UserModel.findOne({ _id, animes: { $nin: [anime._id] } }).select('-__v -password');
    const BASIC_USER_ERROR = "You Can't have more than five animes at a time, upgrade to premium account to unlock this feature";
    if (!user) {
        const user = await index_js_3.UserModel.findOne({ _id }).select('-__v -password');
        if (!user)
            return;
        res.status(200).json(user);
        return;
    }
    if (user.role === 'BASIC') {
        if (user.animes.length >= 5) {
            res.status(400).json({ error: BASIC_USER_ERROR });
            return;
        }
        user.animes.push(anime._id);
        await user.save();
        res.status(200).json(user.animes);
        return;
    }
    user.animes.push(anime._id);
    await user.save();
    res.status(200).json(user.animes);
}));
exports.usersRouter.delete('/users/:id/:animeid', (0, index_js_2.tryCatch)(async (req, res) => {
    const _id = req.params.id;
    const animeid = req.params.animeid;
    const anime = await index_js_5.AnimeModel.findOne({ _id: animeid }).select('_id');
    const user = await index_js_3.UserModel.findOneAndUpdate({ _id }, { $pull: { animes: anime === null || anime === void 0 ? void 0 : anime._id } }, { new: true })
        .populate('animes', '-__v')
        .select('-__v -password');
    if (!anime) {
        res.status(404).json({ error: 'Anime Not found!' });
        return;
    }
    if (!user) {
        res.status(404).json({ error: 'User Not Found!' });
        return;
    }
    res.status(200).json(user);
}));
exports.usersRouter.patch('/users/:id/theme', index_js_6.Auth, index_js_1.default.single('image'), (0, index_js_2.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const { error, value } = (0, index_js_4.validatePatch)(req.body);
    const validationError = (0, helpers_js_1.ifError)(error);
    const user = await index_js_3.UserModel.findOne({ _id: id }).select('_id theme');
    if (validationError) {
        res.status(400).json({ error: validationError });
        return;
    }
    if (!user) {
        res.status(400).json({ error: 'User Not Found!' });
        return;
    }
    if (value) {
        user.theme = value.theme;
        await user.save();
        res.status(200).json(user);
    }
}));
exports.usersRouter.put('/users/:id', index_js_6.Auth, index_js_1.default.single('image'), (0, index_js_2.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const { error, value } = (0, index_js_4.validateUpdateUser)(req.body);
    const validationError = (0, helpers_js_1.ifError)(error);
    const user = await index_js_3.UserModel.findOne({ _id: id }).select('-__v');
    if (validationError) {
        res.status(400).json({ error: validationError });
        return;
    }
    if (!user) {
        res.status(400).json({ error: 'User Not Found!' });
        return;
    }
    if (value) {
        const { username, password, email } = value;
        const result = await bcrypt_1.default.compare(password, user.password);
        if (result) {
            user.password = password;
        }
        if (req.file) {
            user.image = req.file.filename;
        }
        user.username = username;
        user.email = email;
        await user.save();
        res.status(200).json(user);
    }
}));
