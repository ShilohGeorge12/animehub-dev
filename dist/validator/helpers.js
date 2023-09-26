"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ifError = void 0;
const ifError = (error) => {
    if (!error)
        return;
    console.log(error);
    const errArr = [];
    error.details.map(err => errArr.push(err.message));
    return errArr;
};
exports.ifError = ifError;
