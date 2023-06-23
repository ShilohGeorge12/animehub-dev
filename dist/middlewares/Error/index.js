import ImageError from './Custom/index.js';
const errorResponse = { error: 'You are Not allowed!' };
export function Errorhandler(err, req, res, next) {
    console.log('-> ', {
        name: err.name,
        msg: err.message,
        stack: err.stack,
    });
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'You Are Not Allowed!' });
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
;
export function tryCatch(Handler) {
    return async (req, res, next) => {
        try {
            await Handler(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
}
;
