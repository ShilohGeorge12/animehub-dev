import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	try {
		const query = req.nextUrl.searchParams.get('q');

		if (!query) {
			return NextResponse.json({ error: `query not found` }, { status: 400 });
		}

		const animes = await MongoDB.getAnimeModel()
			.find({ title: { $regex: `^${query.replace(/_/g, ' ')}`, $options: 'i' } })
			.sort('title')
			.select('-__v');

		return NextResponse.json({ q: query, animes }, { status: 200 });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
