import bodyParser from 'body-parser';
import animalRouter from '../routes/animal.js'
import { loggingMiddleware } from '../middleWare/logging.js';
import { query, validationResult } from 'express-validator';

function config(app) {
    
    // Parse JSON bodies and URL-encoded bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(loggingMiddleware);

    let helloContent = `<!DOCTYPE html><html lang=\"en-us\"><head><title>INFT 2202</title></head><body><main><h1>Hello from Express</h1><p>at ${new Date()}</p></main></body></html>`;
    app.get("/hello", query('person').notEmpty(), (req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            res.send(`Hello, ${req.query.person}!`);
        }
        res.status(304).json('missing person');
    }); 

    app.use('/api/animals', animalRouter);
}

export default config;