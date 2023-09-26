import mongoose from 'mongoose';
import { isError } from '../types/index.js';
import { env } from '../env/index.js';

export const getUser = async () => {};

export const mongoDb = () => {
	try {
		mongoose.set('strictQuery', false);
		mongoose.connect(env.DATABASE_URL, {
			writeConcern: {
				w: 'majority',
			},
		});
	} catch (err) {
		isError(err) && console.error(err.message);
	}
};
