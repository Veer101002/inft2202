import { logger } from '../utils/logger.js';

export const loggingMiddleware = (req, res, next) => {
    logRequest(req, res);
    res.once('finish', () => logRequest(req, res));
    next();
};

const logRequest = async (req, res) => {
    const { method, originalUrl, body, params, query, headers } = req;
    const time = new Date().toISOString();
    
    const ogJson = res.json;
    res.json = async (value) => {
        res.locals.data = await Promise.resolve(value);
        return ogJson.call(res, res.locals.data);
    };

    const context = {
        time,
        request: { body, params, query, headers },
        response: { 
            statusCode: res.statusCode,
            body: res.locals.data
        }
    };

    logger.info(`[${time}] ${res.headersSent ? 'RESPONSE' : 'REQUEST'}: ${method} ${originalUrl}`, context);
};