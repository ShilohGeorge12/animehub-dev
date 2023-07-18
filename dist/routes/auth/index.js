import { Router } from 'express';
import { tryCatch } from '../../middlewares/Error/index.js';
import { UserModel } from '../../model/user/index.js';
import { validateAuth } from '../../validator/index.js';
import { ifError } from '../../validator/helpers.js';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import upload from '../../middlewares/Image/index.js';
config();
export const authRouter = Router();
authRouter.post('/login', upload.single('image'), tryCatch(async (req, res) => {
    const { error, value } = validateAuth(req.body);
    const authValidation = ifError(error);
    if (authValidation) {
        res.status(400).json({ error: authValidation });
        return;
    }
    if (!value)
        return;
    const { username, email, password } = value;
    const user = await UserModel.findOne({ username, email }).select('-__v').populate('animes', '-__v');
    if (!user) {
        res.status(404).json({ error: 'User Not Found!' });
        return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
        res.status(400).json({ error: 'password is Incorrect!' });
        return;
    }
    const sercret = `${process.env.SECRET}`;
    const signedJwt = Jwt.sign({ token: 'jwt token' }, sercret, { expiresIn: 18000 });
    console.log('login');
    const User = {
        _id: user._id,
        username,
        email,
        gender: user.gender,
        image: user.image,
        animes: user.animes,
        role: user.role,
        theme: user.theme,
        createdAt: user.createdAt,
    };
    res
        .cookie('key', signedJwt, {
        secure: true,
        sameSite: 'none',
    })
        .status(200)
        .json(User);
}));
authRouter.get('/logout', tryCatch(async (req, res) => {
    // res.status(200).json({ status: 'logout' });
    res
        .clearCookie('key', {
        secure: true,
        sameSite: 'none',
        // maxAge: 18000,
    })
        .status(200)
        .json({ status: 'logout' });
}));
