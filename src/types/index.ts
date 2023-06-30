import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export interface User {
	username: string;
	password: string;
	email: string;
	gender: 'male' | 'female';
	image: {
		data: Buffer;
		contentType: string;
	};
	animes: Types.ObjectId[];
	role: 'BASIC' | 'PREMIUM';
	theme: 'light' | 'dark';
	createdAt: Date;
}

export interface Anime {
	title: string;
	description: string;
	episodes: number;
	year: number;
	airing: boolean;
	aired: string;
	duration: string;
	rating: number;
	season: 'summer' | 'spring' | 'winter';
	status: 'FinishedAiring' | 'onGoing';
	image: {
		data: Buffer;
		contentType: string;
	};
}

// Type Guards
export const isError = (arg: unknown): arg is Error => (arg as Error).stack !== undefined;

export type AuthType = (req: Request, res: Response, next: NextFunction) => void;
