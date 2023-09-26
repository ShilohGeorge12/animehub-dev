import { Model, Schema, model, Document } from 'mongoose';
import { User } from '../../types/index.js';

interface UserDocument extends User, Document {}

const UserSchema = new Schema<UserDocument>({
	username: {
		type: String,
		required: [true, 'Username can not be empty'],
	},
	email: {
		type: String,
		minlength: 18,
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
		required: [true, 'gender is required'],
		enum: ['male', 'female'],
	},
	image: {
		type: String,
		required: [true, 'Image is required'],
	},
	animes: {
		type: [{ type: Schema.Types.ObjectId, ref: 'animes' }],
		default: [],
	},
	role: {
		type: String,
		enum: ['BASIC', 'PREMIUM'],
		default: 'BASIC',
	},
	theme: {
		type: String,
		enum: ['light', 'dark'],
		default: 'light',
	},
	authkey: {
		type: String,
		max: 300,
		default: 'null',
	},
	createdAt: {
		type: Date,
		default: () => new Date(),
	},
});

export const UserModel: Model<UserDocument> = model<UserDocument>('User', UserSchema);
