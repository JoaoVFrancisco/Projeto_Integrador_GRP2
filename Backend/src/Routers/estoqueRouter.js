import { Router } from 'express'
import { createEstoque, readEstoque } from '../Controllers/estoqueController.js';

const router = Router()

router.post('/', createEstoque)
router.get('/', readEstoque)

export default router;