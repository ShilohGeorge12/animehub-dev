import { Model, Schema, model, Document } from 'mongoose';
import { Anime } from '../../types/index.js';

interface AnimeDocument extends Anime, Document {}

const AnimeSchema = new Schema<AnimeDocument>({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	episodes: {
		type: Number,
		required: true,
	},
	year: {
		type: Number,
		required: true,
	},
	airing: {
		type: Boolean,
		required: true,
	},
	aired: {
		type: String,
		required: true,
	},
	duration: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	season: {
		type: String,
		enum: ['summer' , 'spring', 'winter'],
		required: true,
	},
	status: {
		type: String,
		enum: ['FinishedAiring', 'onGoing'],
		required: true,
	},
	image: {
		data: Buffer,
		contentType: String,
	},
});

export const AnimeModel: Model<AnimeDocument> = model<AnimeDocument>('animes', AnimeSchema);
