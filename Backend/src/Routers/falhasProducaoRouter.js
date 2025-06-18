import { Router } from 'express';
import { createFalha, readFalhas } from '../Controllers/falhasProducaoController.js';

const router = Router();
router.post('/', createFalha);
router.get('/', readFalhas);
export default router;