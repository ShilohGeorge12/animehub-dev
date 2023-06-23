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
export const isError = (arg: unknown): arg is Error => false || true;
export const isQueryBy = (arg: any): arg is 'title' | 'rating' => false || true;

// Search and Sort Types
type searchAndSortArr = Types.ObjectId[];

export type BinarySearch = (array: Types.ObjectId[], target: Types.ObjectId, start: number, end: number) => 'not found' | BinarySearch | Types.ObjectId;

export type searchType = (array: Types.ObjectId[], target: Types.ObjectId) => 'not found' | BinarySearch | Types.ObjectId;

export type MergeSort = (array: searchAndSortArr[], left: searchAndSortArr[], right: searchAndSortArr[]) => any;

export type sortType = (array: searchAndSortArr[]) => void;

export type genCookieType = (req: Request, res: Response, next: NextFunction) => void;
export type AuthType = (req: Request, res: Response, next: NextFunction) => void;
