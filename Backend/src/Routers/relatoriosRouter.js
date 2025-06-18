import { Router } from 'express';
import { getRelatorioConsolidado } from '../Controllers/relatoriosController.js';

const router = Router();
router.get('/consolidado', getRelatorioConsolidado);

export default router;