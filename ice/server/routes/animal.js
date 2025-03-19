import express from 'express';
import animal from '../controllers/animal.js';

const router = express.Router();
router.get('/:name?', animal.index);
router.post('/', animal.add);
router.delete('/:name?', animal.delete);
router.put('/', animal.update);

export default router;