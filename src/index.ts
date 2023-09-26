import express, { json } from 'express';
import cors from 'cors';
import { mongoDb } from './db/index.js';
import { Errorhandler } from './middlewares/Error/index.js';
import { animeRouter } from './routes/animes/index.js';
import { usersRouter } from './routes/users/index.js';
import { authRouter } from './routes/auth/index.js';
import cookieParser from 'cookie-parser';
import { env } from './env/index.js';
import { join } from 'path';

const app = express();
const port = env.PORT;

app.use(json());
app.use(cookieParser());
app.use(
	cors({
		origin: ['http://localhost:5051', 'https://animehub-dev.netlify.app'],
		credentials: true,
	})
);
app.use(express.static(join(__dirname, '../dist/public')));

app.get('/', (req, res) => res.redirect('/api/'));
app.get('/api/', (req, res) => res.send('welcome to animehub-dev api'));
app.use('/api', authRouter);
app.use('/api', usersRouter);
app.use('/api', animeRouter);
app.use('*', Errorhandler);

mongoDb();

app.listen(port, () => console.log(`http://localhost:${port}/api`));
