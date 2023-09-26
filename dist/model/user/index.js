"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: [true, 'Username can not be empty'],
    },
    email: {
        type: String,
        minlength: 18,
        maxlength: 40,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 20,
        required: [true, 'Password Can not be empty'],
    },
    gender: {
        type: String,
        required: [true, 'gender is required'],
        enum: ['male', 'female'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    animes: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'animes' }],
        default: [],
    },
    role: {
        type: String,
        enum: ['BASIC', 'PREMIUM'],
        default: 'BASIC',
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light',
    },
    authkey: {
        type: String,
        max: 300,
        default: 'null',
    },
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});
exports.UserModel = (0, mongoose_1.model)('User', UserSchema);
