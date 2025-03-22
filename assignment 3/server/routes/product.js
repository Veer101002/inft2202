import express from 'express';
import product from '../controllers/product.js';

const router = express.Router();
router.get('/:name?', product.index);
router.post('/', product.add);
router.delete('/:name?', product.delete);
router.put('/', product.update);

export default router;