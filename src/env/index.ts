import { config } from 'dotenv';
config();
import { cleanEnv, str } from 'envalid';

export const env = cleanEnv(process.env, {
	DATABASE_URL: str(),
	SECRET: str(),
	VERCEL_URL: str({ default: 'null' }),
	// PORT: port(),
});
