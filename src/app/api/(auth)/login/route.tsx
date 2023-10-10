import { MongoDB } from '@/db';
import { validateAuth } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt';
import { env } from '@/env';
import Jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { User } from '@/types';

export const POST = async (req: NextRequest) => {
	try {
		const { error, value } = validateAuth(req.body);
		let response = NextResponse.next();

		if (error) {
			console.log(error);
			const errArr: string[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr });
		}

		const { email, password, username } = value;
		const user = await MongoDB.getUserModel().findOne({ email }).select('-__v -authkey').populate('animes', '-__v');

		if (!user) {
			return NextResponse.json({ error: `User with email ${email} is not found!` }, { status: 404 });
		}

		const result = await bcrypt.compare(password, user.password);
		if (!result) {
			return NextResponse.json({ error: 'Password is In-Correct!' }, { status: 400 });
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
		return response.cookies.set('key', signedJwt, { httpOnly: true });
		// (details);

		// return NextResponse. json({});
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
