import { Router } from 'express'
import { createProduto, readProduto } from '../Controllers/produtoController.js';

const router = Router();

//Rotas de produtos
router.post('/', createProduto)
router.get('/', readProduto)

export default router;