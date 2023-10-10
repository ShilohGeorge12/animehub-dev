import { MongoDB } from '@/db';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (_: NextRequest, { params }: { params: { _id: string; animeId: string } }) => {
	try {
		const { _id, animeId } = params;
		const anime = await MongoDB.getAnimeModel().findOne({ _id: animeId }).select('-_v');
		if (!anime) {
			return NextResponse.json({ error: 'anime not found!' }, { status: 404 });
		}

		const user = await MongoDB.getUserModel()
			.findOne({ _id, animes: { $nin: [anime._id] } })
			.select('-__v -password');
		const BASIC_USER_ERROR = "You Can't have more than five animes at a time, upgrade to premium account to add more animes to your collection";

		if (!user) {
			const user = await MongoDB.getUserModel().findOne({ _id }).select('-__v -password');
			if (!user) return NextResponse.json({ error: 'User Not Found!' });
			return NextResponse.json(user);
		}

		if (user.role === 'BASIC') {
			if (user.animes.length >= 5) {
				return NextResponse.json({ error: BASIC_USER_ERROR }, { status: 400 });
			}
			user.animes.push(anime._id);
			// await user.save();
			return NextResponse.json(user.animes);
		}

		user.animes.push(anime._id);
		// await user.save();
		return NextResponse.json(user.animes);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
