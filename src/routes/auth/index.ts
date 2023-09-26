import { Router } from 'express';
import { tryCatch } from '../../middlewares/Error/index.js';
import { UserModel } from '../../model/user/index.js';
import { validateAuth } from '../../validator/index.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import upload from '../../middlewares/Image/index.js';
import { User, isError, isJWTPayload } from '../../types/index.js';
import { Types } from 'mongoose';
import { env } from '../../env/index.js';
import { Auth } from '../../middlewares/Auth/index.js';

export const authRouter = Router();

authRouter.get(
	'/verify-auth',
	upload.single('image'),
	tryCatch(async (req, res) => {
		const sercret = env.SECRET;
		const cookies: string = req.cookies['key'];
		console.log(cookies);
		try {
			if (cookies) {
				const token = Jwt.verify(cookies, sercret);
				if (!isJWTPayload(token)) {
					res.status(401).json({ error: 'You Are Not Allowed! route 1' });
					return;
				}

				const email = token.token;
				console.log(email);
				const user = await UserModel.findOne({ email }).select('-__v -password -authkey').populate('animes', '-__v -password');
				if (!user) {
					res.status(404).json({ error: `you're not allowed! route 2` });
					return;
				}

				const storedToken = Jwt.verify(user.authkey, sercret);
				if (!isJWTPayload(storedToken)) {
					res.status(401).json({ error: 'You Are Not Allowed! route 3' });
					return;
				}

				const expirationTime = storedToken.exp;
				const currentTime = Math.floor(Date.now() / 1000);
				if (expirationTime < currentTime) {
					res.status(401).json({ authStatus: 'Auth Expired!', user: {} });
					return;
				}
				const details: Omit<User, 'password' | 'authkey'> & { _id: string | Types.ObjectId } = {
					_id: user._id,
					username: user.username,
					email,
					gender: user.gender,
					image: user.image,
					animes: user.animes,
					role: user.role,
					theme: user.theme,
					createdAt: user.createdAt,
				};

				res.cookie('key', user.authkey, { httpOnly: true }).status(200).json({ authStatus: 'Still Valid', user: details });
			}

			res.status(400).json({ error: 'You Are Not Allowed!' });
		} catch (error) {
			if (!isError(error)) return;

			if (error.name === 'TokenExpiredError') {
				res.status(401).json({ authStatus: error.message, user: {} });
				return;
			}

			res.status(500).json({ error: `${error.message}` });
		}
	})
);

// authRouter.post(
// 	'/login',
// 	upload.single('image'),
// 	tryCatch(async (req, res) => {
// 		const { error, value } = validateAuth(req.body);
// 		const authValidation = ifError(error);
// 		if (authValidation) {
// 			res.status(400).json({ error: authValidation });
// 			return;
// 		}

// 		if (!value) return;
// 		const { username, email, password } = value;
// 		const user = await UserModel.findOne({ username, email }).select('-__v').populate('animes', '-__v');

// 		if (!user) {
// 			res.status(404).json({ error: 'User Not Found!' });
// 			return;
// 		}
// 		const result = await bcrypt.compare(password, user.password);

// 		if (!result) {
// 			res.status(400).json({ error: 'password is Incorrect!' });
// 			return;
// 		}
// 		const sercret = `${process.env.SECRET}`;
// 		const signedJwt = Jwt.sign({ token: 'jwt token' }, sercret, { expiresIn: 18000 });
// 		const User: Omit<User, 'password' | 'authkey'> & { _id: string | Types.ObjectId } = {
// 			_id: user._id,
// 			username,
// 			email,
// 			gender: user.gender,
// 			image: user.image,
// 			animes: user.animes,
// 			role: user.role,
// 			theme: user.theme,
// 			createdAt: user.createdAt,
// 		};

// 		res
// 			.cookie('key', signedJwt, {
// 				httpOnly: true,
// 				// secure: true,
// 				// sameSite: 'none',
// 			})
// 			.status(200)
// 			.json(User);
// 	})
// );

authRouter.get(
	'password',
	tryCatch(async (req, res) => {
		const user = await UserModel.findOne({ email: 'guest@animehub.dev' }).select('-__v -password -authkey').populate('animes', '-__v -password');
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash('guest@animehub', salt);
		if (!user) {
			res.status(400).json({ error: `User is not found!` });
			return;
		}

		user.password = hashedPassword;
		user.save();
		res.json(user);
	})
);

authRouter.post(
	'/login',
	upload.single('image'),
	tryCatch(async (req, res) => {
		const { error, value } = validateAuth(req.body);

		if (error) {
			console.log(error);
			const errArr: string[] = [];
			error.details.map((err) => errArr.push(err.message));
			res.status(400).json({ error: errArr });
			return;
		}

		const { email, password, username } = value;
		const user = await UserModel.findOne({ email }).select('-__v -authkey').populate('animes', '-__v');

		if (!user) {
			res.status(400).json({ error: `User with email ${email} is not found!` });
			return;
		}

		const result = await bcrypt.compare(password, user.password);
		if (!result) {
			res.status(400).json({ error: 'Password is In-Correct!' });
			return;
		}

		const details: Omit<User, 'password' | 'authkey'> & { _id: string | Types.ObjectId } = {
			_id: user._id,
			username,
			email,
			gender: user.gender,
			image: user.image,
			animes: user.animes,
			role: user.role,
			theme: user.theme,
			createdAt: user.createdAt,
		};

		const sercret = env.SECRET;
		const signedJwt = Jwt.sign({ token: email }, sercret, { expiresIn: 800000 });
		user.authkey = signedJwt;
		await user.save();
		res.cookie('key', signedJwt, { httpOnly: true }).status(200).json(details);
	})
);

authRouter.post(
	'/logout',
	upload.single('image'),
	Auth,
	tryCatch(async (req, res) => {
		const { error, value } = validateAuth(req.body);

		if (error) {
			console.log(error);
			const errArr: string[] = [];
			error.details.map((err) => errArr.push(err.message));
			res.status(400).json({ error: errArr });
			return;
		}
		const { email } = value;
		const user = await UserModel.findOne({ email }).select('-__v');

		if (!user) {
			res.status(400).json({ error: `User with email ${email} is not found!` });
			return;
		}
		user.authkey = 'null';
		await user.save();

		res
			.clearCookie('key', {
				httpOnly: true,
			})
			.status(200)
			.json({ status: 'logout' });
	})
);
