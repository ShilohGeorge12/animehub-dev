"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = exports.Errorhandler = void 0;
const index_js_1 = __importDefault(require("./Custom/index.js"));
const errorResponse = { error: 'You are Not allowed!' };
function Errorhandler(err, req, res, next) {
    console.log('-> ', {
        name: err.name,
        msg: err.message,
        stack: err.stack,
    });
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json(errorResponse);
    }
    if (err.name === 'MongoServerError') {
        const message = err.message.split('{')[1].replace('}', '');
        return res.status(400).json({ error: `Duplicate${message}` });
    }
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json(errorResponse);
    }
    if (err instanceof index_js_1.default) {
        return res.status(400).json({ error: err.message });
    }
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
}
exports.Errorhandler = Errorhandler;
function tryCatch(Handler) {
    return async (req, res, next) => {
        try {
            await Handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
exports.tryCatch = tryCatch;
