"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJWTPayload = exports.isError = void 0;
// Type Guards
const isError = (arg) => arg.stack !== undefined;
exports.isError = isError;
const isJWTPayload = (arg) => arg.exp !== undefined;
exports.isJWTPayload = isJWTPayload;
