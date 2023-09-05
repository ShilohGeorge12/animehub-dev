"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePatch = exports.validateAuth = exports.validateAnimes = exports.validateUpdateUser = exports.validateUsers = void 0;
const joi_1 = __importDefault(require("joi"));
function validateUsers(schema) {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(2).required(),
        role: joi_1.default.string().valid('BASIC', 'PREMIUM'),
        theme: joi_1.default.string().valid('light', 'dark'),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
exports.validateUsers = validateUsers;
function validateUpdateUser(schema) {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(2).max(25),
        email: joi_1.default.string().email().max(30),
        password: joi_1.default.string().min(2).max(24),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
exports.validateUpdateUser = validateUpdateUser;
function validateAnimes(schema) {
    const animeSchema = joi_1.default.object({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        episodes: joi_1.default.number().required(),
        year: joi_1.default.number().required(),
        airing: joi_1.default.boolean().required(),
        aired: joi_1.default.string().required(),
        duration: joi_1.default.string().required(),
        rating: joi_1.default.number().required(),
        season: joi_1.default.string().valid('summer', 'spring', 'winter').required(),
        status: joi_1.default.string().valid('FinishedAiring', 'onGoing').required(),
    });
    return animeSchema.validate(schema, { abortEarly: false });
}
exports.validateAnimes = validateAnimes;
function validateAuth(schema) {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(2).required(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().min(2).required(),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
exports.validateAuth = validateAuth;
function validatePatch(schema) {
    const userSchema = joi_1.default.object({
        theme: joi_1.default.string().valid('light', 'dark'),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
exports.validatePatch = validatePatch;
