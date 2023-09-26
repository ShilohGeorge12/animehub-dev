import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';

export interface User {
	username: string;
	password: string;
	email: string;
	gender: 'male' | 'female';
	image: string;
	animes: Types.ObjectId[];
	role: 'BASIC' | 'PREMIUM';
	theme: 'light' | 'dark';
	authkey: string;
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
	image: string;
}

// Type Guards
export const isError = (arg: unknown): arg is Error => (arg as Error).stack !== undefined;

export type AuthType = (req: Request, res: Response, next: NextFunction) => void;

interface JwtPayload {
	token: string;
	exp: number;
}

export const isJWTPayload = (arg: unknown): arg is JwtPayload => (arg as JwtPayload).exp !== undefined;
