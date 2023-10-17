import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
	let response = NextResponse.next();
	const cookie = req.cookies.get('key');
	try {
		if (!cookie) return NextResponse.json({ error: 'you are not allowed!' }, { status: 401 });

		const secret = typeof process.env.SECRET === 'string' ? process.env.SECRET : 'null';
		jwt.verify(`${cookie}`, secret);
		console.log({ cookie });
		return response;
	} catch (error) {
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ authStatus: error.message, user: {} }, { status: 400 });
		}

		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}
		console.log(error);
	}

	return NextResponse.json({ error: 'sorry something went wrong!' }, { status: 500 });
}

export const config = {
	matcher: ['/api/animes/:path*', '/api/users/:path*', '/api/logout'],
};
