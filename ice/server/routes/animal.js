import express from 'express';
import animal from "../controllers/animal.js";
import { checkValidation } from '../middleWare/validation.js';

const router = express.Router();
router.get('/:name?', checkValidation(animal.rules), animal.index);
router.post('/', checkValidation(animal.rules), animal.add);
router.delete('/:name?', animal.delete);
router.put('/', checkValidation(animal.rules), animal.update);

export default router;