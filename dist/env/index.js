"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const envalid_1 = require("envalid");
exports.env = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    MODE: (0, envalid_1.str)({
        choices: ['development', 'production'],
        default: 'development',
    }),
    DATABASE_URL: (0, envalid_1.str)(),
    SECRET: (0, envalid_1.str)(),
});
