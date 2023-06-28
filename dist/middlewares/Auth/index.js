import Jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const Auth = (req, res, next) => {
    const sercret = `${process.env.SECRET}`;
    const cookies = req.cookies['key'];
    console.log('cookie -> ', cookies);
    if (cookies) {
        Jwt.verify(cookies, sercret);
        next();
    }
    else {
        res.status(401).json({ error: 'You Are Not Allowed!' });
    }
};
