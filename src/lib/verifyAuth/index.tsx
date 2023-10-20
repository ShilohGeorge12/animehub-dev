import { jwtVerify } from 'jose';

export const verifyAuth = async (token: string) => {
	const secret = process.env.SECRET ? process.env.SECRET : 'null';
	const verified = await jwtVerify(token, new TextEncoder().encode(secret));
	// if(isJWTPayload(verified)){
	// }
	return verified.payload;
};
