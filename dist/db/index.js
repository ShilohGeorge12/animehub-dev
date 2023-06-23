import mongoose from 'mongoose';
import { config } from 'dotenv';
import { isError } from '../types/index.js';
config();
export const getUser = async () => {
};
export const mongoDb = () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(`${process.env.DATABASE_URL}`);
    }
    catch (err) {
        isError(err) && console.error(err.message);
    }
};
