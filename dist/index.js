"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_js_1 = require("./db/index.js");
const index_js_2 = require("./middlewares/Error/index.js");
const index_js_3 = require("./routes/animes/index.js");
const index_js_4 = require("./routes/users/index.js");
const index_js_5 = require("./routes/auth/index.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_js_6 = require("./env/index.js");
const path_1 = require("path");
const app = (0, express_1.default)();
const port = index_js_6.env.PORT;
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5051', 'https://animehub-dev.netlify.app'],
    credentials: true,
}));
app.use(express_1.default.static((0, path_1.join)(__dirname, '../dist/public')));
app.get('/', (req, res) => res.redirect('/api/'));
app.get('/api/', (req, res) => res.send('welcome to animehub-dev api'));
app.use('/api', index_js_5.authRouter);
app.use('/api', index_js_4.usersRouter);
app.use('/api', index_js_3.animeRouter);
app.use('*', index_js_2.Errorhandler);
(0, index_js_1.mongoDb)();
app.listen(port, () => console.log(`http://localhost:${port}/api`));
