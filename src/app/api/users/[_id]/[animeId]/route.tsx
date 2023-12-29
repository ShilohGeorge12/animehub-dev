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
			console.log(anime._id);
			await user.save();
			return NextResponse.json(user.animes);
		}

		user.animes.push(anime._id);
		console.log(anime._id);
		await user.save();
		return NextResponse.json(user.animes);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};

export const DELETE = async (_: NextRequest, { params }: { params: { _id: string; animeId: string } }) => {
	try {
		const { _id, animeId } = params;
		const anime = await MongoDB.getAnimeModel().findOne({ _id: animeId }).select('_id');

		if (!anime) {
			return NextResponse.json({ error: 'Anime Not found!' }, { status: 404 });
		}

		const user = await MongoDB.getUserModel()
			.findOneAndUpdate({ _id }, { $pull: { animes: anime?._id } }, { new: true })
			.populate('animes', '-__v')
			.select('-__v -password');

		if (!user) {
			return NextResponse.json({ error: 'User Not Found!' }, { status: 404 });
		}

		return NextResponse.json(user, { status: 200 });

		// const anime = await AnimeModel.findOne({ _id: animeid }).select('_id');
		// const user = await UserModel.findOneAndUpdate({ _id }, { $pull: { animes: anime?._id } }, { new: true })
		// 	.populate('animes', '-__v')
		// 	.select('-__v -password');
		// if (!anime) {
		// 	res.status(404).json({ error: 'Anime Not found!' });
		// 	return;
		// }
		// if (!user) {
		// 	res.status(404).json({ error: 'User Not Found!' });
		// 	return;
		// }
		// res.status(200).json(user);
	} catch (error) {
		if (error instanceof Error) {
			console.log(error);
			return NextResponse.json(error.message, { status: 500 });
		}
	}
};
