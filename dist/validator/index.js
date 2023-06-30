import joi from 'joi';
export function validateUsers(schema) {
    const userSchema = joi.object({
        username: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(2).required(),
        role: joi.string().valid('BASIC', 'PREMIUM'),
        theme: joi.string().valid('light', 'dark'),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
export function validateUpdateUser(schema) {
    const userSchema = joi.object({
        username: joi.string().min(2).max(25),
        email: joi.string().email().max(30),
        password: joi.string().min(2).max(24),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
export function validateAnimes(schema) {
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
export function validateAuth(schema) {
    const userSchema = joi.object({
        username: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(2).required(),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
export function validatePatch(schema) {
    const userSchema = joi.object({
        theme: joi.string().valid('light', 'dark'),
    });
    return userSchema.validate(schema, { abortEarly: false });
}
