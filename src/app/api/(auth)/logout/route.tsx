import { MongoDB } from '@/db';
import { validateAuthLogOut } from '@/db/schema';
import { NextResponse, NextRequest } from 'next/server';
import { COOKIE_NAME } from '@/types';
import { serialize } from 'cookie';

export const POST = async (req: NextRequest) => {
	try {
		const body = (await req.json()) as unknown;
		const { error, value } = validateAuthLogOut(body);

		if (error) {
			console.log(error);
			const errArr: string[] = [];
			error.details.map((err) => errArr.push(err.message));
			return NextResponse.json({ error: errArr }, { status: 400 });
		}
		const { email, username } = value;
		const user = await MongoDB.getUserModel().findOne({ email, username }).select('-__v');

		if (!user) {
			return NextResponse.json({ error: `User with email ${email} is not found!` }, { status: 400 });
		}
		user.authkey = 'null';
		await user.save();

		const serialized = serialize(COOKIE_NAME, 'authkey', {
			httpOnly: true,
			maxAge: -1,
			path: '/',
		});

		return new Response(JSON.stringify({ status: 'logout' }), { status: 200, headers: { 'Set-Cookie': serialized } });
	} catch (error) {
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ authStatus: error.message, user: {} }, { status: 400 });
		}

		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}

		console.log(error);
		if (error instanceof Error) {
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
