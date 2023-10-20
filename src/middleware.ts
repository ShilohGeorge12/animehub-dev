import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from './lib/verifyAuth';

export async function middleware(req: NextRequest) {
	let response = NextResponse.next();
	const cookie = req.cookies.get('key');
	try {
		if (req.nextUrl.pathname.includes('/api/animes') || req.nextUrl.pathname.includes('/api/users') || req.nextUrl.pathname.includes('/api/logout')) {
			console.log(cookie);
			if (!cookie) return NextResponse.json({ error: 'you are not allowed!' }, { status: 401 });
			// const secret = process.env.SECRET ? process.env.SECRET : 'null';
			await verifyAuth(cookie.value).catch((error) => {
				if (error instanceof Error) {
					console.log({ name: error.name, msg: error.message });
				}
				console.log(error);
			});
			return response;
		}

		if (req.nextUrl.pathname.includes('/animes') || req.nextUrl.pathname.includes('/profile') || req.nextUrl.pathname.includes('/search')) {
			if (!cookie) {
				const url = new URL('/login', req.url);
				return NextResponse.redirect(url);
			}
			await verifyAuth(cookie.value);
		}

		return response;
	} catch (error) {
		if (error instanceof Error && error.name === 'TokenExpiredError') {
			return NextResponse.json({ authStatus: error.message, user: {} }, { status: 400 });
		}

		console.log(error);
		if (error instanceof Error && error.name === 'JsonWebTokenError') {
			return NextResponse.json({ authStatus: 'invalid token', user: {} }, { status: 401 });
		}
	}

	return NextResponse.json({ error: 'sorry something went wrong!' }, { status: 500 });
}

// export const config = {
// 	matcher: ['/api/animes/:path*', '/api/users/:path*', '/api/logout'],
// };
