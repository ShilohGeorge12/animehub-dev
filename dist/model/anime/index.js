"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimeModel = void 0;
const mongoose_1 = require("mongoose");
const AnimeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    episodes: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    airing: {
        type: Boolean,
        required: true,
    },
    aired: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    season: {
        type: String,
        enum: ['summer', 'spring', 'winter'],
        required: true,
    },
    status: {
        type: String,
        enum: ['FinishedAiring', 'onGoing'],
        required: true,
    },
    image: {
        type: String,
        default: 'null',
        required: [true, 'Image is required'],
    },
});
exports.AnimeModel = (0, mongoose_1.model)('animes', AnimeSchema);
