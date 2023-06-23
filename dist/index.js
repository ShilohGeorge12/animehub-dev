import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { mongoDb } from './db/index.js';
import { Errorhandler } from './middlewares/Error/index.js';
import { animeRouter } from './routes/animes/index.js';
import { usersRouter } from './routes/users/index.js';
import { authRouter } from './routes/auth/index.js';
import cookieParser from 'cookie-parser';
config();
const app = express();
const port = `${process.env.PORT}`;
app.use(json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5051', 'https://animehub-dev.netlify.app'],
    credentials: true,
}));
app.get('/', (req, res) => res.redirect('/api/'));
app.get('/api/', (req, res) => res.send('welcome to animehub-dev api'));
app.use('/api', usersRouter);
app.use('/api', animeRouter);
app.use('/api', authRouter);
app.use('*', Errorhandler);
mongoDb();
app.listen(port, () => console.log(`http://localhost:${port}/api`));
