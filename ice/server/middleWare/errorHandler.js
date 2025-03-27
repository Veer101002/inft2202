import { ConflictError } from '../errors/ConflictError.js';
import { logger } from '../utils/logger.js';

export const errorHandler = (error, request, response, next) => {
    const { message, stack, statusCode = 500 } = error;
    const { method, originalUrl, headers, query, body, params } = request
    const time = new Date().toISOString();
    const context = {
        time,
        stack,
        req: { method, path: originalUrl, headers, query, body, params },
        res: { body: response.locals.data, statusCode },
        error
    }

    const responseObject = { message }
    if (error instanceof ConflictError) {
        responseObject.errors = error.details?.errors;
    }

    logger.error(`${statusCode}: ${message}`, context);
    response.status(statusCode).send(responseObject);
}
