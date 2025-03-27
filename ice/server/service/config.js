import bodyParser from 'body-parser';
import animalRouter from '../routes/animal.js'
import { loggingMiddleware } from '../middleWare/logging.js';
import {errorHandler} from '../middleWare/errorHandler.js';
import { query,validationResult } from 'express-validator';

function config(app) {
    
    // Parse JSON bodies and URL-encoded bodies
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.use(loggingMiddleware);

    app.get("/hello", query('person').notEmpty(),(req, res) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          let helloContent = `<!DOCTYPE html><html lang=\"en-us\"><head><title>INFT 2202</title></head><body><main><h1>Hello ${req.query.person} from Express</h1><p>at ${new Date()}</p></main></body></html>`;
          res.send(helloContent);
        }
        res.send({ errors: result.array() })
    }); 
        
    app.use('/api/animals', animalRouter);

// Error handler middleware (should be the last middleware)
    app.use(errorHandler);      
}

export default config;