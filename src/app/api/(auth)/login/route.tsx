import { MongoDB } from '@/db';
import { validateAuth } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { env } from '@/env';
import Jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { COOKIE_NAME, MAX_AGE, User } from '@/types';
import { serialize } from 'cookie';
import { verifyAuth } from '@/lib/verifyAuth';

export const POST = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as unknown;
		const { error, value } = validateAuth(body);

		if (error) {
			console.log(error);
			const errArr: string[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr });
		}
		const { password, username } = value;
		const cookie = req.cookies.get('key');

		if (cookie) {
			const user = await MongoDB.getUserModel().findOne({ username }).select('-__v').populate('animes', '-__v');

			if (!user) {
				return NextResponse.json({ error: `User with username ${username} was not found!` }, { status: 404 });
			}
			await verifyAuth(user.authkey);
			const result = await bcrypt.compare(password, user.password);
			if (!result) {
				return NextResponse.json({ error: 'Password is In-Correct!' }, { status: 400 });
			}

			const details: Omit<User, 'password' | 'authkey'> & { _id: Types.ObjectId } = {
				_id: user._id,
				username,
				email: user.email,
				gender: user.gender,
				image: user.image,
				animes: user.animes,
				role: user.role,
				theme: user.theme,
				createdAt: user.createdAt,
			};

			return NextResponse.json(details, { status: 200 });
		}

		const user = await MongoDB.getUserModel().findOne({ username }).select('-__v').populate('animes', '-__v');

		if (!user) {
			return NextResponse.json({ error: `User with username ${username} was not found!` }, { status: 404 });
		}

		const result = await bcrypt.compare(password, user.password);
		if (!result) {
			return NextResponse.json({ error: 'Password is In-Correct!' }, { status: 400 });
		}

		const details: Omit<User, 'password' | 'authkey'> & { _id: Types.ObjectId } = {
			_id: user._id,
			username,
			email: user.email,
			gender: user.gender,
			image: user.image,
			animes: user.animes,
			role: user.role,
			theme: user.theme,
			createdAt: user.createdAt,
		};

		const sercret = env.SECRET;
		const signedJwt = Jwt.sign({ token: user.email }, sercret, { expiresIn: MAX_AGE });
		user.authkey = signedJwt;
		await user.save();

		const serialized = serialize(COOKIE_NAME, signedJwt, {
			httpOnly: true,
			maxAge: MAX_AGE,
			path: '/',
		});

		return new Response(JSON.stringify(details), { status: 200, headers: { 'Set-Cookie': serialized } });
	} catch (error) {
		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
