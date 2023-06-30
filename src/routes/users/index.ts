import { Router } from 'express';
import fs from 'fs';
import upload from '../../middlewares/Image/index.js';
import { tryCatch } from '../../middlewares/Error/index.js';
import { UserModel } from '../../model/user/index.js';
import bcrypt from 'bcrypt';
import { validatePatch, validateUpdateUser, validateUsers } from '../../validator/index.js';
import { ifError } from '../../validator/helpers.js';
import { AnimeModel } from '../../model/anime/index.js';
import { Auth } from '../../middlewares/Auth/index.js';

export const usersRouter = Router();

usersRouter.get(
	'/users',
	Auth,
	tryCatch(async (req, res) => {
		const users = await UserModel.find().sort('username').select('-__v -password').populate('animes', '-__v -password');
		res.json(users);
	})
);

usersRouter.get(
	'/users/:id',
	Auth,
	tryCatch(async (req, res) => {
		const { id } = req.params;
		const user = await UserModel.findOne({ _id: id }).select('-__v -password').populate('animes', '-__v');

		if (!user) {
			res.status(404).json({ error: 'User Not Found!' });
			return;
		}

		res.json(user);
	})
);

usersRouter.post(
	'/users',
	Auth,
	upload.single('image'),
	tryCatch(async (req, res) => {
		const { error, value } = validateUsers(req.body);

		if (ifError(error)) {
			res.status(400).json({ error: ifError(error) });
			return;
		}

		if (!req.file) {
			res.status(400).json({ error: "There's no Image, Please add an image" });
			return;
		}

		if (value) {
			const { username, email, password, role, theme } = value;
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);

			const newUser = new UserModel({
				username,
				role,
				email,
				theme,
				password: hashedPassword,
				image: {
					data: fs.readFileSync('dist/uploads/' + req.file.filename),
					contentType: req.file.mimetype,
				},
				animes: [],
			});
			await newUser.save();

			res.status(201).json(newUser);
		}
	})
);

usersRouter.get(
	'/users/:id/:animeid',
	tryCatch(async (req, res) => {
		const _id = req.params.id;
		const animeid = req.params.animeid;
		const anime = await AnimeModel.findOne({ _id: animeid }).select('-_v');
		if (!anime) {
			res.status(404).json({ error: 'anime not found!' });
			return;
		}

		const user = await UserModel.findOne({ _id, animes: { $nin: [anime._id] } }).select('-__v -password');
		const BASIC_USER_ERROR = "You Can't have more than five animes at a time, upgrade to premium account to unlock this feature";

		if (!user) {
			const user = await UserModel.findOne({ _id }).select('-__v -password');
			if (!user) return;
			res.status(200).json(user);
			return;
		}

		if (user.role === 'BASIC') {
			if (user.animes.length >= 5) {
				res.status(400).json({ error: BASIC_USER_ERROR });
				return;
			}
			user.animes.push(anime._id);
			await user.save();
			res.status(200).json(user.animes);
			return;
		}

		user.animes.push(anime._id);
		await user.save();
		res.status(200).json(user.animes);
	})
);

usersRouter.delete(
	'/users/:id/:animeid',
	tryCatch(async (req, res) => {
		const _id = req.params.id;
		const animeid = req.params.animeid;
		const anime = await AnimeModel.findOne({ _id: animeid }).select('_id');
		const user = await UserModel.findOneAndUpdate({ _id }, { $pull: { animes: anime?._id } }, { new: true })
			.populate('animes', '-__v')
			.select('-__v -password');
		if (!anime) {
			res.status(404).json({ error: 'Anime Not found!' });
			return;
		}
		if (!user) {
			res.status(404).json({ error: 'User Not Found!' });
			return;
		}
		res.status(200).json(user);
	})
);

usersRouter.patch(
	'/users/:id/theme',
	Auth,
	upload.single('image'),
	tryCatch(async (req, res) => {
		const { id } = req.params;
		const { error, value } = validatePatch(req.body);
		const validationError = ifError(error);
		const user = await UserModel.findOne({ _id: id }).select('_id theme');
		if (validationError) {
			res.status(400).json({ error: validationError });
			return;
		}

		if (!user) {
			res.status(400).json({ error: 'User Not Found!' });
			return;
		}

		if (value) {
			user.theme = value.theme;
			await user.save();
			res.status(200).json(user);
		}
	})
);

usersRouter.put(
	'/users/:id',
	Auth,
	upload.single('image'),
	tryCatch(async (req, res) => {
		const { id } = req.params;
		const { error, value } = validateUpdateUser(req.body);
		const validationError = ifError(error);
		const user = await UserModel.findOne({ _id: id }).select('-__v');

		if (validationError) {
			res.status(400).json({ error: validationError });
			return;
		}

		if (!user) {
			res.status(400).json({ error: 'User Not Found!' });
			return;
		}

		if (value) {
			const { username, password, email } = value;
			const result = await bcrypt.compare(password, user.password);
			if (result) {
				user.password = password;
			}
			if (req.file) {
				user.image = {
					data: fs.readFileSync('dist/uploads/' + req.file.filename),
					contentType: req.file.mimetype,
				};
			}
			user.username = username;
			user.email = email;
			await user.save();
			res.status(200).json(user);
		}
	})
);
