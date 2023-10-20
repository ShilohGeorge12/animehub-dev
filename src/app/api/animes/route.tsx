import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
	try {
		const pageParams = req.nextUrl.searchParams.get('page');
		const perPageParams = req.nextUrl.searchParams.get('perpage');
		const page = pageParams ? parseInt(pageParams) : 0;
		const perPage = perPageParams ? parseInt(perPageParams) : 8;
		const totalAnimes = (await MongoDB.getAnimeModel().find()).length;

		const animes = await MongoDB.getAnimeModel()
			.find()
			.sort('title -__v')
			.skip(page * perPage)
			.limit(perPage)
			.select('-__v');
		console.log('animes(GET) ', page);
		return NextResponse.json({ animes, totalAnimes, perPage, page });
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
