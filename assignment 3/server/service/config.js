import bodyParser from 'body-parser';
import productRouter from '../routes/product.js';
import { loggingMiddleware } from '../middleWare/logging.js';

export default function configureApp(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(loggingMiddleware);
    app.use('/api/products', productRouter);
}