import { AuthType, isError, isJWTPayload } from '../../types/index.js';
import Jwt from 'jsonwebtoken';
import { env } from '../../env/index.js';
import { UserModel } from '../../model/user/index.js';

// export const Auth: AuthType = (req, res, next) => {
// 	const sercret = `${process.env.SECRET}`;
// 	const cookies: string = req.cookies['key'];
// 	if (cookies) {
// 		Jwt.verify(cookies, sercret);
// 		next();
// 	} else {
// 		res.status(401).json({ error: 'You Are Not Allowed!' });
// 	}
// };

export const Auth: AuthType = async (req, res, next) => {
	const sercret = env.SECRET;
	const cookies: string = req.cookies['key'];
	console.log(cookies);
	try {
		if (cookies) {
			const token = Jwt.verify(cookies, sercret);

			if (!isJWTPayload(token)) {
				res.status(401).json({ error: 'You Are Not Allowed! 1' });
				return;
			}

			const email = token.token;
			const user = await UserModel.findOne({ email }).select('email authkey');
			if (!user) {
				return;
			}

			const storedToken = Jwt.verify(user.authkey, sercret);
			if (!isJWTPayload(storedToken)) {
				res.status(401).json({ error: 'You Are Not Allowed! 1.5' });
				return;
			}

			const expirationTime = storedToken.exp;
			const currentTime = Math.floor(Date.now() / 1000);
			if (expirationTime < currentTime) {
				res.status(401).json({ error: 'You Are Not Allowed! 2' });
				return;
			}
			next();
		} else {
			res.status(401).json({ error: 'You Are Not Allowed! 3' });
		}
	} catch (error) {
		if (!isError(error)) return;

		if (error.name === 'TokenExpiredError') {
			res.status(401).json({ authStatus: error.message, user: {} });
			return;
		}

		res.status(500).json({ error: `${error.message}` });
	}
};
