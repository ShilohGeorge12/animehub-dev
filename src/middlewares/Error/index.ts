import { Request, Response, NextFunction } from 'express';
import ImageError from './Custom/index.js';

type Ttrycatch = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const errorResponse = { error: 'You are Not allowed!' };

export function Errorhandler(err: Error, req: Request, res: Response, next: NextFunction) {
	console.log('-> ', {
		name: err.name,
		msg: err.message,
		stack: err.stack,
	});

	if (err.name === 'TokenExpiredError') {
		return res.status(401).json(errorResponse);
	}

	if (err.name === 'MongoServerError') {
		const message = err.message.split('{')[1].replace('}', '');
		return res.status(400).json({ error: `Duplicate${message}` });
	}

	if (err.name === 'JsonWebTokenError') {
		return res.status(401).json(errorResponse);
	}

	if (err instanceof ImageError) {
		return res.status(400).json({ error: err.message });
	}

	if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	}

	return res.status(500).json({ error: err.message });
}

export function tryCatch(Handler: Ttrycatch) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await Handler(req, res, next);
		} catch (error) {
			next(error);
		}
	};
}
