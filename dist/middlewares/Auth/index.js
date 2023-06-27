import Jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();
export const genCookie = (req, res, next) => {
    const sercret = process.env.SECRET;
    if (sercret) {
        const signedJwt = Jwt.sign({ token: 'jwt token' }, sercret, { expiresIn: 90 });
        res.header('x-api-key', signedJwt).header('access-control-expose-headers', 'x-api-key');
        next();
    }
};
export const Auth = (req, res, next) => {
    const sercret = `${process.env.SECRET}`;
    const cookies = req.cookies['key'];
    console.log(cookies);
    if (cookies) {
        Jwt.verify(cookies, sercret);
        next();
    }
    else {
        res.status(400).json({ error: 'invalid Token' });
    }
};
