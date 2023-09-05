"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const index_js_1 = __importDefault(require("../Error/Custom/index.js"));
const storage = multer_1.default.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'dist/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (_, file, cb) => {
        const fileTypes = /webp/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(file.originalname.toLowerCase());
        if (mimeType && extName) {
            return cb(null, true);
        }
        else {
            return cb(new index_js_1.default('Only webp images are allowed!'));
        }
    },
    storage: storage,
});
exports.default = upload;
