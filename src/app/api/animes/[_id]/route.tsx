import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (req: NextRequest, { params }: { params: { _id: string } }) => {
	try {
		const { _id } = params;
		const anime = await MongoDB.getAnimeModel().findOne({ _id }).select('-__v');

		if (!anime) {
			return NextResponse.json({ error: 'Anime Not Found!' }, { status: 404 });
		}

		return NextResponse.json(anime);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
