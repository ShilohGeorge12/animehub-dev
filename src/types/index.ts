import { Types } from 'mongoose';
import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';
import { ValidationResult } from 'joi';

export const MAX_AGE = 30 * 60;
export const COOKIE_NAME = 'key';
export type animeReturnType = Anime;
export type userReturnType = Omit<User, 'animes' | 'authkey' | 'createdAt' | 'theme' | 'role' | 'image'> & { image: File };
export type authReturnType = Pick<User, 'username' | 'password'>;
export type authLogOutReturnType = Pick<User, 'username' | 'email'>;
export type patchReturnType = Pick<User, 'theme'>;
export type updateUserReturnType = Pick<User, 'password' | 'username' | 'email' | 'gender'> & { image: File };

export type validateAnimesReturnType = ValidationResult<animeReturnType>;
export type validateUsersReturnType = ValidationResult<userReturnType>;
export type validateAuthReturnType = ValidationResult<authReturnType>;
export type validateAuthLogOutReturnType = ValidationResult<authLogOutReturnType>;
export type validatePatchReturnType = ValidationResult<patchReturnType>;
export type validateUpdateUserType = ValidationResult<updateUserReturnType>;

export interface _ID {
	readonly _id: string;
}

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

export type Theme = 'light' | 'dark';

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
	q: string;
	animes: AnimeType[];
}

interface ErrorType {
	readonly error: string | string[];
}

interface StatusType {
	readonly status: string;
}

type AuthStatusType = { readonly authStatus: 'invalid token'; readonly user: {} } | { readonly authStatus: 'Still Valid'; readonly user: UserType };

export type responseTypes = UserType | AnimeType | AnimeType[] | paginatedAnimes | searchResult | StatusType | ErrorType | AuthStatusType;

// Type Guards
export const isUserAnime = (_arg: (string | AnimeType)[]): _arg is AnimeType[] => (_arg as AnimeType[]).length !== undefined;
export const isAnime = (_arg: responseTypes): _arg is AnimeType => (_arg as AnimeType).description !== undefined;
export const isAnimes = (_arg: responseTypes): _arg is paginatedAnimes => (_arg as paginatedAnimes).animes !== undefined;
export const isUser = (_arg: responseTypes): _arg is UserType => (_arg as UserType).username !== undefined;
export const isError = (_arg: responseTypes): _arg is ErrorType => (_arg as ErrorType).error !== undefined;
export const isSearchResult = (_arg: responseTypes): _arg is searchResult => (_arg as searchResult).animes !== undefined;
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
	setTotalAnimes: Dispatch<SetStateAction<number>>;
	// setIsFetching: Dispatch<SetStateAction<'fetching' | 'idle'>>;
}
export type PaginationType = (options: PaginationOptions) => [() => JSX.Element, AnimeType[]];

// Toast Type
interface ToastOptions2 {
	bg: 'green' | 'red' | 'pink';
	icon: IconType;
	position: 'top-right' | 'top-center' | 'top-left' | 'bottom-right' | 'bottom-center' | 'bottom-left';
}
export type ToastType = (context: string | string[], options: ToastOptions2) => void;

interface JwtPayload {
	jti: string;
	iat: number;
	// token: string;
	// exp: number;
}

export const isJWTPayload = (arg: unknown): arg is JwtPayload => (arg as JwtPayload).iat !== undefined && (arg as JwtPayload).jti !== undefined;

export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

export type verifyLoginReturnType =
	| (Omit<User, 'authkey' | 'password'> & {
			_id: Types.ObjectId;
	  })
	| {
			error: string;
			status: 400 | 404;
	  };

export type ErrorMessage = { path: 'null' | 'username' | 'email' | 'password'; message: string }[];
export type editProfileInitState = Pick<UserType, 'username' | 'email' | 'password' | 'gender'> & { image: string | File };
