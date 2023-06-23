import { Schema, model } from 'mongoose';
const UserSchema = new Schema({
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
        data: Buffer,
        contentType: String,
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
    createdAt: {
        type: Date,
        default: () => new Date(),
    },
});
export const UserModel = model('User', UserSchema);
