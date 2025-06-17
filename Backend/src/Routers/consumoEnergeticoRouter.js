import { Router } from 'express';
import { createConsumo, getEficiencia } from '../Controllers/consumoEnergeticoController.js';

const router = Router();
router.post('/', createConsumo);
router.get('/eficiencia', getEficiencia);


export default router;