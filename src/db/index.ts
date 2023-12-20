// db.ts
import mongoose, { Connection, Model, Schema } from 'mongoose';
import { env } from '@/env';
import { User, Anime } from '@/types';

class Database {
	private static instance: Database;
	private connection!: Connection;
	private animeModel: Model<Anime>;
	private userModel: Model<User>;

	private constructor() {
		this.connect();
		this.animeModel = this.createAnimeModel();
		this.userModel = this.createUserModel();
	}

	private connect() {
		mongoose.set('strictQuery', false);
		this.connection = mongoose.createConnection(env.DATABASE_URL, {
			writeConcern: { w: 'majority' },
			retryWrites: true,
		});

		this.connection.on('error', (error) => {
			console.error('MongoDB connection error:', error);
		});

		this.connection.once('open', () => {
			console.log('Connected to MongoDB');
		});
	}

	private createAnimeModel(): Model<Anime> {
		const AnimeSchema = new Schema<Anime>({
			title: {
				type: String,
				minlength: 2,
				required: true,
			},
			description: {
				type: String,
				minlength: 2,
				required: true,
			},
			episodes: {
				type: Number,
				min: 1,
				required: true,
			},
			year: {
				type: Number,
				min: 4,
				max: 4,
				required: true,
			},
			airing: {
				type: Boolean,
				required: true,
			},
			aired: {
				type: String,
				minlength: 1,
				required: true,
			},
			duration: {
				type: String,
				minlength: 2,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
			},
			season: {
				type: String,
				enum: ['summer', 'spring', 'winter'],
				required: true,
			},
			status: {
				type: String,
				enum: ['FinishedAiring', 'onGoing'],
				required: true,
			},
			image: {
				type: String,
				default: 'null',
				required: [true, 'Image is required'],
			},
		});

		return this.connection.model<Anime>('animes', AnimeSchema);
	}

	private createUserModel(): Model<User> {
		const UserSchema = new Schema<User>({
			username: {
				type: String,
				minlength: 2,
				required: [true, 'Username can not be empty'],
			},
			email: {
				type: String,
				minlength: 13,
				maxlength: 40,
				required: true,
				unique: true,
			},
			password: {
				type: String,
				minlength: 20,
				required: [true, 'Password Can not be empty'],
			},
			gender: {
				type: String,
				enum: ['male', 'female'],
				required: [true, 'gender is required'],
			},
			image: {
				type: String,
				required: [true, 'Image is required'],
			},
			animes: {
				default: [],
				type: [{ type: Schema.Types.ObjectId, ref: 'animes' }],
			},
			role: {
				type: String,
				enum: ['BASIC', 'PREMIUM'],
				default: 'BASIC',
			},
			// theme: {
			// 	type: String,
			// 	enum: ['light', 'dark'],
			// 	default: 'light',
			// },
			authkey: {
				type: String,
				// max: 400,
				default: 'null',
			},
			createdAt: {
				type: Date,
				default: () => new Date(),
			},
		});
		return this.connection.model<User>('users', UserSchema);
	}

	public static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public getAnimeModel(): Model<Anime> {
		return this.animeModel;
	}

	public getUserModel(): Model<User> {
		return this.userModel;
	}
}

export const MongoDB = Database.getInstance();
