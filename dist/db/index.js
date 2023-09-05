"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDb = exports.getUser = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = require("../types/index.js");
const index_js_2 = require("../env/index.js");
const getUser = async () => { };
exports.getUser = getUser;
const mongoDb = () => {
    try {
        mongoose_1.default.set('strictQuery', false);
        mongoose_1.default.connect(index_js_2.env.DATABASE_URL, {
            writeConcern: {
                w: 'majority',
            },
        });
    }
    catch (err) {
        (0, index_js_1.isError)(err) && console.error(err.message);
    }
};
exports.mongoDb = mongoDb;
