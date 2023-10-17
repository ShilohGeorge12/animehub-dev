import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { User, isJWTPayload } from '@/types';
import { MongoDB } from '@/db';
import { Types } from 'mongoose';

export const GET = async (req: NextRequest) => {
	let response = NextResponse.next();

	const cookie = req.cookies.get('key');

	try {
		if (!cookie) return NextResponse.json({ error: 'you are not allowed!' }, { status: 401 });

		const secret = typeof process.env.SECRET === 'string' ? process.env.SECRET : 'null';
		const token = jwt.verify(`${cookie}`, secret);

		if (!isJWTPayload(token)) {
			return NextResponse.json({ error: 'You Are Not Allowed! route 1' }, { status: 401 });
		}

		const email = token.token;

		const user = await MongoDB.getUserModel().findOne({ email }).select('-__v -password').populate('animes', '-__v');
		if (!user) {
			return NextResponse.json({ error: `you're not allowed! route 2` }, { status: 404 });
		}

		jwt.verify(user.authkey, secret);

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

		return new Response(JSON.stringify(details), { status: 200, headers: { 'Set-Cookie': user.authkey } });
	} catch (error) {
		console.log(error);
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ authStatus: error.message, user: {} }, { status: 400 });
		}

		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}

		if (error instanceof Error) {
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
