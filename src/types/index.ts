import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

type Theme = 'light' | 'dark';
type developmentUrl = 'http://localhost:5050';
type ProductionUrl = 'http://animehub-api.onrender.com';
export const devUrl: developmentUrl = 'http://localhost:5050';
export const prodUrl: ProductionUrl = 'http://animehub-api.onrender.com';

export interface UserType {
	readonly _id: string;
	username: string;
	password: string;
	email: string;
	gender: 'male' | 'female';
	image: string;
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
	image: string;
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

interface ErrorType {
	readonly error: string | string[];
}

interface StatusType {
	readonly status: string;
}

type AuthStatusType = { readonly authStatus: 'jwt expired'; readonly user: {} } | { readonly authStatus: 'Still Valid'; readonly user: UserType };

export type responseTypes = UserType | AnimeType | AnimeType[] | paginatedAnimes | searchResult | StatusType | ErrorType | AuthStatusType;

// Type Guards
export const isUserAnime = (_arg: (string | AnimeType)[]): _arg is AnimeType[] => (_arg as AnimeType[]).length !== undefined;
export const isAnime = (_arg: responseTypes): _arg is AnimeType => (_arg as AnimeType).description !== undefined;
export const isAnimes = (_arg: responseTypes): _arg is paginatedAnimes => (_arg as paginatedAnimes).animes !== undefined;
export const isUser = (_arg: responseTypes): _arg is UserType => (_arg as UserType).username !== undefined;
export const isError = (_arg: unknown): _arg is Error => (_arg as Error).stack !== undefined;
export const isSearchResult = (_arg: responseTypes): _arg is searchResult => (_arg as searchResult).results !== undefined;
export const isStatus = (arg: responseTypes): arg is StatusType => (arg as StatusType).status !== undefined;
export const isAuthStatus = (arg: responseTypes): arg is AuthStatusType => {
	return (arg as AuthStatusType).user !== undefined && (arg as AuthStatusType).authStatus !== undefined;
};
export const isAnError = (arg: unknown): arg is Error => (arg as Error).message !== undefined;

// Context Types
export type stateAction =
	| { type: 'theme'; payload: { theme: Theme } }
	| { type: 'user'; payload: { user: UserType } }
	| { type: 'logIn'; payload: { isloggedIn: true; user: UserType } }
	| { type: 'logOut'; payload: { isloggedIn: false } }
	| { type: 'editProfileModalOpen'; payload: { open: true } }
	| { type: 'editProfileModalClose'; payload: { close: false } }
	| { type: 'userTheme'; payload: { userTheme: Theme } };

export interface State {
	theme: Theme;
	loggedIn: boolean;
	user: UserType;
	editProfileModal: boolean;
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
