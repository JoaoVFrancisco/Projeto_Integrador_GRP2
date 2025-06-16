import { Router } from 'express'
import { createProducao, readProducao } from '../Controllers/producaoController.js';


const router = Router();

router.post('/', createProducao);
router.get('/', readProducao)

export default router;