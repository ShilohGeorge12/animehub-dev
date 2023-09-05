"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeRouter = void 0;
const express_1 = require("express");
const index_js_1 = require("../../middlewares/Error/index.js");
const index_js_2 = require("../../model/anime/index.js");
const index_js_3 = __importDefault(require("../../middlewares/Image/index.js"));
const index_js_4 = require("../../validator/index.js");
const helpers_js_1 = require("../../validator/helpers.js");
const index_js_5 = require("../../middlewares/Auth/index.js");
exports.animeRouter = (0, express_1.Router)();
exports.animeRouter.get('/animes', index_js_5.Auth, (0, index_js_1.tryCatch)(async (req, res) => {
    const page = parseInt(`${req.query.page}`) || 0;
    const perPage = parseInt(`${req.query.perpage}`) || 8;
    const totalAnimes = (await index_js_2.AnimeModel.find()).length;
    const animes = await index_js_2.AnimeModel.find()
        .sort('title -__v')
        .skip(page * perPage)
        .limit(perPage)
        .select('-__v');
    console.log('animes(GET) ', page);
    res.json({ animes, totalAnimes, perPage, page });
}));
exports.animeRouter.get('/search', index_js_5.Auth, (0, index_js_1.tryCatch)(async (req, res) => {
    const { value } = req.query;
    if (typeof value != 'string')
        return;
    if (value == '' || value == ' ') {
        res.status(304).json({});
        return;
    }
    const anime = await index_js_2.AnimeModel.find({ title: { $regex: `^${value}`, $options: 'i' } })
        .sort('title')
        .select('-__v');
    if (!anime) {
        res.status(404).json({ error: 'Anime Not Found!' });
        return;
    }
    res.status(200).json({ results: anime, totalAnimes: anime.length });
}));
exports.animeRouter.get('/animes/:id', index_js_5.Auth, (0, index_js_1.tryCatch)(async (req, res) => {
    const { id } = req.params;
    const anime = await index_js_2.AnimeModel.findOne({ _id: id }).select('-__v');
    if (!anime) {
        res.status(404).json({ error: 'Anime Not Found!' });
        return;
    }
    res.status(200).json(anime);
}));
exports.animeRouter.post('/animes', index_js_5.Auth, index_js_3.default.single('image'), (0, index_js_1.tryCatch)(async (req, res) => {
    const { error, value } = (0, index_js_4.validateAnimes)(req.body);
    const isError = (0, helpers_js_1.ifError)(error);
    if (!req.file) {
        res.status(400).json({ error: "There's no Image, Please add an image" });
        return;
    }
    if (isError) {
        res.status(400).json({ error: isError });
        return;
    }
    if (typeof value === 'undefined')
        return;
    const { title, description, episodes, year, aired, airing, duration, rating, season, status } = value;
    const anime = new index_js_2.AnimeModel({
        title,
        description,
        episodes,
        year,
        aired,
        airing,
        duration,
        rating,
        season,
        status,
        image: req.file.filename,
    });
    await anime.save();
    res.status(201).json(anime);
}));
