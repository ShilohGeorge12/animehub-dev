"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.default = ImageError;
