import { Router } from 'express';
import { tryCatch } from '../../middlewares/Error/index.js';
import { AnimeModel } from '../../model/anime/index.js';
import fs from 'fs';
import upload from '../../middlewares/Image/index.js';
import { validateAnimes } from '../../validator/index.js';
import { ifError } from '../../validator/helpers.js';
import { Auth } from '../../middlewares/Auth/index.js';
export const animeRouter = Router();

animeRouter.get(
	'/animes',
	Auth,
	tryCatch(async (req, res) => {
		const page = parseInt(`${req.query.page}`) || 0;
		const perPage = parseInt(`${req.query.perpage}`) || 8;
		const totalAnimes = (await AnimeModel.find()).length;

		const animes = await AnimeModel.find()
			.sort('title -__v')
			.skip(page * perPage)
			.limit(perPage)
			.select('-__v');
		console.log('animes(GET) ', page);
		res.json({ animes, totalAnimes, perPage, page });
	})
);

animeRouter.get(
	'/search',
	Auth,
	tryCatch(async (req, res) => {
		const { value } = req.query;
		if (typeof value != 'string') return;
		if (value == '' || value == ' ') {
			res.status(304).json({});
			return;
		}
		const anime = await AnimeModel.find({ title: { $regex: `^${value}`, $options: 'i' } })
			.sort('title')
			.select('-__v');
		if (!anime) {
			res.status(404).json({ error: 'Anime Not Found!' });
			return;
		}
		res.status(200).json({ results: anime, totalAnimes: anime.length });
	})
);

animeRouter.get(
	'/animes/:id',
	Auth,
	tryCatch(async (req, res) => {
		const { id } = req.params;
		const anime = await AnimeModel.findOne({ _id: id }).select('-__v');

		if (!anime) {
			res.status(404).json({ error: 'Anime Not Found!' });
			return;
		}

		res.status(200).json(anime);
	})
);

animeRouter.post(
	'/animes',
	Auth,
	upload.single('image'),
	tryCatch(async (req, res) => {
		const { error, value } = validateAnimes(req.body);
		const isError = ifError(error);
		if (!req.file) {
			res.status(400).json({ error: "There's no Image, Please add an image" });
			return;
		}

		if (isError) {
			res.status(400).json({ error: isError });
			return;
		}
		if (typeof value === 'undefined') return;

		const { title, description, episodes, year, aired, airing, duration, rating, season, status } = value;
		const anime = new AnimeModel({
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
	})
);
