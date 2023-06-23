import { Request } from 'express';
import joi, { ValidationResult } from 'joi';
import { Anime, User } from '../types/index.js';

type validateAnimesReturnType = ValidationResult<Omit<Anime, 'image'>>;
type validateUsersReturnType = ValidationResult<Omit<User, 'image' | 'animes'>>;
type validateAuthReturnType = ValidationResult<Omit<User, 'image' | 'animes' | 'role' | 'theme'>>;
type validatePatchReturnType = ValidationResult<Pick<User, 'theme'>>;

export function validateUsers(schema: Request): validateUsersReturnType {
	const userSchema = joi.object({
		username: joi.string().min(2).required(),
		email: joi.string().email().required(),
		password: joi.string().min(2).required(),
		role: joi.string().valid('BASIC', 'PREMIUM'),
		theme: joi.string().valid('light', 'dark'),
	});
	return userSchema.validate(schema, { abortEarly: false });
}

export function validateAnimes(schema: Request): validateAnimesReturnType {
	const animeSchema = joi.object({
		title: joi.string().required(),
		description: joi.string().required(),
		episodes: joi.number().required(),
		year: joi.number().required(),
		airing: joi.boolean().required(),
		aired: joi.string().required(),
		duration: joi.string().required(),
		rating: joi.number().required(),
		season: joi.string().valid('summer', 'spring', 'winter').required(),
		status: joi.string().valid('FinishedAiring', 'onGoing').required(),
	});
	return animeSchema.validate(schema, { abortEarly: false });
}

export function validateAuth(schema: Request): validateAuthReturnType {
	const userSchema = joi.object({
		username: joi.string().min(2).required(),
		email: joi.string().email().required(),
		password: joi.string().min(2).required(),
	});
	return userSchema.validate(schema, { abortEarly: false });
}

export function validatePatch(schema: Request): validatePatchReturnType {
	const userSchema = joi.object({
		theme: joi.string().valid('light', 'dark'),
	});
	return userSchema.validate(schema, { abortEarly: false });
}
