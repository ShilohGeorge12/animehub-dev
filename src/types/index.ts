import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

type Theme = 'light' | 'dark';

export interface UserType {
	readonly _id: string;
	username: string;
	password: string;
	email: string;
	gender: 'male' | 'female';
	image: {
		data: {
			data: any;
		};
		contentType: string;
	};
	animes: AnimeType[];
	role: 'BASIC' | 'PREMIUM';
	theme: Theme;
	createdAt: Date;
}

export interface AnimeType {
	readonly _id: string;
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
		data: {
			data: any;
		};
		contentType: string;
	};
}

// Http Response Type
interface paginatedAnimes {
	animes: AnimeType[];
	totalAnimes: number;
	perPage: number;
	page: number;
}

interface searchResult {
	results: AnimeType[];
	totalAnimes: number;
}

export type responseType = UserType | AnimeType | AnimeType[] | paginatedAnimes | searchResult | { error: string | string[] };

// Type Guards
export const isUserAnime = (_arg: (string | AnimeType)[]): _arg is AnimeType[] => true || false;
export const isAnime = (_arg: responseType): _arg is AnimeType => true || false;
export const isAnimes = (_arg: responseType): _arg is paginatedAnimes => true || false;
export const isUser = (_arg: responseType): _arg is UserType => true || false;
export const isError = (_arg: unknown): _arg is Error => true || false;
export const isSearchResult = (_arg: responseType): _arg is searchResult => true || false;
// Context Types
export type stateAction =
	| { type: 'theme'; payload: { theme: Theme } }
	| { type: 'user'; payload: { user: UserType } }
	| { type: 'logIn'; payload: { logIn: true } }
	| { type: 'logOut'; payload: { logOut: false } }
	| { type: 'userTheme'; payload: { userTheme: Theme } };

export interface State {
	theme: Theme;
	loggedIn: boolean;
	user: UserType;
}

export interface Icontext {
	state: State;
}

export type ReducerType = (state: State, action: stateAction) => State;

// Url Path Types
export type UrlPath = '/' | '/profile' | '/search' | '/cart';

// Pagination type
interface PaginationOptions {
	animes: AnimeType[];
	limitPerPage: number;
	totalAnimes: number;
	setAnimes: Dispatch<SetStateAction<AnimeType[]>>;
	setLimitPerPage: Dispatch<SetStateAction<number>>;
	setTotalAnimes: Dispatch<SetStateAction<number>>;
	setIsSuccess: Dispatch<SetStateAction<boolean>>;
}
export type PaginationType = (options: PaginationOptions) => [() => JSX.Element, AnimeType[]];

// Toast Type
interface ToastOptions2 {
	bg: 'green' | 'red' | 'pink';
	icon: IconType;
	position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}
export type ToastType = (context: string | string[], options: ToastOptions2) => void;
